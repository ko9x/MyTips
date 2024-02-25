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
        <View style={styles.listItemContainer}>
          <View style={styles.listItemTopSectionContainer}>
            <Text>job: {item.job}</Text>
            <Text>section: {item.section}</Text>
          </View>
          <View style={styles.listItemHorizontalDivider} />
          <View style={styles.listItemBottomSectionContainer}>
            <View style={styles.bottomSectionItemContainer}>
              <Text>tips</Text>
              <Text>{toDollars(findCorrectItem(totalMoney, item.id))}</Text>
            </View>
            <View>
              <Text style={styles.tipSummaryDivider}>|</Text>
            </View>
            <View style={styles.bottomSectionItemContainer}>
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
            <View style={styles.bottomSectionItemContainer}>
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
  listItemContainer: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  listItemTopSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  listItemHorizontalDivider: {
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  listItemBottomSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 10,
  },
  bottomSectionItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipSummaryDivider: {color: Colors.lightGrey},
});
