import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../components/HomeScreen';
import AddExpenseScreen from '../components/AddExpenseScreen';
import SettingsScreen from '../components/SettingScreen';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0D1030', borderTopColor: '#1B2144' },
        tabBarActiveTintColor: '#2F5AF4',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          let icon = 'home';
          if (route.name === 'Home') icon = 'home';
          else if (route.name === 'Add') icon = 'add-circle';
          else if (route.name === 'Settings') icon = 'settings';
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Add" component={AddExpenseScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
