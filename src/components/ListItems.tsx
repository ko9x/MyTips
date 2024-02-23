import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../global/Colors';
import {
  toDollars,
  toHoursAndMinutes,
  toPerHour,
  combineItemMoney,
} from '../helpers/helpers';

export default function ListItems({
  itemArr,
  pressHandler,
}: any): React.JSX.Element {
  const totalMoney = combineItemMoney(itemArr);

  // Some days have more than one tip/job. In some places, only the total money for a specific job should be shown
  // This matches the id of the current item with the id in the totalMoney object
  function findCorrectItem(arr: Array<any>, num: number) {
    let item = arr.find(element => element.id === num);
    return item?.amount;
  }

  return itemArr.map((item: any) => (
    <View key={item.id}>
      <Pressable onPress={() => pressHandler(item.id)}>
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
            <Text>job: {item.job}</Text>
            <Text>section: {item.section}</Text>
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
              <Text>{toDollars(findCorrectItem(totalMoney, item.id))}</Text>
            </View>
            <View>
              <Text style={styles.tipSummaryDivider}>|</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>time worked</Text>
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
              <Text>
                {toPerHour(item.time, findCorrectItem(totalMoney, item.id))}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  ));
}

const styles = StyleSheet.create({
  tipSummaryDivider: {color: Colors.lighterGrey},
});
