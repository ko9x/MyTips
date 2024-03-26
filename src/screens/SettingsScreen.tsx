import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import SettingSwitch from '../components/SettingSwitch';
import {OptionsContext} from '../providers/OptionsProvider';

export default function SettingsScreen(): React.JSX.Element {
  const {
    ASCashAndCredit,
    ASTipIn,
    ASTipOut,
    ASTotalSales,
    ASSection,
    ASHourlyRate,
  } = useContext(OptionsContext);
  return (
    <View>
      <SettingSwitch
        iconName={'dollar-card'}
        titleText={'Cash and Credit Option'}
        currentState={ASCashAndCredit}
      />
      <SettingSwitch
        iconName={'cash-plus'}
        titleText={'Tip In Option'}
        currentState={ASTipIn}
      />
      <SettingSwitch
        iconName={'cash-minus'}
        titleText={'Tip Out Option'}
        currentState={ASTipOut}
      />
      <SettingSwitch
        iconName={'cash-register'}
        titleText={'Total Sales Option'}
        currentState={ASTotalSales}
      />
      <SettingSwitch
        iconName={'map-marker'}
        titleText={'Section Option'}
        currentState={ASSection}
      />
      <SettingSwitch
        iconName={'cash-clock'}
        titleText={'Hourly Rate Option'}
        currentState={ASHourlyRate}
      />
    </View>
  );
}
