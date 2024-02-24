import React from 'react';
import {View, FlatList} from 'react-native';
import {
  toDollars,
  toPerHour,
  combineDayMoney,
  tipInfoItemBuilderObjArr,
} from '../helpers/helpers';
import InformationItem from './InformationItem';
import Colors from '../global/Colors';

interface InfoItemBuilderObj {
  itemName: string;
  iconName: string;
  title: string;
  color: string;
  key: number;
  itemFunction: Function;
}

function informationItemsBuilder(
  infoItemBuilderObj: InfoItemBuilderObj,
  itemArr: Array<any>,
) {
  let total: number = 0;
  itemArr.forEach(item => {
    if (
      item.hasOwnProperty(infoItemBuilderObj.itemName) &&
      infoItemBuilderObj.itemName === 'hourly_rate'
    ) {
      total += infoItemBuilderObj.itemFunction(item.hourly_rate, item.time);
    }
    if (
      item.hasOwnProperty(infoItemBuilderObj.itemName) &&
      infoItemBuilderObj.itemName !== 'hourly_rate'
    ) {
      total = infoItemBuilderObj.itemFunction(
        total,
        item?.[infoItemBuilderObj.itemName],
      );
    }
  });
  // Only add information items that have a positive or negative amount
  if (total !== 0) {
    const infoObj = {
      iconName: infoItemBuilderObj.iconName,
      title: infoItemBuilderObj.title,
      amount: toDollars(total),
      color: infoItemBuilderObj.color,
    };
    return <InformationItem key={infoItemBuilderObj.key} {...infoObj} />;
  }
}
function totalPerHourItem(itemArr: Array<any>) {
  let time: number = 0;
  itemArr.find(item => {
    time = item.time;
  });
  const infoObj = {
    iconName: 'cash-clock',
    title: 'per hour',
    amount: toPerHour(time, combineDayMoney(itemArr)),
    color: Colors.dark,
  };
  return <InformationItem key={7} {...infoObj} />;
}
// Start of RenderTipInformationItems Component //////////////////////////////
export default function RenderTipInformationItems({
  reservationData,
  itemId,
  showTotalPerHr,
}: any) {
  let reservationDataById: Array<any> = [];
  if (itemId) {
    reservationData.forEach((obj: {id: any}) => {
      if (obj.id === itemId) {
        reservationDataById = [obj];
      }
    });
  } else {
    reservationDataById = reservationData;
  }
  function renderInformationItems(
    infoItemArr: Array<any>,
    reservationDataArr: Array<any>,
  ) {
    const builtInfoItemArr: Array<any> = [];
    infoItemArr.forEach(item => {
      builtInfoItemArr.push(informationItemsBuilder(item, reservationDataArr));
    });
    // Filter out undefined info items that had an amount of 0
    const filteredBuiltInfoItemsArr = builtInfoItemArr.filter(element => {
      return element !== undefined;
    });

    if (showTotalPerHr) {
      filteredBuiltInfoItemsArr.push(totalPerHourItem(reservationDataById));
    }

    return filteredBuiltInfoItemsArr;
  }

  function renderItem(item: any) {
    return <View style={{width: '45%'}}>{item.item}</View>;
  }

  const ItemArr = renderInformationItems(
    tipInfoItemBuilderObjArr,
    reservationDataById,
  );

  return (
    <View>
      <FlatList
        data={ItemArr}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        numColumns={2}
        columnWrapperStyle={{flexWrap: 'wrap'}}
      />
    </View>
  );
}
