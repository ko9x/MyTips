import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SettingSwitch from '../components/SettingSwitch';
import {OptionsContext} from '../providers/OptionsProvider';
import Information from '../assets/SVG/information-variant-circle-outline.svg';
import {iconSmall} from '../global/Variables';
import Colors from '../global/Colors';

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
    clearAllAsyncStorage,
  } = useContext(OptionsContext);

  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Optional Fields</Text>
        <View
          style={{
            marginLeft: -20,
            marginRight: -10,
          }}>
          <Information
            width={iconSmall.width}
            height={iconSmall.height}
            color={Colors.dark}
          />
        </View>
      </View>
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
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Optional Defaults</Text>
        <View
          style={{
            marginLeft: -20,
            marginRight: -10,
          }}>
          <Information
            width={iconSmall.width}
            height={iconSmall.height}
            color={Colors.dark}
          />
        </View>
      </View>
      <SettingSwitch
        iconName={'book-outline'}
        titleText={'Job Title Default'}
        currentState={ASJobTitleDefault}
      />
      <SettingSwitch
        iconName={'clock-outline'}
        titleText={'Hours Default'}
        currentState={ASHoursDefault}
      />
      <SettingSwitch
        iconName={'clock-outline'}
        titleText={'Minutes Default'}
        currentState={ASMinutesDefault}
      />
      <SettingSwitch
        iconName={'cash-clock'}
        titleText={'Hourly Rate Default'}
        currentState={ASHourlyRateDefault}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    paddingVertical: 10,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {fontSize: 16, fontWeight: '600'},
});
