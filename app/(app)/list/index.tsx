import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { PageContainer } from '@/components/PageContainer';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addItem, resetItems, removeSpecificItem } from '@/store/slices/itemsSlice'
import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';
import { Item } from '@/components/Item';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export default function ListIndex() {

    const items = useAppSelector((state) => state.items)
    const dispatch = useAppDispatch()
    const [itemToAdd, setItemToAdd] = useState("");

    const incrementItems = () => {
        dispatch(addItem(itemToAdd))
        console.log(items)
        setItemToAdd("")
      }
    
      const removeItem = (itemName: string) => {
        dispatch(removeSpecificItem(itemName))
        setItemToAdd("")
      }
    
      const clearList = () => {
        dispatch(resetItems())
        console.log("store", items)
      }

    return (
        <View style={{flex: 1, backgroundColor: Colors.pink100}}>
           <PageContainer style={{backgroundColor: Colors.backGround}}>
                <LinearGradient
                    style={styles.paralaxHeader}
                    colors={[Colors.blue100, Colors.blue300]}
                >
                    <ThemedText style={{}} type={"title"} light>MY LIST</ThemedText>
                </LinearGradient>
                <View style={styles.content}>
                    {/* <FontAwesomeIcon icon={faList} /> */}
                    <CustomInput style={{width: "100%"}} placeholder='Item to add' value={itemToAdd} onChangeText={(e) => setItemToAdd(e)} validate={incrementItems}/>
                    <ScrollView>
                        {
                            items.items.map((item, index) => {
                                return (
                                    <Item key={index} name={item.name} remove={() => removeItem(item.name)}/>
                                )
                            })
                        }
                        <CustomButton color={{color1: Colors.blue300, color2: Colors.pink100}} text={"Clear the list"} onPress={clearList} style={{marginTop: 10}} lightText/>
                    </ScrollView>
                </View>
           </PageContainer>
            
        </View>
    )
}

const styles = StyleSheet.create({
    paralaxHeader: {
        height: "20%",
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        width: "100%",
        paddingLeft: 10
    },
    content: {
        padding: 10,
        flex: 1,
        width: "100%",
    }
})
