import { Image, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { addItem, resetItems, removeSpecificItem } from '@/store/slices/itemsSlice'
import { Colors } from '@/constants/Colors';
import { CustomButton } from '@/components/CustomButton';
import {Item} from '@/components/Item'

export default function HomeScreen() {

  const items = useAppSelector((state) => state.items)
  const dispatch = useAppDispatch()
  const [itemToAdd, setItemToAdd] = useState("")
  

  useEffect(() => {
    console.log("store.items", items)
  }, [])

  const incrementItems = () => {
    // dispatch(addItem(itemToAdd))
    console.log(items)
    setItemToAdd("")
  }

  const removeItem = (itemName: string) => {
    dispatch(removeSpecificItem(itemName))
    console.log(items)
    setItemToAdd("")
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
        <ThemedText type="title">Shop Listerd</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Add Item</ThemedText>
        <TextInput 
          style={styles.input}
          placeholder='Item name'
          onChangeText={(e) => setItemToAdd(e)}
          value={itemToAdd}
        ></TextInput>
        <CustomButton lightText text="Add item" color={{color1: Colors.pink300, color2: Colors.pink100}} onPress={incrementItems}/>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: View Items</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Clean list</ThemedText>
          <CustomButton lightText text="Reset items" color={{color1: Colors.blue300, color2: Colors.blue100}} onPress={clearList} />
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
  input: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.grey300,
    padding: 10
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    justifyContent: 'center'
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
