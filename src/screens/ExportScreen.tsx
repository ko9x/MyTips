import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Platform,
  Share,
  ActivityIndicator,
} from 'react-native';
import InformationAlert from '../components/InformationAlert';
import AddTipButton from '../components/AddTipButton';
import Colors from '../global/Colors';
import {connectToDatabase} from '../providers/TipProvider';
import RNFS, {DownloadDirectoryPath} from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import {OptionsContext} from '../providers/OptionsProvider';
import Toast from 'react-native-toast-message';
import RNRestart from 'react-native-restart';

export default function ExportScreen(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [androidFiles, setAndroidFiles] = useState<any>([]);
  const {setDatabaseImported} = useContext(OptionsContext);

  const getFileContent = async (path: any, setterFunc: Function) => {
    const reader = await RNFS.readDir(path);
    setterFunc(reader);
  };

  function showToast(type: string, text1: string) {
    Toast.show({
      type: type,
      text1: text1,
    });
  }

  function confirmImport() {
    Alert.alert(
      'Warning!',
      'Importing a new database will erase the existing database. We recommend you export the existing database first as a backup',
      [
        {
          text: 'Export Database',
          onPress: () => (Platform.OS === 'ios' ? confirmShareDB() : shareDB()),
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
      showToast('success', 'Tip database exported to downloads folder!');
    } catch (error) {
      showToast('error', 'Tip database was not exported');
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
        showToast('success', 'Tip database imported successfully!');
      } else {
        setDatabaseImported(true);
        setIsLoading(false);
        wrongFileNameAlert();
      }
    } catch (err) {
      setDatabaseImported(true);
      setIsLoading(false);
      console.warn(err);
      showToast('error', 'Tip database was not imported');
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

  function confirmShareDB() {
    Alert.alert(
      'Attention!',
      'Update the database file before exporting to ensure any recent changes are not lost',
      [
        {
          text: 'Update',
          onPress: () => updateDB(),
        },
        {
          text: 'Export',
          onPress: () => shareDB(),
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ],
    );
  }

  function shareDB() {
    setIsLoading(true);
    // If ios, use the document share feature
    if (Platform.OS === 'ios') {
      Share.share({
        url: files[2].path,
      })
        .then(res => {
          console.log(res);
          if (res.action === 'sharedAction') {
            showToast('success', 'Tip database exported successfully!');
          } else {
            showToast('error', 'Tip database was not exported');
          }
          setIsLoading(false);
        })
        .catch(err => {
          err && console.log(err);
          setIsLoading(false);
          showToast('error', 'Tip database was not exported');
        });
    } else {
      // If android, use copyToDowload to copy the database to the download folder
      copyToDownloadFolder();
      setIsLoading(false);
    }
  }

  function updateDB() {
    Alert.alert(
      'Update Database',
      'The app will restart after the database is updated',
      [
        {
          text: 'Okay',
          onPress: () => RNRestart.restart(),
        },
      ],
    );
  }
  return (
    <View>
      {Platform.OS === 'ios' ? (
        <>
          <InformationAlert
            title={'Update Database'}
            message={
              'Update the database file before exporting to ensure the database is up to date with your latest changes'
            }
          />
          <View style={styles.buttonContainer}>
            <AddTipButton
              onPressFunc={() => updateDB()}
              iconName={'update'}
              buttonText={'Update Tips Database'}
            />
          </View>
        </>
      ) : null}
      <InformationAlert
        title={'Export Tips'}
        message={
          'Export your tip database file for a backup or to transfer to a new device'
        }
      />
      <View style={styles.buttonContainer}>
        <AddTipButton
          onPressFunc={() =>
            Platform.OS === 'ios' ? confirmShareDB() : shareDB()
          }
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
