import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Colors from '../global/Colors';

export default function ViewTipModal({
  leftButtonText,
  titleText,
  rightButtonText,
  leftButtonFunction,
  rightButtonFunction,
}: any) {
  return (
    <View style={styles.modalHeaderContainer}>
      <Pressable onPress={() => leftButtonFunction()}>
        <View style={styles.leftButtonContainer}>
          <Text style={[styles.modalHeaderButton, styles.textShadowStyle]}>
            {leftButtonText}
          </Text>
        </View>
      </Pressable>
      <View>
        <Text style={[styles.modalTitle, styles.textShadowStyle]}>
          {titleText}
        </Text>
      </View>
      <Pressable onPress={() => rightButtonFunction()}>
        <View style={styles.rightButtonContainer}>
          <Text style={[styles.modalHeaderButton, styles.textShadowStyle]}>
            {rightButtonText}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  modalHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: '5%',
    paddingBottom: 20,
  },
  modalTitle: {
    color: 'white',
    fontWeight: '800',
  },
  leftButtonContainer: {
    paddingLeft: 20,
  },
  rightButtonContainer: {
    paddingRight: 20,
  },
  modalHeaderButton: {
    color: 'white',
    fontWeight: '700',
  },
  textShadowStyle: {
    textShadowColor: Colors.textShadow,
    textShadowRadius: Colors.shadowRadius,
    textShadowOffset: Colors.shadowOffset,
  },
  agendaSectionTitle: {fontSize: 16, fontWeight: '600'},
  informationItemTitle: {paddingTop: 5},
});
