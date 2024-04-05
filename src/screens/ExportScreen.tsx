import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import InformationAlert from '../components/InformationAlert';
import AddTipButton from '../components/AddTipButton';
import Colors from '../global/Colors';
import {connectToDatabase} from '../providers/TipProvider';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import {OptionsContext} from '../providers/OptionsProvider';

export default function ExportScreen(): React.JSX.Element {
  const [files, setFiles] = useState<any>([]);
  const {setDatabaseImported} = useContext(OptionsContext);

  const getFileContent = async (path: any) => {
    const reader = await RNFS.readDir(path);
    setFiles(reader);
  };

  const replaceDatabase = async (DBPath: any) => {
    setDatabaseImported(false);
    const db = await connectToDatabase();
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      await db.close();
      await RNFS.unlink(DBPath);
      await RNFS.copyFile(response[0].uri, DBPath);
      setDatabaseImported(true);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getFileContent(RNFS.DocumentDirectoryPath);
  }, []);

  function shareDB() {
    Share.open({
      url: files[2].path,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  }
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
          onPressFunc={() => shareDB()}
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
          onPressFunc={() => replaceDatabase(files[2].path)}
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
