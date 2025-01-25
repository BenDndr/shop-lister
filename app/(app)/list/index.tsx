import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
           <PageContainer color1={Colors.pink300} color2={Colors.pink100} gradient>
                <View style={styles.paralaxHeader}>

                </View>
                <View style={styles.content}>
                    <Text>Index</Text>
                    <FontAwesomeIcon icon={faList} />
                    <CustomInput placeholder='Item to add' value={itemToAdd} onChangeText={(e) => setItemToAdd(e)} validate={incrementItems}/>
                    {
                        items.items.map((item, index) => {
                            return (
                                <Item key={index} name={item.name} remove={() => removeItem(item.name)}/>
                            )
                        })
                    }
                    <CustomButton color={{color1: Colors.blue300, color2: Colors.pink100}} text={"Clear the list"} onPress={clearList} style={{marginTop: 10}}/>
                </View>
           </PageContainer>
            
        </View>
    )
}

const styles = StyleSheet.create({
    paralaxHeader: {

    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    }
})
