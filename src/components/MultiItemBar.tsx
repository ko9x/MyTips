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
      <View>
        <Text>{props.second}</Text>
      </View>
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
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: Colors.lightGrey,
  },
  tipSummaryDivider: {color: Colors.lighterGrey},
});
