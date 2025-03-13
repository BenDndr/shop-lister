import { View, StyleSheet, TouchableOpacity, Pressable, ScrollView, FlatList, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { PageContainer } from '@/components/PageContainer'
import {ThemedText} from '@/components/ThemedText';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { addNote, updateNote, deleteNote, resetNotes } from '@/store/slices/notesSlice'
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';

interface Note {
    id: string;
    title: string;
    content: string;
}

export default function ShowNote() {

    const route = useRoute()
    const {id} =  useLocalSearchParams()
    const note = useAppSelector(state => state.notes).notes.find(note => note.id === id)
    console.log("note", note)
    const dispatch = useAppDispatch()


    return (
        <PageContainer color1={Colors.teal300} color2={Colors.pink100} gradient>
            <Link 
                style={styles.closeNoteButton}
                href={{pathname: "/notes"}}
            >
                <FontAwesomeIcon icon={faXmark}/>
            </Link>
            <ThemedText type="title">{note?.title}</ThemedText>
            <ThemedText>{note?.content}</ThemedText>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    noteCard: {

    },
    closeNoteButton: {
        padding: 10,
    }
})