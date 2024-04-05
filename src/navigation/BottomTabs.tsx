import React from 'react';
import {View, Text} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatsScreen from '../screens/StatsScreen';
import ExportScreen from '../screens/ExportScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../global/Colors';

const Tab = createBottomTabNavigator();

const tabs = [
  {
    title: 'Home',
    name: 'MyTips',
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
    title: 'Database',
    name: 'Export',
    screen: ExportScreen,
    icon: 'database-outline',
  },
  {
    title: 'Settings',
    name: 'Settings',
    screen: SettingsScreen,
    icon: 'cog',
  },
];

const renderTabIcon = ({icon, focused, title}: any) => (
  <View style={{alignItems: 'center', justifyContent: 'center'}}>
    <MaterialCommunityIcons
      name={icon}
      size={25}
      color={focused ? Colors.primary : Colors.grey}
    />
    <Text style={{fontSize: 10, color: focused ? Colors.primary : Colors.grey}}>
      {title}
    </Text>
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
            headerShadowVisible: false,
            headerTintColor: Colors.white,
            headerStyle: {
              backgroundColor: Colors.primary,
            },
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
