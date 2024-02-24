import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {iconComponentArray} from '../helpers/helpers';

interface InfoObj {
  iconName: string;
  title: string;
  amount: string;
  color: string;
}

export default function InformationItem(infoObj: InfoObj): React.JSX.Element {
  const cashIcon = iconComponentArray.find(
    obj => obj.name === infoObj.iconName,
  );
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center'}}>
          <View style={styles.iconContainer}>{cashIcon?.icon}</View>
        </View>
        <View style={{paddingLeft: 10}}>
          <Text>{infoObj?.title}</Text>
          <Text style={{color: infoObj.color, fontWeight: '600'}}>
            {infoObj?.amount}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {backgroundColor: 'white', padding: 10},
  iconContainer: {marginLeft: -30, marginRight: -30},
});
