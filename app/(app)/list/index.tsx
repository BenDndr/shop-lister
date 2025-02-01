import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions, Modal } from 'react-native';
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
import { ModalLayout } from '@/components/ModalLayout'

export default function ListIndex() {

    const items = useAppSelector((state) => state.items)
    const dispatch = useAppDispatch()
    const [itemToAdd, setItemToAdd] = useState("");
    const [editIndex, setEditIndex] = useState(-1)
    const screenWidth = Dimensions.get("window").width
    const containerWidth = screenWidth - 24
    const [modalVisible, setModalVisible] = useState(false);

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
        <PageContainer gradient color1={Colors.blue300} color2={Colors.blue100}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ModalLayout closeModal={() => setModalVisible(false)}>
                    <View>
                        <ThemedText style={{marginBottom: 20}} type={"subtitle"} center>Hello</ThemedText>
                        <CustomButton style={{width: 300}} lightText hapticFeel color={{color1: Colors.pink300, color2: Colors.pink100}} text={"Take me home !"} onPress={() => setModalVisible(false)}/>
                    </View>
                </ModalLayout>
            </Modal>
            <View
                style={styles.paralaxHeader}
            >
                <ThemedText style={{}} type={"title"} light>MY LIST</ThemedText>
            </View>
            <View style={[styles.content, {width: containerWidth}]}>
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
                    <CustomButton color={{color1: Colors.blue300, color2: Colors.blue100}} text={"Clear the list"} onPress={() => setModalVisible(true)} style={{marginTop: 10, marginBottom: 80}} lightText/>
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
