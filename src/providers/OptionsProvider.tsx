import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface OptionsContextType {
  ASCashAndCredit: string;
  ASTipIn: string;
  ASTipOut: string;
  ASTotalSales: string;
  ASSection: string;
  ASHourlyRate: string;
  ASJobTitleDefault: string;
  ASHoursDefault: string;
  ASMinutesDefault: string;
  ASHourlyRateDefault: string;
  databaseImported: boolean;
  setDatabaseImported: Function;
  createDefaultStorageState: Function;
  clearAllAsyncStorage: Function;
}

export const OptionsContext = createContext({} as OptionsContextType);

export const OptionsProvider = ({children}: any) => {
  const [ASCashAndCredit, setASCashAndCredit] = useState('');
  const [ASTipIn, setASTipIn] = useState('');
  const [ASTipOut, setASTipOut] = useState('');
  const [ASTotalSales, setASTotalSales] = useState('');
  const [ASSection, setASSection] = useState('');
  const [ASHourlyRate, setASHourlyRate] = useState('');
  const [ASJobTitleDefault, setASJobTitleDefault] = useState('');
  const [ASHoursDefault, setASHoursDefault] = useState('');
  const [ASMinutesDefault, setASMinutesDefault] = useState('');
  const [ASHourlyRateDefault, setASHourlyRateDefault] = useState('');
  // databaseImported is used to trigger the initializeApp function when a user imports a new database
  const [databaseImported, setDatabaseImported] = useState(false);
  const storageObjectArray: Array<any> = [
    {
      name: 'Cash and Credit Field',
      defaultState: 'On',
      setterFunc: setASCashAndCredit,
    },
    {
      name: 'Tip In Field',
      defaultState: 'Off',
      setterFunc: setASTipIn,
    },
    {
      name: 'Tip Out Field',
      defaultState: 'Off',
      setterFunc: setASTipOut,
    },
    {
      name: 'Total Sales Field',
      defaultState: 'Off',
      setterFunc: setASTotalSales,
    },
    {
      name: 'Section Field',
      defaultState: 'Off',
      setterFunc: setASSection,
    },
    {
      name: 'Hourly Rate Field',
      defaultState: 'On',
      setterFunc: setASHourlyRate,
    },
    {
      name: 'Default Job Title',
      defaultState: 'On',
      setterFunc: setASJobTitleDefault,
    },
    {
      name: 'Default Hours',
      defaultState: 'Off',
      setterFunc: setASHoursDefault,
    },
    {
      name: 'Default Minutes',
      defaultState: 'Off',
      setterFunc: setASMinutesDefault,
    },
    {
      name: 'Default Hourly Rate',
      defaultState: 'On',
      setterFunc: setASHourlyRateDefault,
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
    ASJobTitleDefault,
    ASHoursDefault,
    ASMinutesDefault,
    ASHourlyRateDefault,
    databaseImported,
    setDatabaseImported,
    createDefaultStorageState: async () => {
      // If this is not the first time the app is being launched, grab the stored state for each switch
      if ((await getData('Cash and Credit Field')) !== undefined) {
        storageObjectArray.forEach(element => {
          getAndSetData(element.name, element.setterFunc);
        });
      }
      // If this is the first time the app is being launched set the defaults for each switch
      if ((await getData('Cash and Credit Field')) === undefined) {
        storageObjectArray.forEach(element => {
          storeData(element.name, element.defaultState);
          element.setterFunc(element.defaultState);
        });
      }
    },
    clearAllAsyncStorage: async () => {
      AsyncStorage.clear();
    },
  };
  return (
    <OptionsContext.Provider value={optionsContextContent}>
      {children}
    </OptionsContext.Provider>
  );
};
