import React from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  Button,
} from 'react-native';
import Colors from '../global/Colors';
import Cash from '../assets/SVG/cash.svg';
import {iconSmall} from '../global/Variables';

export default function TipItemInput({
  handleChange,
  handleBlur,
  values,
  inputTitle,
  textColor,
  iconColor,
  iconName,
}: any) {
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
        <Text style={{color: textColor}}>{inputTitle}</Text>
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
          <Cash
            width={iconSmall.width}
            height={iconSmall.height}
            fill={iconColor}
          />
        </View>
        <TextInput
          style={{
            paddingLeft: 45,
            backgroundColor: Colors.lighterGrey,
            width: '95%',
            height: 50,
            borderRadius: 15,
            marginLeft: -10,
          }}
          placeholder={'Enter amount'}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
        />
      </View>
    </View>
  );
}
