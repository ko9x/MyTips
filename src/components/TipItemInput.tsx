import React from 'react';
import {View, TextInput, Text} from 'react-native';
import Colors from '../global/Colors';
import Cash from '../assets/SVG/cash.svg';
import CreditCard from '../assets/SVG/credit-card.svg';
import {iconSmall} from '../global/Variables';
import {iconComponentArrayToSize} from '../helpers/helpers';

export default function TipItemInput({
  handleChange,
  handleBlur,
  value,
  inputTitle,
  placeholder,
  textColor,
  iconColor,
  iconName,
  keyboardType,
}: any) {
  let inputValue;
  if (value && keyboardType === 'numeric') {
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
            marginRight: -50,
            zIndex: 1000,
          }}>
          {iconComponent!.icon}
        </View>
        <TextInput
          style={{
            paddingLeft: 45,
            backgroundColor: Colors.lighterGrey,
            width: '95%',
            height: 50,
            borderRadius: 15,
            marginLeft: -10,
            color: 'black',
          }}
          keyboardType={keyboardType}
          placeholderTextColor={Colors.grey}
          placeholder={placeholder}
          onChangeText={handleChange}
          onBlur={handleBlur}
          value={inputValue}
        />
      </View>
    </View>
  );
}
