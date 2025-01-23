import { Tabs } from 'expo-router';
import React from 'react';
import TabBar from '@/components/navigation/TabBar';


export default function AppLayout() {

  return (
    <Tabs
      initialRouteName="list"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: false,
      }}
      tabBar={(props) => <TabBar {...props}/>}
      >
      <Tabs.Screen
        name="list"
        options={{
          title: 'List',
        }}
      />
      <Tabs.Screen
        name="parameters"
        options={{
          title: 'Parameters',
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
    </Tabs>
  );
}
