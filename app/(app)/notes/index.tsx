import { View, StyleSheet, TouchableOpacity, Pressable, ScrollView, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faEraser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { CustomButton } from '@/components/CustomButton';
import { PageContainer } from '@/components/PageContainer';
import { ModalLayout } from '@/components/ModalLayout';
import {ThemedText} from '@/components/ThemedText';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addNote, updateNote, deleteNote, resetNotes } from '@/store/slices/notesSlice'

export default function NoteIndex() {

    const notes = useAppSelector(state => state.notes).notes
    console.log("notes", notes)
    const dispatch = useAppDispatch()
    const [activeNoteId, setActiveNoteId] = useState("")
    const [deleteAllModalVisible, setDeleteAllModalVisible] = useState(false)

    const createNewNote = () => {
        dispatch(addNote())
    }

    interface Note {
        id: string;
        title: string;
        content: string;
    }

    const renderNote = ({item}: {item: Note}) =>{

        const isSelected = activeNoteId == item.id

        return (

            <Pressable key={item.id} style={[styles.noteCard, isSelected ? styles.fullScreenNoteCard : null ]} onPress={() => setActiveNoteId(item.id)}>
                <View style={styles.noteHeader}>
                    <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                    {isSelected && 
                    <TouchableOpacity onPress={() => setActiveNoteId("")} style={styles.closeNoteButton}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </TouchableOpacity>    
                    }
                </View>
                <ThemedText>{item.content}</ThemedText>
            </Pressable>
        )
    }

    return (
        <PageContainer color1={Colors.teal300} color2={Colors.pink100} gradient>
            {
                deleteAllModalVisible &&
                <ModalLayout
                    closeModal={() => setDeleteAllModalVisible(false)}
                    heightProps={260}
                >
                    <ThemedText type="defaultSemiBold" style={{marginBottom: 20}}>Are you sure you want to delete all notes?</ThemedText>
                    <CustomButton 
                        style={{width: 300, marginBottom: 10}} text="Yes" lightText hapticFeel color={{color1: Colors.pink500, color2: Colors.pink300}}
                        onPress={() => {
                            dispatch(resetNotes())
                            setDeleteAllModalVisible(false)
                        }}
                    />
                    <CustomButton 
                        style={{width: 300, marginBottom: 10}} text="No" hapticFeel color={{color1: Colors.teal300, color2: Colors.teal100}}
                        onPress={() => setDeleteAllModalVisible(false)}
                    />
                </ModalLayout>
            }
            <View style={styles.header}>
                <ThemedText type="title">Notes</ThemedText>
                <View style={{borderRadius: 30, overflow: 'hidden', marginBottom: 10,}}>
                    <Pressable
                        android_ripple={{ color: Colors.pink500, borderless: false }}
                        style={styles.cleanAllButton}
                        onPress={() => setDeleteAllModalVisible(true)}
                    >
                        <FontAwesomeIcon icon={faEraser} size={36}/>
                    </Pressable>
                </View>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={notes}
                    renderItem={renderNote}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }} 
                />
                <View style={{borderRadius: 10, overflow: 'hidden', width: "100%"}}>
                    <Pressable 
                        style={styles.plusButton} 
                        android_ripple={{ color: Colors.teal500, borderless: false }}
                        onPress={createNewNote}
                    >
                        <FontAwesomeIcon icon={faPlus} size={36}/>
                    </Pressable>
                </View>
            </View>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    header: {
        height: "20%",
        width: "100%",
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    content: {
        width: "95%",
        flex: 1,
        paddingBottom: 80,
    },
    plusButton: {
        marginTop: 10,
        backgroundColor: Colors.teal100,
        width: "100%",
        height: 50,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    cleanAllButton: {
        backgroundColor: Colors.backGround,
        height: 60,
        width: 60,
        borderRadius: 30,
        padding: 10,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noteCard: {
        backgroundColor: "white",
        width: "49%",
        height: 150,
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 10,
    },
    fullScreenNoteCard: {
        width: "100%",
        height: "100%",
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
    },
    noteHeader: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeNoteButton: {
        padding: 10,
    }
})