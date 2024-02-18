import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../global/Colors';
import {toDollars, toHoursAndMinutes, toPerHour} from '../helpers/helpers';

export default function ListItems({itemArr}: any): React.JSX.Element {
  return itemArr.map((item: any) => (
    <View key={item.id}>
      <View
        style={{
          borderColor: Colors.lighterGrey,
          borderWidth: 1,
          borderRadius: 20,
          marginVertical: 10,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text>Job: {item.name}</Text>
          <Text>Section: {item.section}</Text>
        </View>
        <View
          style={{
            borderBottomColor: Colors.lighterGrey,
            borderBottomWidth: 1,
            marginLeft: 5,
            marginRight: 5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>tips</Text>
            <Text>{toDollars(item.amount)}</Text>
          </View>
          <View>
            <Text style={styles.tipSummaryDivider}>|</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>shift length</Text>
            <Text>
              {toHoursAndMinutes(item.minutes).hours} hrs
              <Text> </Text>
              {toHoursAndMinutes(item.minutes).minutes} mins
            </Text>
          </View>
          <View>
            <Text style={styles.tipSummaryDivider}>|</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>per hour</Text>
            <Text>${toPerHour(item.minutes, item.amount)}/hr</Text>
          </View>
        </View>
      </View>
    </View>
  ));
}

const styles = StyleSheet.create({
  tipSummaryDivider: {color: Colors.lighterGrey},
});
