import { View, StyleSheet, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faEraser } from '@fortawesome/free-solid-svg-icons'
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

    const createNewNote = () => {
        dispatch(addNote())
    }

    interface Note {
        id: string;
        title: string;
        content: string;
    }

    const renderNote = (note: Note) =>{
        return (
            <Pressable key={note.id} style={styles.noteCard}>
                <ThemedText type="defaultSemiBold">{note.title}</ThemedText>
                <ThemedText>{note.content}</ThemedText>
            </Pressable>
        )
    }

    return (
        <PageContainer color1={Colors.teal300} color2={Colors.pink100} gradient>
            <View style={styles.header}>
                <ThemedText type="title">Notes</ThemedText>
                <View style={{borderRadius: 30, overflow: 'hidden', marginBottom: 10,}}>
                    <Pressable
                        android_ripple={{ color: Colors.pink500, borderless: false }}
                        style={styles.cleanAllButton}
                    >
                        <FontAwesomeIcon icon={faEraser} size={36}/>
                    </Pressable>
                </View>
            </View>
            <View style={styles.content}>
                {
                    notes.map(note => renderNote(note))
                }
                <Pressable 
                    style={styles.plusButton} 
                    android_ripple={{ color: Colors.teal500, borderless: false }}
                    onPress={createNewNote}
                >
                    <FontAwesomeIcon icon={faPlus} size={36}/>
                </Pressable>
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
        padding: 10,
        paddingBottom: 75,
        flex: 1,
        backgroundColor: Colors.backGround,
        marginLeft: 12,
        marginRight: 12,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'space-around',
        gap: "10%"
    },
    plusButton: {
        backgroundColor: Colors.teal100,
        width: "45%",
        height: 150,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
        width: "45%",
        height: 150,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
})