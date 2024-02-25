import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../global/Colors';

export default function MultiItemBar({props}: any): React.JSX.Element {
  return (
    <View style={styles.tipSummaryContainer}>
      <View>
        <Text>{props.first}</Text>
      </View>
      <View>
        <Text style={styles.tipSummaryDivider}>|</Text>
      </View>
      <Text>
        {props.second.hours} {props.second.hours > 1 ? 'hrs' : 'hr'}
        <Text> </Text>
        {props.second.minutes} {props.second.minutes > 1 ? 'mins' : 'min'}
      </Text>
      <Text style={styles.tipSummaryDivider}>|</Text>
      <View>
        <Text>{props.third}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tipSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    height: 40,
    marginVertical: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: Colors.lighterGrey,
  },
  tipSummaryDivider: {color: Colors.lightGrey},
});
