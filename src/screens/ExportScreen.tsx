import React from 'react';
import {View, StyleSheet} from 'react-native';
import InformationAlert from '../components/InformationAlert';
import AddTipButton from '../components/AddTipButton';
import Colors from '../global/Colors';

export default function ExportScreen(): React.JSX.Element {
  return (
    <View>
      <InformationAlert
        title={'Export Tips'}
        message={
          'Export your tip database file for a backup or to transfer to a new device'
        }
      />
      <View style={styles.buttonContainer}>
        <AddTipButton
          iconName={'file-export'}
          buttonText={'Export Tips Database'}
        />
      </View>
      <InformationAlert
        title={'Import Tips'}
        message={
          'Import a tip database file. Warning, this will delete the existing database and replace it with the imported database. We recommend you export your existing database first as a backup'
        }
      />
      <View style={styles.buttonContainer}>
        <AddTipButton
          iconName={'file-import'}
          buttonText={'Import Tips Database'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
  },
});
