import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, Text} from 'react-native-paper';
import {View, StyleSheet, Pressable} from 'react-native';
// import Colors from '../global/Colors';

type ButtonProps = {
  buttonName: string;
  iconName: string;
  isActive: Boolean;
  onToggleView: Function;
};

export default function IconButton({
  buttonName,
  iconName,
  isActive,
  onToggleView,
}: ButtonProps) {
  return (
    <Pressable onPress={() => (isActive ? null : onToggleView())}>
      <Button contentStyle={{flexDirection: 'column'}}>
        <AntDesign
          name={iconName}
          color={isActive ? 'blue' : 'grey'}
          size={30}
        />
      </Button>
      <View style={styles.textContainer}>
        <Text style={{color: isActive ? 'blue' : 'grey'}}>{buttonName}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  textContainer: {alignItems: 'center', marginTop: -5},
});
