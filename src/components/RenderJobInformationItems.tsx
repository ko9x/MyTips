import React from 'react';
import {View, FlatList} from 'react-native';
import {toDollars, toHoursAndMinutes} from '../helpers/helpers';
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
    itemName: 'job',
    iconName: 'notebook-outline',
    title: 'job title',
    color: Colors.dark,
    key: 1,
    itemFunction: (itemVal: string) => {
      return itemVal;
    },
  },
  {
    itemName: 'time',
    iconName: 'clock-time-three-outline',
    title: 'time worked',
    color: Colors.dark,
    key: 2,
    itemFunction: (itemNum: number) => {
      const timeObj = toHoursAndMinutes(itemNum);
      return `${timeObj.hours} hrs ${timeObj.minutes} mins`;
    },
  },
  {
    itemName: 'hourly_rate',
    iconName: 'cash-fast',
    title: 'hourly wage',
    color: Colors.dark,
    key: 3,
    itemFunction: (itemNum: number) => {
      return toDollars(itemNum);
    },
  },
];
function informationItemsBuilder(
  infoItemBuilderObj: InfoItemBuilderObj,
  itemArr: Array<any>,
) {
  console.log(itemArr);

  let itemVal: string = '';
  itemArr.forEach(item => {
    if (item.hasOwnProperty(infoItemBuilderObj.itemName)) {
      itemVal = infoItemBuilderObj.itemFunction(
        item?.[infoItemBuilderObj.itemName],
      );
    }
  });
  const infoObj = {
    iconName: infoItemBuilderObj.iconName,
    title: infoItemBuilderObj.title,
    amount: itemVal,
    color: infoItemBuilderObj.color,
  };
  return <InformationItem key={infoItemBuilderObj.key} {...infoObj} />;
}
export default function RenderJobInformationItems({
  reservationData,
  itemId,
}: any) {
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

    return filteredBuiltInfoItemsArr;
  }

  function renderItem(item: any) {
    return <View style={{width: '45%'}}>{item.item}</View>;
  }

  const ItemArr = renderInformationItems(
    infoItemBuilderObjArr,
    reservationData,
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
