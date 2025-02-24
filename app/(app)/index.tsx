import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear, faCaretRight, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { PageContainer } from '@/components/PageContainer';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addItem, resetItems, removeSpecificItem, restoreLastDiscardedItem, removeByList, editItem } from '@/store/slices/itemsSlice'
import { addList, editList, removeList, resetList } from '@/store/slices/listsSlice'
import { CustomButton } from '@/components/CustomButton'
import { CustomInput } from '@/components/CustomInput'
import { Item } from '@/components/Item'
import { ThemedText } from '@/components/ThemedText'
import { ModalLayout } from '@/components/ModalLayout'
import { ErrorMessage } from '@/components/ErrorMessage'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'

export default function ListIndex() {

    const items = useAppSelector((state) => state.items)
    const lists = useAppSelector((state) => state.lists)
    const dispatch = useAppDispatch()
    const [itemToAdd, setItemToAdd] = useState("")
    const [editIndex, setEditIndex] = useState(-1)
    const [editListName, setEditListName] = useState(false)
    const screenWidth = Dimensions.get("window").width
    const containerWidth = screenWidth - 24
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);
    const [addListModal, setAddListModal] = useState(false);
    const [newList, setNewList] = useState("")
    const [ShowButtonsPannel, setShowButtonsPannel] = useState(false);
    const translateX = useSharedValue<number>(420);
    const [resetAllModal, setResetAllModal] = useState(false)

    const slide = () => {
        if (ShowButtonsPannel) {
            slideOut()
        } else {
            translateX.value = withTiming(18, {duration: 500})
            setShowButtonsPannel(true)
        }
    }

    const slideOut = () => {
        translateX.value = withTiming(420, {duration: 500})
        setShowButtonsPannel(false)
    }

    console.log("Items", items.items)
    console.log("DiscardedItems", items.discardedItems)
    console.log("Lists", lists)


    const createItem = (listName: string) => {
        const itemsInList = items.items.map((item) => item.name)
        if (itemsInList.includes(itemToAdd)) {
            setErrorMessageVisible(true)
        } else {
            dispatch(addItem({name: itemToAdd, list: listName}))
            setItemToAdd("")
        }
    }
    
    const removeItem = (itemName: string) => {
        dispatch(removeSpecificItem(itemName))
        setItemToAdd("")
    }
    
    const clearList = (listName: string) => {
        dispatch(removeByList(listName))
        setModalVisible(false)
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

    const cleanListsAndItems = () => {
        dispatch(resetList())
        dispatch(resetItems())
        setShowButtonsPannel(false)
        setModalVisible(false)
    }

    

    const createNewList = () => {
        if (newList == "") {
            setErrorMessageVisible(true)
        } else {
            dispatch(addList(newList))
            setAddListModal(false)
            setNewList("")
        }
    }

    const handleModal = (resetAll: boolean = false) => {
        resetAll ? setResetAllModal(true) : setResetAllModal(false)
        setModalVisible(true)
    }

    const renderCarouselView = (list: { name: string }, index: number) => {
        return (
            <View key={index} style={{flex: 1}}>
                {modalVisible && <ModalLayout heightProps={200} closeModal={() => setModalVisible(false)}>
                    <View>
                        <ThemedText style={{marginBottom: 20}} type={"defaultSemiBold"} center>{resetAllModal ? "Are you sure you want to clear all data ?" : "Are you sure you want to clear the list ?"}</ThemedText>
                        <CustomButton style={{width: 300, marginBottom: 10}} hapticFeel color={{color1: Colors.orange300, color2: Colors.orange100}} text={"Yes"} onPress={resetAllModal ? () => cleanListsAndItems() : () => clearList(list.name)}/>
                        <CustomButton style={{width: 300}} lightText hapticFeel color={{color1: Colors.blue300, color2: Colors.blue100}} text={"No"} onPress={() => setModalVisible(false)}/>
                    </View>
                </ModalLayout>}
                <View
                    style={styles.header}
                >
                    {/* {editListName ? 
                    <CustomInput 
                        placeholder={list.name}
                        validate={() => console.log("Validate Edit")}
                        onChangeText={(e) => console.log(list.name, e)}
                        value={list.name}
                        style={{height: 52, width: '80%', fontSize: 24, }}
                    />
                    : */}
                    <ThemedText style={{alignItems: 'center'}} type={"title"} light>{list.name || "MY LIST"}</ThemedText>
                    {/* <TouchableOpacity style={styles.addListButton} onPress={() => setEditListName(!editListName)}>
                        <FontAwesomeIcon icon={faPen} color={Colors.blue300} size={32}/>
                    </TouchableOpacity> */}
                </View>
                <View style={[styles.content, {width: containerWidth}]}>
                    <View style={styles.contentHeader}>
                        <CustomInput placeholder='Item to add' value={itemToAdd} onChangeText={(e) => setItemToAdd(e)} validate={() => createItem(list.name)} style={{height: 40, width: '79%'}}/>
                        <TouchableOpacity style={[styles.buttonPanelOpener, {backgroundColor: ShowButtonsPannel ? Colors.blue100 : Colors.blue300}]} onPress={slide}>
                            <FontAwesomeIcon icon={faGear} color={ShowButtonsPannel ? Colors.blue300 : "white"} size={24}/>
                        </TouchableOpacity>
                    </View>
                    <ErrorMessage 
                        content="This item is already in the list."
                        visible={errorMessageVisible}
                        height={-50}
                        left={10}
                        hideAction={() => setErrorMessageVisible(false)}
                    />
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={items.items.filter((item) => item.list == list.name)} 
                        renderItem={renderItems}
                        keyExtractor={(item) => item.name}
                    />
                </View>
            </View>
        )
    }


    const renderItems = ({ item, index }: { item: { name: string, list: string }, index: number }) => {
        return (
            <Item 
                key={index} 
                name={item.name} 
                index={index}
                remove={() => removeItem(item.name)}
                value= {item.name}
                validate={(e) => editItemName(item.name, e)}
                activateEditMode={() => setEditMode(index)}
                editMode={index == editIndex}
                blurAction={blurAction}
            />

        )
    }

    return (
        <PageContainer gradient color1={Colors.blue300} color2={Colors.blue100}>
            {/* <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            > */}
                
            {/* </Modal> */}
            {addListModal && <ModalLayout heightProps={300} closeModal={() => setAddListModal(false)}>
                <View>
                    <ThemedText style={{marginBottom: 20}} type={"defaultSemiBold"} center>Enter list name</ThemedText>
                    <CustomInput placeholder='List name' value={newList} onChangeText={(e) => setNewList(e)}/>
                    <CustomButton style={{width: 300, marginBottom: 10}} hapticFeel color={{color1: Colors.yellow300, color2: Colors.yellow100}} text={"Yes"} onPress={() => createNewList()}/>
                    <CustomButton style={{width: 300}} lightText hapticFeel color={{color1: Colors.blue300, color2: Colors.blue100}} text={"No"} onPress={() => setAddListModal(false)}/>
                </View>
            </ModalLayout>}
            {
                lists.lists.length == 0 ?
                <View>
                    <ThemedText light type={"title"} center>ADD LIST</ThemedText>
                    <CustomInput placeholder='List name' value={newList} onChangeText={(e) => setNewList(e)} />
                    <CustomButton style={{width: 300, marginBottom: 10}} hapticFeel color={{color1: Colors.orange300, color2: Colors.orange100}} text={"Create new list"} onPress={() => createNewList()} />
                </View>
                :
                <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={lists.lists}
                        horizontal
                        pagingEnabled
                        renderItem={({item, index}) => (
                            renderCarouselView(item, index)
                        )}
                        keyboardShouldPersistTaps="handled"
                    />
                    
                    <Animated.View style={{flexDirection: 'row', translateX}}>
                        
                        <View style={styles.buttonPanel}>
                            <TouchableOpacity style={styles.buttonPanelLeft} onPress={slideOut}>
                                <FontAwesomeIcon icon={faCaretRight} color="white"/>
                            </TouchableOpacity>
                            <View style={styles.buttonPanelRight}>
                                <View style={styles.buttonPanelRow}>
                                    <CustomButton color={{color1: Colors.blue300, color2: Colors.blue100}} text={"Clear the list"} onPress={() => handleModal()} style={{width: '40%'}} lightText hapticFeel/>
                                    <CustomButton color={{color1: Colors.orange300, color2: Colors.orange100}} onPress={() => dispatch(restoreLastDiscardedItem())} style={{width: '40%'}} hapticFeel>
                                        <FontAwesomeIcon icon={faRotateLeft} color="white"/>
                                    </ CustomButton>
                                </View>
                                <View style={styles.buttonPanelRow}>
                                    <CustomButton color={{color1: Colors.yellow300, color2: Colors.yellow100}} text={"Create List"} onPress={() => setAddListModal(true)} style={{width: '40%'}}  hapticFeel/>
                                    <CustomButton color={{color1: Colors.pink300, color2: Colors.pink100}} text={"Reset all"} onPress={() => handleModal(true)} style={{width: '40%'}} lightText hapticFeel/>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                </View>
            }
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    header: {
        height: "20%",
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    content: {
        padding: 10,
        paddingBottom: 75,
        flex: 1,
        backgroundColor: Colors.backGround,
        marginLeft: 12,
        marginRight: 12,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    // errorMessage: {
    //     position: 'absolute',
    //     top: -50,
    //     left: 10,
    //     width: "100%",
    //     backgroundColor: Colors.orange300,
    //     padding: 10,
    //     borderRadius: 12,
    //     zIndex: 2,
    //     elevation: 2,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center'
    // },
    addListButton: {
        padding: 10,
        backgroundColor: Colors.backGround,
        marginBottom: 10,
        borderRadius: 16,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    },
    buttonPanel: {
        flexDirection: 'row', 
        marginBottom: 70,        
        backgroundColor: Colors.blue100,
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        width: 375,
        borderRadius: 16,
        elevation: 2,
        height: 150,
    },
    buttonPanelLeft: {
        backgroundColor: Colors.blue300,
        height: '100%',
        width: '10%',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPanelRight: {
        backgroundColor: Colors.blue100,
        width: "90%",
        gap: 16,
    },
    buttonPanelRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        width: "100%"
    },
    buttonPanelOpener: {
        left: 0,
        padding: 10,
        borderRadius: 16,
        zIndex: 2,
        width: "19%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
