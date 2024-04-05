import React from 'react';
import {View} from 'react-native';
import InformationAlert from '../components/InformationAlert';

export default function ExportScreen(): React.JSX.Element {
  function handleAlertPress(title: string, message: string) {
    return;
  }
  return (
    <View>
      <InformationAlert
        title={'Export Tips'}
        message={
          'Export your tip database file for a backup or to transfer to a new device'
        }
      />
      <InformationAlert
        title={'Import Tips'}
        message={
          'Import a tip database file. Warning, this will delete the existing database and replace it with the imported database. We recommend you export your existing database first as a backup'
        }
      />
    </View>
  );
}
