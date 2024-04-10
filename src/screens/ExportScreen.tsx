import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import InformationAlert from '../components/InformationAlert';
import AddTipButton from '../components/AddTipButton';
import Colors from '../global/Colors';
import {connectToDatabase} from '../providers/TipProvider';
import Share from 'react-native-share';
import RNFS, {DownloadDirectoryPath} from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import {OptionsContext} from '../providers/OptionsProvider';

export default function ExportScreen(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [androidFiles, setAndroidFiles] = useState<any>([]);
  const {setDatabaseImported} = useContext(OptionsContext);

  const getFileContent = async (path: any, setterFunc: Function) => {
    const reader = await RNFS.readDir(path);
    setterFunc(reader);
  };

  function confirmImport() {
    Alert.alert(
      'Warning!',
      'Importing a new database will erase the existing database. We recommend you export the existing database first as a backup',
      [
        {
          text: 'Export Database',
          onPress: () => {
            shareDB();
          },
        },
        {
          text: 'Import Database',
          onPress: () => {
            if (Platform.OS === 'ios') {
              replaceDatabase(files[2].path);
            }
            if (Platform.OS === 'android') {
              replaceDatabase(androidFiles[2].path);
            }
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
    );
  }

  function wrongFileNameAlert() {
    Alert.alert(
      'Incorrect File Name',
      'The database file must have the name "tip.db"',
      [
        {
          text: 'Okay',
          onPress: () => {},
        },
      ],
    );
  }

  // Copy the database to the download folder on android since the share feature doesn't include this option
  const copyToDownloadFolder = async () => {
    try {
      await RNFS.copyFile(
        androidFiles[2].path,
        DownloadDirectoryPath + '/tip.db',
      );
    } catch (error) {
      console.log(error);
    }
  };

  const replaceDatabase = async (DBPath: any) => {
    setDatabaseImported(false);
    setIsLoading(true);
    const db = await connectToDatabase();
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      if (response[0].name === 'tip.db') {
        await db.close();
        await RNFS.unlink(DBPath);
        await RNFS.copyFile(response[0].uri, DBPath);
        setDatabaseImported(true);
        setIsLoading(false);
      } else {
        setDatabaseImported(true);
        setIsLoading(false);
        wrongFileNameAlert();
      }
    } catch (err) {
      setDatabaseImported(true);
      setIsLoading(false);
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      getFileContent(RNFS.DocumentDirectoryPath, setFiles);
    }
    if (Platform.OS === 'android') {
      getFileContent(RNFS.DocumentDirectoryPath, setFiles);
      getFileContent(
        '/data/data/com.mytips.bsproductions/databases',
        setAndroidFiles,
      );
    }
  }, []);

  function shareDB() {
    setIsLoading(true);
    // If ios, use the document share feature
    if (Platform.OS === 'ios') {
      Share.open({
        url: files[2].path,
      })
        .then(res => {
          console.log(res);
          setIsLoading(false);
        })
        .catch(err => {
          err && console.log(err);
          setIsLoading(false);
        });
    } else {
      // If android, use copyToDowload to copy the database to the download folder
      copyToDownloadFolder();
      setIsLoading(false);
    }
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
          onPressFunc={() => confirmImport()}
          iconName={'file-import'}
          buttonText={'Import Tips Database'}
        />
      </View>
      <View
        style={{
          paddingTop: 50,
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} animating={isLoading} />
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
