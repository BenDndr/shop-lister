import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList, faXmark, faPen, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { PageContainer } from '@/components/PageContainer';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addItem, resetItems, removeSpecificItem, editItem } from '@/store/slices/itemsSlice'
import { addList, editList, removeList, reset } from '@/store/slices/listsSlice'
import { CustomButton } from '@/components/CustomButton';
import { CustomInput } from '@/components/CustomInput';
import { Item } from '@/components/Item';
import { ThemedText } from '@/components/ThemedText';
import { ModalLayout } from '@/components/ModalLayout'
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'

export default function ListIndex() {

    const items = useAppSelector((state) => state.items)
    const lists = useAppSelector((state) => state.lists)
    const dispatch = useAppDispatch()
    const [itemToAdd, setItemToAdd] = useState("");
    const [editIndex, setEditIndex] = useState(-1)
    const screenWidth = Dimensions.get("window").width
    const containerWidth = screenWidth - 24
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);
    const [addListModal, setAddListModal] = useState(false);
    const [activeList, setActiveList] = useState(lists.lists[0] || {name: ""})
    const [newList, setNewList] = useState("")
    const width = Dimensions.get("window").width

    const store = useAppSelector((state) => state)
    console.log("STORE", store)
    console.log("Lists", lists)

    const incrementItems = () => {
        const itemsInList = items.items.map((item) => item.name)
        if (itemsInList.includes(itemToAdd)) {
            setErrorMessageVisible(true)
        } else {
            dispatch(addItem(itemToAdd))
            setItemToAdd("")
        }
    }
    
    const removeItem = (itemName: string) => {
        dispatch(removeSpecificItem(itemName))
        setItemToAdd("")
    }
    
    const clearList = () => {
        dispatch(resetItems())
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

    const opacity = useSharedValue<number>(0);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    const createNewList = () => {
        if (newList == "") {
            setErrorMessageVisible(true)
        } else {
            dispatch(addList(newList))
            setActiveList({ name: newList })
            setAddListModal(false)
        }
    }

    useEffect(() => {
        if (errorMessageVisible) {
            opacity.value = withTiming(1, { duration: 500 });
            setTimeout(() => {
                setErrorMessageVisible(false)         
            }, 2000)
        } else {
            opacity.value = withTiming(0, { duration: 2000 });
        }
    }, [errorMessageVisible])


    const renderCarouselView = (item: object, index: number) => {
        return (
            <View key={index} style={{flex: 1}}>
                <View
                    style={styles.header}
                >
                    <ThemedText style={{alignItems: 'center'}} type={"title"} light>{activeList.name || "MY LIST"}</ThemedText>
                    <TouchableOpacity style={styles.addListButton} activeOpacity={0.7} onPress={() => console.log("call modal")}>
                        <FontAwesomeIcon icon={faCirclePlus} color={"white"} size={32}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.content, {width: containerWidth}]}>
                    <CustomInput placeholder='Item to add' value={itemToAdd} onChangeText={(e) => setItemToAdd(e)} validate={incrementItems}/>
                    <Animated.View style={[styles.errorMessage, animatedStyle]}>
                        <ThemedText>This item is already in the list.</ThemedText>
                        <TouchableOpacity style={{padding: 10}} onPress={() => setErrorMessageVisible(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </TouchableOpacity>
                    </Animated.View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={items.items} 
                        renderItem={renderItems}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <CustomButton color={{color1: Colors.blue300, color2: Colors.blue100}} text={"Clear the list"} onPress={() => setModalVisible(true)} style={{marginTop: 10}} lightText hapticFeel/>
                    <CustomButton color={{color1: Colors.yellow300, color2: Colors.yellow100}} text={"Add sample list"} onPress={() => dispatch(addList("Sample List"))} style={{marginTop: 10}}  hapticFeel/>
                    <CustomButton color={{color1: Colors.pink300, color2: Colors.pink100}} text={"reset list"} onPress={() => dispatch(reset())} style={{marginTop: 10, marginBottom: 80}} lightText hapticFeel/>
                    
                </View>
            </View>
        )
    }


    const renderItems = ({ item, index }: { item: { name: string }; index: number }) => {
        return (
            <Item 
                key={index} 
                name={item.name} 
                index={index}
                remove={() => removeItem(item.name)}
                value= {item.name}
                onChangeText={(e) => editItemName(item.name, e)}
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
                {modalVisible && <ModalLayout closeModal={() => setModalVisible(false)}>
                    <View>
                        <ThemedText style={{marginBottom: 20}} type={"defaultSemiBold"} center>Are you sure you want to clear the list ?</ThemedText>
                        <CustomButton style={{width: 300, marginBottom: 10}} hapticFeel color={{color1: Colors.orange300, color2: Colors.orange100}} text={"Yes"} onPress={() => clearList()}/>
                        <CustomButton style={{width: 300}} lightText hapticFeel color={{color1: Colors.blue300, color2: Colors.blue100}} text={"No"} onPress={() => setModalVisible(false)}/>
                    </View>
                </ModalLayout>}
            {/* </Modal> */}
            {addListModal && <ModalLayout closeModal={() => setAddListModal(false)}>
                <View>
                    <ThemedText style={{marginBottom: 20}} type={"defaultSemiBold"} center>Enter list name</ThemedText>
                    <CustomInput placeholder='List name' value={newList} onChangeText={(e) => setNewList(e)}/>
                    <CustomButton style={{width: 300, marginBottom: 10}} hapticFeel color={{color1: Colors.teal300, color2: Colors.teal100}} text={"Yes"} onPress={() => createNewList()}/>
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
                </View>
            }
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    header: {
        height: "20%",
        justifyContent: 'space-between',
        width: "100%",
        paddingLeft: 12,
        paddingRight: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    content: {
        padding: 10,
        flex: 1,
        backgroundColor: Colors.backGround,
        marginLeft: 12,
        marginRight: 12,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    errorMessage: {
        position: 'absolute',
        top: -50,
        left: 10,
        width: "100%",
        backgroundColor: Colors.orange300,
        padding: 10,
        borderRadius: 12,
        zIndex: 2,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addListButton: {
        padding: 10,
    }
})
