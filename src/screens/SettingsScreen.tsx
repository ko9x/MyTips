import React, {useState} from 'react';
import {View} from 'react-native';
import SettingSwitch from '../components/SettingSwitch';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen(): React.JSX.Element {
  const [ASCashAndCredit, setASCashAndCredit] = useState();
  const [ASTipIn, setASTipIn] = useState();
  const [ASTipOut, setASTipOut] = useState();
  const [ASTotalSales, setASTotalSales] = useState();
  const [ASSection, setASSection] = useState();
  const [ASHourlyRate, setASHourlyRate] = useState();
  const storageObjectArray: Array<any> = [
    {
      name: 'Cash and Credit Option',
      defaultState: 'On',
      setterFunc: setASCashAndCredit,
    },
    {
      name: 'Tip In Option',
      defaultState: 'Off',
      setterFunc: setASTipIn,
    },
    {
      name: 'Tip Out Option',
      defaultState: 'Off',
      setterFunc: setASTipOut,
    },
    {
      name: 'Total Sales Option',
      defaultState: 'Off',
      setterFunc: setASTotalSales,
    },
    {
      name: 'Section Option',
      defaultState: 'Off',
      setterFunc: setASSection,
    },
    {
      name: 'Hourly Rate Option',
      defaultState: 'On',
      setterFunc: setASHourlyRate,
    },
  ];
  async function createDefaultStorageState() {
    // If this is not the first time the app is being launched, grab the stored state for each switch
    if ((await getData('Cash and Credit Option')) !== undefined) {
      storageObjectArray.forEach(element => {
        getAndSetData(element.name, element.setterFunc);
      });
    }
    // If this is the first time the app is being launched set the defaults for each switch
    if ((await getData('Cash and Credit Option')) === undefined) {
      storageObjectArray.forEach(element => {
        storeData(element.name, element.defaultState);
        element.setterFunc(element.defaultState);
      });
    }
  }
  const storeData = async (propName: string, propVal: string) => {
    try {
      await AsyncStorage.setItem(propName, propVal);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (propName: string) => {
    try {
      const propVal = await AsyncStorage.getItem(propName);
      if (propVal !== null) {
        return propVal;
      }
    } catch (e) {
      // error reading value
    }
  };

  const getAndSetData = async (propName: string, setterFunc: Function) => {
    try {
      const propVal = await AsyncStorage.getItem(propName);
      if (propVal !== null) {
        setterFunc(propVal);
      }
    } catch (e) {
      // error reading value
    }
  };

  createDefaultStorageState();
  return (
    <View>
      <SettingSwitch
        iconName={'dollar-card'}
        titleText={'Cash and Credit Option'}
        currentState={ASCashAndCredit}
      />
    </View>
  );
}
