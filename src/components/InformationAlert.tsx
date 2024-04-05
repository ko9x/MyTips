import React from 'react';
import {View, Text, Pressable, StyleSheet, Alert} from 'react-native';
import Information from '../assets/SVG/information-variant-circle-outline.svg';
import {iconSmall} from '../global/Variables';
import Colors from '../global/Colors';

export default function InformationAlert({title, message}: any) {
  function handleAlertPress(alertTitle: string, alertMessage: string) {
    Alert.alert(alertTitle, alertMessage, [
      {
        text: 'Okay',
        onPress: () => {},
      },
    ]);
  }
  return (
    <View style={styles.textContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Pressable
        style={styles.iconContaner}
        onPress={() => handleAlertPress(title, message)}>
        <Information
          width={iconSmall.width}
          height={iconSmall.height}
          color={Colors.dark}
        />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  textContainer: {
    paddingVertical: 10,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {fontSize: 16, fontWeight: '600'},
  iconContaner: {
    marginLeft: -20,
    marginRight: -10,
  },
});
