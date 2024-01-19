import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatsScreen from '../screens/StatsScreen';
import ExportScreen from '../screens/ExportScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconButton from '../components/IconButton';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <IconButton
              buttonName="List"
              iconName="home"
              isActive={true}
              onToggleView={() => {}}
            />
          )
        }}
      />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Export" component={ExportScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
