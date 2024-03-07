import React from 'react';
import {View, TextInput, Text} from 'react-native';
import Colors from '../global/Colors';
import {iconSmall} from '../global/Variables';
import {iconComponentArrayToSize} from '../helpers/helpers';

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
}: any) {
  let inputValue;
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

  const iconComponentArray = iconComponentArrayToSize(
    iconSmall.width,
    iconSmall.height,
  );

  const iconComponent = iconComponentArray.find(obj => obj.name === iconName);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
      }}>
      <View
        style={{
          marginBottom: -1,
          marginRight: '80%',
          zIndex: 1000,
        }}>
        <Text style={{color: textColor, fontWeight: '600'}}>{inputTitle}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
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
            width: '95%',
            height: multiline ? 80 : 50,
            borderRadius: 15,
            marginLeft: multiline ? 0 : -10,
            color: 'black',
          }}
          keyboardType={keyboardType}
          placeholderTextColor={Colors.grey}
          placeholder={placeholder}
          onChangeText={handleChange}
          onBlur={handleBlur}
          value={
            money
              ? inputValue?.toString().split(',').join('')
              : inputValue?.toString()
          }
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </View>
    </View>
  );
}
