import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface OptionsContextType {
  ASCashAndCredit: string;
  ASTipIn: string;
  ASTipOut: string;
  ASTotalSales: string;
  ASSection: string;
  ASHourlyRate: string;
  createDefaultStorageState: Function;
}

export const OptionsContext = createContext({} as OptionsContextType);

export const OptionsProvider = ({children}: any) => {
  const [ASCashAndCredit, setASCashAndCredit] = useState<string>('');
  const [ASTipIn, setASTipIn] = useState('');
  const [ASTipOut, setASTipOut] = useState('');
  const [ASTotalSales, setASTotalSales] = useState('');
  const [ASSection, setASSection] = useState('');
  const [ASHourlyRate, setASHourlyRate] = useState('');
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

  const optionsContextContent = {
    ASCashAndCredit,
    ASTipIn,
    ASTipOut,
    ASTotalSales,
    ASSection,
    ASHourlyRate,
    createDefaultStorageState: async () => {
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
    },
  };
  return (
    <OptionsContext.Provider value={optionsContextContent}>
      {children}
    </OptionsContext.Provider>
  );
};
