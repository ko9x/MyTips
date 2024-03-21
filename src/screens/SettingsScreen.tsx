import React from 'react';
import {View} from 'react-native';
import SettingSwitch from '../components/SettingSwitch';

export default function SettingsScreen(): React.JSX.Element {
  return (
    <View>
      <SettingSwitch iconName={'dollar-card'} titleText={'Cash and Credit'} />
    </View>
  );
}
