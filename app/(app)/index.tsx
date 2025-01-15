import { Image, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { addItem, resetItems } from '@/store/slices/itemsSlice'
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {

  const items = useAppSelector((state) => state.items)
  const dispatch = useAppDispatch()
  

  useEffect(() => {
    console.log("store.items", items)
  }, [])

  const incrementItems = () => {
    dispatch(addItem())
    console.log(items)
  }

  const clearList = () => {
    dispatch(resetItems())
    console.log("store", items)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.orange100, dark: Colors.blue700 }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Shop List</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Add Item</ThemedText>
        <TouchableOpacity onPress={incrementItems} style={{backgroundColor: Colors.pink100, borderRadius: 8, width: "100%", height: 60, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Add item</Text>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: View Items</ThemedText>
        {
          items?.length > 0 && items.map((item: any, index: number) => {
            return (
              <ThemedText key={index}>
                {item.name}
              </ThemedText>          
            )
          })
        }
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Clean list</ThemedText>
          <TouchableOpacity onPress={clearList} style={{backgroundColor: Colors.blue100, borderRadius: 8, width: "100%", height: 60, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Reset item</Text>
          </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
