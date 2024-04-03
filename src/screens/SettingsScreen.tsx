import React, {useContext} from 'react';
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
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

  function handleAlertPress(alertTitle: string, alertMessage: string) {
    Alert.alert(alertTitle, alertMessage, [
      {
        text: 'Okay',
        onPress: () => {},
      },
    ]);
  }

  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Optional Fields</Text>
        <Pressable
          style={{
            marginLeft: -20,
            marginRight: -10,
          }}
          onPress={() =>
            handleAlertPress(
              'Optional Fields',
              'Add or remove optional fields to better manage your tips',
            )
          }>
          <Information
            width={iconSmall.width}
            height={iconSmall.height}
            color={Colors.dark}
          />
        </Pressable>
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
        <Pressable
          style={{
            marginLeft: -20,
            marginRight: -10,
          }}
          onPress={() =>
            handleAlertPress(
              'Optional Defaults',
              'Set default values for fields that will be the same for all tips',
            )
          }>
          <Information
            width={iconSmall.width}
            height={iconSmall.height}
            color={Colors.dark}
          />
        </Pressable>
      </View>
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
