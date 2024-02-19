import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../global/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InfoObj {
  iconName: string;
  title: string;
  amount: string;
  color: string;
}

export default function InformationItem(infoObj: InfoObj): React.JSX.Element {
  const cashIcon = (
    <Icon name={infoObj?.iconName} size={30} color={infoObj.color} />
  );
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center'}}>
          <Text>{cashIcon}</Text>
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
});
