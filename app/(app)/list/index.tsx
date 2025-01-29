import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { PageContainer } from '@/components/PageContainer';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addItem, resetItems, removeSpecificItem, editItem } from '@/store/slices/itemsSlice'
import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';
import { Item } from '@/components/Item';
import { ThemedText } from '@/components/ThemedText';

export default function ListIndex() {

    const items = useAppSelector((state) => state.items)
    const dispatch = useAppDispatch()
    const [itemToAdd, setItemToAdd] = useState("");
    const [editIndex, setEditIndex] = useState(-1)

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
      }

      const editItemName = (ref: string, newName: string) => {
        dispatch(editItem({ itemToEdit: ref, editedItem: newName }))
      }

      const setEditMode = (index: number) => {
        editIndex == index ? setEditIndex(-1) : setEditIndex(index)
      }

      const blurAction = () => {
        setEditIndex(-1)
      }

    return (
        <PageContainer gradient color1={Colors.blue100} color2={Colors.blue300}>
            <View
                style={styles.paralaxHeader}
            >
                <ThemedText style={{}} type={"title"} light>MY LIST</ThemedText>
            </View>
            <View style={styles.content}>
                {/* <FontAwesomeIcon icon={faList} /> */}
                <CustomInput placeholder='Item to add' value={itemToAdd} onChangeText={(e) => setItemToAdd(e)} validate={incrementItems}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        items.items.map((item, index) => {
                            return (
                                <Item 
                                    key={index} 
                                    name={item.name} 
                                    index={index}
                                    remove={() => removeItem(item.name)}
                                    validate={() => console.log("Hello")}
                                    value= {item.name}
                                    onChangeText={(e) => editItemName(item.name, e)}
                                    activateEditMode={() => setEditMode(index)}
                                    editMode={index == editIndex}
                                    blurAction={blurAction}
                                />
                            )
                        })
                    }
                    <CustomButton color={{color1: Colors.blue300, color2: Colors.pink100}} text={"Clear the list"} onPress={clearList} style={{marginTop: 10, marginBottom: 80}} lightText/>
                </ScrollView>
            </View>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    paralaxHeader: {
        height: "20%",
        justifyContent: 'flex-end',
        width: "100%",
        paddingLeft: 12
    },
    content: {
        padding: 10,
        flex: 1,
        backgroundColor: Colors.backGround,
        marginLeft: 12,
        marginRight: 12,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    }
})
