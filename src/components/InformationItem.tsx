import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../global/Colors';
import BookOutline from '../assets/SVG/book-outline.svg';
import CashCheck from '../assets/SVG/cash-check.svg';
import CashClock from '../assets/SVG/cash-clock.svg';
import CashEdit from '../assets/SVG/cash-edit.svg';
import CashFast from '../assets/SVG/cash-fast.svg';
import CashMinus from '../assets/SVG/cash-minus.svg';
import CashMultiple from '../assets/SVG/cash-multiple.svg';
import CashPlus from '../assets/SVG/cash-plus.svg';
import CashRegister from '../assets/SVG/cash-register.svg';
import CashRemove from '../assets/SVG/cash-remove.svg';
import CashSync from '../assets/SVG/cash-sync.svg';
import Cash from '../assets/SVG/cash.svg';
import ClockOutline from '../assets/SVG/clock-outline.svg';
import CreditCard from '../assets/SVG/credit-card.svg';

interface InfoObj {
  iconName: string;
  title: string;
  amount: string;
  color: string;
}

const iconSize = {
  width: 90,
  height: 30,
};

const iconComponentArray: Array<any> = [
  {
    name: 'cash-check',
    icon: (
      <CashCheck
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
  {
    name: 'book-outline',
    icon: (
      <BookOutline
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
  {
    name: 'cash-clock',
    icon: (
      <CashClock
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
  {
    name: 'cash-edit',
    icon: (
      <CashEdit
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
  {
    name: 'cash-multiple',
    icon: (
      <CashMultiple
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
  {
    name: 'cash-plus',
    icon: (
      <CashPlus
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
  {
    name: 'cash-register',
    icon: (
      <CashRegister
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
  {
    name: 'cash-remove',
    icon: (
      <CashRemove
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
  {
    name: 'cash-sync',
    icon: (
      <CashSync
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
  {
    name: 'cash-fast',
    icon: (
      <CashFast
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
  {
    name: 'cash-minus',
    icon: (
      <CashMinus
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.danger}
      />
    ),
  },
  {
    name: 'cash',
    icon: (
      <Cash
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
  {
    name: 'clock-outline',
    icon: (
      <ClockOutline
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
  {
    name: 'credit-card',
    icon: (
      <CreditCard
        width={iconSize.width}
        height={iconSize.height}
        fill={Colors.dark}
      />
    ),
  },
];

export default function InformationItem(infoObj: InfoObj): React.JSX.Element {
  const cashIcon = iconComponentArray.find(
    obj => obj.name === infoObj.iconName,
  );
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center'}}>
          <View style={{marginLeft: -30, marginRight: -30}}>
            {cashIcon?.icon}
          </View>
        </View>
        <View style={{paddingLeft: 10}}>
          <Text>{infoObj?.title}</Text>
          <Text style={{color: infoObj.color, fontWeight: '600'}}>
            {infoObj?.amount}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {backgroundColor: 'white', padding: 10},
});
