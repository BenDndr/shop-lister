import { Tabs } from 'expo-router';
import React from 'react';
import TabBar from '@/components/navigation/TabBar';


export default function AppLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: false,
      }}
      tabBar={(props) => <TabBar {...props}/>}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Index',
        }}
      />
      <Tabs.Screen
        name="extra"
        options={{
          title: 'Extra',
        }}
      />
      <Tabs.Screen
        name="parameters"
        options={{
          title: 'Parameters',
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
