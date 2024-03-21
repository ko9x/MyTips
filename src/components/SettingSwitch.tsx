import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Switch} from 'react-native-paper';
import Colors from '../global/Colors';
import {iconSmall} from '../global/Variables';
import {iconComponentArrayToSize} from '../helpers/helpers';

export default function SettingSwitch({
  iconName,
  titleText,
}: any): React.JSX.Element {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  function onToggleSwitch() {
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
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
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
