import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import SettingSwitch from '../components/SettingSwitch';
import {OptionsContext} from '../providers/OptionsProvider';
import InformationAlert from '../components/InformationAlert';

export default function SettingsScreen(): React.JSX.Element {
  const {
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
  } = useContext(OptionsContext);

  return (
    <ScrollView>
      <InformationAlert
        title={'Optional Fields'}
        message={
          'Add or remove optional fields to more efficiently manage your tips'
        }
      />
      <SettingSwitch
        iconName={'dollar-card'}
        titleText={'Cash and Credit Field'}
        currentState={ASCashAndCredit}
      />
      <SettingSwitch
        iconName={'cash-plus'}
        titleText={'Tip In Field'}
        currentState={ASTipIn}
      />
      <SettingSwitch
        iconName={'cash-minus'}
        titleText={'Tip Out Field'}
        currentState={ASTipOut}
      />
      <SettingSwitch
        iconName={'cash-register'}
        titleText={'Total Sales Field'}
        currentState={ASTotalSales}
      />
      <SettingSwitch
        iconName={'map-marker'}
        titleText={'Section Field'}
        currentState={ASSection}
      />
      <SettingSwitch
        iconName={'cash-clock'}
        titleText={'Hourly Rate Field'}
        currentState={ASHourlyRate}
      />
      <InformationAlert
        title={'Optional Defaults'}
        message={
          'Set default values for fields that will be the same for all tips'
        }
      />
      <SettingSwitch
        iconName={'book-outline'}
        titleText={'Default Job Title'}
        currentState={ASJobTitleDefault}
      />
      <SettingSwitch
        iconName={'clock-outline'}
        titleText={'Default Hours'}
        currentState={ASHoursDefault}
      />
      <SettingSwitch
        iconName={'clock-outline'}
        titleText={'Default Minutes'}
        currentState={ASMinutesDefault}
      />
      <SettingSwitch
        iconName={'cash-clock'}
        titleText={'Default Hourly Rate'}
        currentState={ASHourlyRate === 'On' ? ASHourlyRateDefault : 'Off'}
      />
    </ScrollView>
  );
}
