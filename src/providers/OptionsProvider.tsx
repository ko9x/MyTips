import React, {createContext, useState} from 'react';

export interface OptionsContextType {
  ASCashAndCredit: string;
  ASTipIn: string;
  ASTipOut: string;
  ASTotalSales: string;
  ASSection: string;
  ASHourlyRate: string;
}

export const OptionsContext = createContext({} as OptionsContextType);

export const OptionsProvider = ({children}: any) => {
  const [ASCashAndCredit, setASCashAndCredit] = useState<string>('hello');
  const [ASTipIn, setASTipIn] = useState('');
  const [ASTipOut, setASTipOut] = useState('');
  const [ASTotalSales, setASTotalSales] = useState('');
  const [ASSection, setASSection] = useState('');
  const [ASHourlyRate, setASHourlyRate] = useState('');
  const optionsContextContent = {
    ASCashAndCredit,
    ASTipIn,
    ASTipOut,
    ASTotalSales,
    ASSection,
    ASHourlyRate,
  };
  return (
    <OptionsContext.Provider value={optionsContextContent}>
      {children}
    </OptionsContext.Provider>
  );
};
