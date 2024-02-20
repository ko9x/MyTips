import React from 'react';
import {toDollars, combineHourlyRateAndTime} from '../helpers/helpers';
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
    iconName: 'cash-fast',
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
  const infoObj = {
    iconName: infoItemBuilderObj.iconName,
    title: infoItemBuilderObj.title,
    amount: toDollars(total),
    color: infoItemBuilderObj.color,
  };
  return <InformationItem key={infoItemBuilderObj.key} {...infoObj} />;
}
export default function RenderInformationItems(
  reservationDataArray: Array<any>,
) {
  function renderInformationItems(
    infoItemArr: Array<any>,
    reservationDataArr: Array<any>,
  ) {
    const builtInfoItemArr: Array<any> = [];
    infoItemArr.forEach(item => {
      builtInfoItemArr.push(informationItemsBuilder(item, reservationDataArr));
    });
    return builtInfoItemArr;
  }

  return renderInformationItems(
    infoItemBuilderObjArr,
    Object.values(reservationDataArray)[0],
  );
}
