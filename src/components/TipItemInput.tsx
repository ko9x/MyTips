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
  if (value === null || value === '0.00') {
    console.log('null value for', inputTitle);

    return;
  }
  let inputValue;
  if (money) {
    if (value?.charAt(0) === '$') {
      let tempVal;
      tempVal = value.slice(1);
      inputValue = `$${tempVal}`;
    } else {
      inputValue = `$${value}`;
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
          value={inputValue.toString()}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </View>
    </View>
  );
}
