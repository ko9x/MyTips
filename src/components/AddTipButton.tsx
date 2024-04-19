import React from 'react';
import {View, Text, Pressable} from 'react-native';
import DollarCard from '../assets/SVG/dollar-card.svg';
import FileExport from '../assets/SVG/file-export.svg';
import FileImport from '../assets/SVG/file-import.svg';
import Update from '../assets/SVG/update.svg';
import {iconSmall} from '../global/Variables';
import Colors from '../global/Colors';

export default function AddTipButton({onPressFunc, iconName, buttonText}: any) {
  function determineIcon() {
    if (iconName === 'dollar-card') {
      return (
        <DollarCard
          width={iconSmall.width}
          height={iconSmall.height}
          color={Colors.white}
        />
      );
    }
    if (iconName === 'file-export') {
      return (
        <FileExport
          width={iconSmall.width}
          height={iconSmall.height}
          color={Colors.white}
        />
      );
    }
    if (iconName === 'file-import') {
      return (
        <FileImport
          width={iconSmall.width}
          height={iconSmall.height}
          color={Colors.white}
        />
      );
    }
    if (iconName === 'update') {
      return (
        <Update
          width={iconSmall.width}
          height={iconSmall.height}
          color={Colors.white}
        />
      );
    }
  }
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
          shadowOpacity: 0.5,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 2.5,
          elevation: 3,
        },
      ]}
      onPress={() => {
        onPressFunc();
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
          {determineIcon()}
        </View>
        <Text style={{color: Colors.white, fontWeight: '600'}}>
          {buttonText}
        </Text>
      </View>
    </Pressable>
  );
}
