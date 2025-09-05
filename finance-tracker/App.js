import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './context/AppProvider';
import Tabs from './navigation/Tabs';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </AppProvider>
  );
}
