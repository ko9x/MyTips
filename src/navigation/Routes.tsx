import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './BottomTabs';
import Colors from '../global/Colors';

export default function Routes() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <BottomTabs />
    </NavigationContainer>
  );
}
