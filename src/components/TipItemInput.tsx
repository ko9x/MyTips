import React, {useContext} from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Pressable,
} from 'react-native';
import Colors from '../global/Colors';
import {iconSmall} from '../global/Variables';
import {iconComponentArrayToSize} from '../helpers/helpers';
import {OptionsContext} from '../providers/OptionsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TipItemInput({
  handleChange,
  handleBlur,
  value,
  inputTitle,
  placeholder,
  textColor,
  iconName,
  keyboardType,
  money,
  multiline,
  jobArr,
  isDefault,
  defaultValueSetter,
}: any) {
  const {createDefaultStorageState} = useContext(OptionsContext);
  let inputValue: any;
  // We are solving a couple problems here.
  // 1st, if we don't remove the $ at char 0 the TextInput will add another every time the user enters a number
  // 2nd, we want to make sure we only add $ to the input UI if the user has entered a number
  if (money) {
    if (value?.charAt(0) === '$') {
      let tempVal;
      tempVal = value.slice(1);
      inputValue = `$${tempVal}`;
    } else {
      if (value.length > 0) {
        inputValue = `$${value}`;
      } else {
        inputValue = value;
      }
    }
  } else {
    inputValue = value;
  }
  // In the edit screen if the time value is 0 for minutes or hours we just want to leave the input blank
  if (!money) {
    if (value === 0) {
      inputValue = '';
    }
  }

  // Here we are removing the $ if the user deletes the dollar amount
  function handleValueProp(val: any) {
    let strVal = val.toString();
    let goodVal = '';
    if (money) {
      if (strVal === '$') {
        goodVal = '';
      } else {
        goodVal = strVal?.toString().split(',').join('');
      }
    } else {
      goodVal = strVal?.toString();
    }
    return goodVal;
  }

  const storeData = async (propName: string, propVal: string) => {
    try {
      await AsyncStorage.setItem(propName, propVal);
    } catch (e) {
      // saving error
    }
  };

  // We no longer use this function but we could use it to check the currently stored prop value
  const getData = async (propName: string) => {
    try {
      const propVal = await AsyncStorage.getItem(propName);
      if (propVal !== null) {
        return propVal;
      }
    } catch (e) {
      // error reading value
    }
  };

  async function setDefaultValue(str: string) {
    await storeData(inputTitle, str);
    defaultValueSetter(str);
  }

  function createAlertButtonArr() {
    // Instantiate the array with the Add new and Cancel options
    let alertButtonArr: Array<any> = [
      {
        text: `Add new ${inputTitle}`,
        onPress: () => {
          handleChange('');
        },
      },
      {
        text: 'Cancel',
        onPress: () => {},
      },
    ];
    if (inputTitle === 'Job Title') {
      jobArr?.jobs.forEach((element: string) => {
        alertButtonArr.unshift({
          text: element,
          onPress: () => {
            handleChange(element);
          },
        });
      });
    }
    return alertButtonArr;
  }

  const alertArr = createAlertButtonArr();

  function handleSelectablePressed() {
    Alert.alert(
      `Please select a ${inputTitle}`,
      `Or add a new ${inputTitle}`,
      alertArr,
    );
  }

  const iconComponentArray = iconComponentArrayToSize(
    iconSmall.width,
    iconSmall.height,
  );

  const iconComponent = iconComponentArray.find(obj => obj.name === iconName);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{color: textColor, fontWeight: '600'}}>{inputTitle}</Text>
      </View>
      <View style={styles.textInputContainer}>
        <View
          style={{
            marginRight: multiline ? 0 : -50,
            zIndex: 1000,
          }}>
          {multiline ? null : iconComponent!.icon}
        </View>
        <TextInput
          style={{
            paddingLeft: multiline ? 10 : 45,
            paddingTop: multiline ? 10 : null,
            paddingRight: multiline ? 5 : 0,
            backgroundColor: Colors.lighterGrey,
            width: isDefault ? '65%' : '95%',
            height: multiline ? 80 : 50,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: isDefault ? 0 : 15,
            borderBottomRightRadius: isDefault ? 0 : 15,
            marginLeft: multiline ? 0 : -10,
            color: 'black',
          }}
          keyboardType={keyboardType}
          placeholderTextColor={Colors.grey}
          placeholder={placeholder}
          onChangeText={handleChange}
          onBlur={handleBlur}
          value={handleValueProp(inputValue)}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          onFocus={() =>
            inputTitle === 'Job Title' ? handleSelectablePressed() : null
          }
        />
        {isDefault ? (
          <Pressable
            android_ripple={{
              color: Colors.white,
              borderless: false,
              foreground: true,
            }}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? Colors.dark : Colors.primary,
                width: '30%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
              },
            ]}
            onPress={() => setDefaultValue(inputValue)}>
            <View>
              <Text style={{color: Colors.white}}>Tap to</Text>
              <Text style={{color: Colors.white}}>set as default</Text>
            </View>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  titleContainer: {
    marginBottom: -1,
    marginRight: '80%',
    zIndex: 1000,
    alignSelf: 'flex-start',
    width: 200,
    paddingLeft: 20,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultButton: {
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});
