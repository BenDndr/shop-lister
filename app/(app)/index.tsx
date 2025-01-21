import { Image, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { addItem, resetItems, removeSpecificItem } from '@/store/slices/itemsSlice'
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {

  const items = useAppSelector((state) => state.items)
  const dispatch = useAppDispatch()
  const [itemToAdd, setItemToAdd] = useState("")
  

  useEffect(() => {
    console.log("store.items", items)
  }, [])

  const incrementItems = () => {
    dispatch(addItem(itemToAdd))
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
        <ThemedText type="title">Shop List</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Add Item</ThemedText>
        <TextInput 
          style={styles.input}
          placeholder='Item name'
          onChangeText={(e) => setItemToAdd(e)}
          value={itemToAdd}
        ></TextInput>
        <TouchableOpacity onPress={incrementItems} style={{backgroundColor: Colors.pink100, borderRadius: 8, width: "100%", height: 60, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Add item</Text>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: View Items</ThemedText>
        {
          items.items?.length > 0 && items.items.map((item: any, index: number) => {
            return (
              <View key={index} style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: Colors.pink700, padding: 5, borderRadius: 10}}>
                <Text>
                  {item.name}
                </Text>
                <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: Colors.pink700}} onPress={() => removeItem(item.name)}>
                  <Text style={{color: 'white'}}>X</Text>  
                </TouchableOpacity>      
              </View>
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
  input: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.grey300,
    padding: 10
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
