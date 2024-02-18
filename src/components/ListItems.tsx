import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../global/Colors';
import {
  toDollars,
  toHoursAndMinutes,
  toPerHour,
  combineMoney,
} from '../helpers/helpers';

export default function ListItems({itemArr}: any): React.JSX.Element {
  const totalMoney = Number(combineMoney(itemArr));
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
          <Text>Job: {item.job}</Text>
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
            <Text>{toDollars(totalMoney)}</Text>
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
              {toHoursAndMinutes(item.time).hours}{' '}
              {toHoursAndMinutes(item.time).hours > 1 ? 'hrs' : 'hr'}
              <Text> </Text>
              {toHoursAndMinutes(item.time).minutes}{' '}
              {toHoursAndMinutes(item.time).minutes > 1 ? 'mins' : 'min'}
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
            <Text>${toPerHour(item.time, totalMoney)}/hr</Text>
          </View>
        </View>
      </View>
    </View>
  ));
}

const styles = StyleSheet.create({
  tipSummaryDivider: {color: Colors.lighterGrey},
});
