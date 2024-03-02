import React from 'react';
import {View, Text, Pressable} from 'react-native';
import DollarCard from '../assets/SVG/dollar-card.svg';
import {iconSmall} from '../global/Variables';
import Colors from '../global/Colors';

export default function AddTipButton({onPressFunc}: any) {
  return (
    <Pressable
      android_ripple={{
        color: Colors.white,
        borderless: false,
        foreground: true,
      }}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? Colors.dark : Colors.primary,
          borderRadius: 20,
          shadowColor: 'black',
          shadowOpacity: 0.2,
          shadowOffset: {width: 0, height: 3},
          shadowRadius: 5,
          elevation: 3,
        },
      ]}
      onPress={() => {
        onPressFunc(true);
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
          alignItems: 'center',
        }}>
        <View
          style={{
            marginLeft: -20,
            marginRight: -10,
          }}>
          <DollarCard
            width={iconSmall.width}
            height={iconSmall.height}
            color={Colors.white}
          />
        </View>
        <Text style={{color: Colors.white, fontWeight: '600'}}>Add Tips</Text>
      </View>
    </Pressable>
  );
}
