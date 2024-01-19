import React from 'react';
import {View, Text} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatsScreen from '../screens/StatsScreen';
import ExportScreen from '../screens/ExportScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const tabs = [
  {
    title: 'Home',
    name: 'Home',
    screen: HomeScreen,
    icon: 'home',
  },
  {
    title: 'Stats',
    name: 'Stats',
    screen: StatsScreen,
    icon: 'chart-bar',
  },
  {
    title: 'Export',
    name: 'Export',
    screen: ExportScreen,
    icon: 'file-export-outline',
  },
  {
    title: 'Settings',
    name: 'Settings',
    screen: SettingsScreen,
    icon: 'cog',
  },
];

const renderTabIcon = ({icon, focused, color, title}: any) => (
  <View style={{alignItems: 'center', justifyContent: 'center'}}>
    <MaterialCommunityIcons
      name={icon}
      size={25}
      color={focused ? color : 'grey'}
    />
    <Text style={{fontSize: 10, color: focused ? color : 'grey'}}>{title}</Text>
  </View>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      {tabs.map(({title, name, screen, icon}, index) => (
        <Tab.Screen
          key={index}
          name={name}
          component={screen}
          options={{
            tabBarIcon: ({focused, color}: any) =>
              renderTabIcon({icon, focused, color, title}),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default function BottomTabs() {
  return <BottomTabNavigator />;
}
