import React from 'react';
import {View, FlatList} from 'react-native';
import {
  toDollars,
  toPerHour,
  combineHourlyRateAndTime,
  combineDayMoney,
} from '../helpers/helpers';
import InformationItem from './InformationItem';
import Colors from '../global/Colors';

// Interfaces
interface InfoItemBuilderObj {
  itemName: string;
  iconName: string;
  title: string;
  color: string;
  key: number;
  itemFunction: Function;
}
// Arrays
const infoItemBuilderObjArr: Array<any> = [
  {
    itemName: 'cash',
    iconName: 'cash',
    title: 'cash',
    color: Colors.dark,
    key: 1,
    itemFunction: (totalNum: number, itemNum: number) => {
      return totalNum + itemNum;
    },
  },
  {
    itemName: 'credit',
    iconName: 'credit-card',
    title: 'credit',
    color: Colors.dark,
    key: 2,
    itemFunction: (totalNum: number, itemNum: number) => {
      return (totalNum += itemNum);
    },
  },
  {
    itemName: 'hourly_rate',
    iconName: 'cash-check',
    title: 'wages',
    color: Colors.dark,
    key: 3,
    itemFunction: combineHourlyRateAndTime,
  },
  {
    itemName: 'tip_in',
    iconName: 'cash-plus',
    title: 'tip in',
    color: Colors.dark,
    key: 4,
    itemFunction: (totalNum: number, itemNum: number) => {
      return (totalNum += itemNum);
    },
  },
  {
    itemName: 'tip_out',
    iconName: 'cash-minus',
    title: 'tip out',
    color: Colors.danger,
    key: 5,
    itemFunction: (totalNum: number, itemNum: number) => {
      return (totalNum -= itemNum);
    },
  },
  {
    itemName: 'total_sales',
    iconName: 'cash-register',
    title: 'total sales',
    color: Colors.dark,
    key: 6,
    itemFunction: (totalNum: number, itemNum: number) => {
      return totalNum + itemNum;
    },
  },
];
// Functions
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
// Start of RenderTipInformationItems function //////////////////////////////
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
    infoItemBuilderObjArr,
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
