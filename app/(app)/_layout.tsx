import { Tabs } from 'expo-router';
import React from 'react';
import Tabbar from '@/components/navigation/Tabbar';


export default function AppLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: false,
      }}
      tabBar={(props) => <Tabbar {...props}/>}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Index',
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
        }}
      />
      <Tabs.Screen
        name="extra"
        options={{
          title: 'Extra',
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
        }}
      />
    </Tabs>
  );
}
