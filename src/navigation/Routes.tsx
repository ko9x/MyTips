import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './BottomTabs';

export default function Routes() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <BottomTabs />
    </NavigationContainer>
  );
}
