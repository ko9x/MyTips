import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Switch} from 'react-native-paper';
import Colors from '../global/Colors';
import {iconSmall} from '../global/Variables';
import {iconComponentArrayToSize} from '../helpers/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingSwitch({
  iconName,
  titleText,
  currentState,
}: any): React.JSX.Element {
  const storeData = async (propName: string, propVal: string) => {
    try {
      await AsyncStorage.setItem(propName, propVal);
    } catch (e) {
      // saving error
    }
  };
  const getData = async (propName: string) => {
    try {
      const propVal = await AsyncStorage.getItem(propName);
      if (propVal !== null) {
        return propVal;
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    if (currentState === 'On') {
      setIsSwitchOn(true);
    }
    if (currentState === 'Off') {
      setIsSwitchOn(false);
    }
  }, [currentState]);

  const [isSwitchOn, setIsSwitchOn] = useState<boolean>();

  async function onToggleSwitch() {
    if ((await getData(titleText)) === 'On') {
      await storeData(titleText, 'Off');
    } else {
      await storeData(titleText, 'On');
    }
    setIsSwitchOn(!isSwitchOn);
  }

  const iconComponentArray = iconComponentArrayToSize(
    iconSmall.width,
    iconSmall.height,
  );

  const iconComponent = iconComponentArray.find(obj => obj.name === iconName);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {iconComponent!.icon}
        <Text>{titleText}</Text>
      </View>
      <Switch
        color={Colors.dark}
        value={isSwitchOn}
        onValueChange={onToggleSwitch}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    paddingRight: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
});
