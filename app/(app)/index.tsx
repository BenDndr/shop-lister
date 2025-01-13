import { Image, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { addItem, resetItems } from '../../store/slices/itemsSlice'

export default function HomeScreen() {

  const store = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  

  useEffect(() => {
    console.log("store", store)
    console.log("store.items", store.items)
  }, [])

  const incrementItems = () => {
    dispatch(addItem())
    console.log(store)
  }

  const clearList = () => {
    dispatch(resetItems())
    console.log("store", store)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome To this mess!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Add Item</ThemedText>
        <TouchableOpacity onPress={incrementItems} style={{backgroundColor: '#C8C0FC', borderRadius: 8, width: "100%", height: 60, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Add item</Text>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: View Items</ThemedText>
        {
          store.items.length > 0 && store.items.map((item: any, index: number) => {
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
          <TouchableOpacity onPress={clearList} style={{backgroundColor: '#C8C0FC', borderRadius: 8, width: "100%", height: 60, justifyContent: 'center', alignItems: 'center'}}>
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
