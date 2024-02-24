import React from 'react';
import {View, FlatList} from 'react-native';
import {jobInfoItemBuilderObjArr} from '../helpers/helpers';
import InformationItem from './InformationItem';

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

    return filteredBuiltInfoItemsArr;
  }

  function renderItem(item: any) {
    return <View style={{width: '45%'}}>{item.item}</View>;
  }

  const ItemArr = renderInformationItems(
    jobInfoItemBuilderObjArr,
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
