import { View, StyleSheet, TouchableOpacity, Pressable, ScrollView, FlatList, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { PageContainer } from '@/components/PageContainer'
import {ThemedText} from '@/components/ThemedText';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { updateNote, deleteNote } from '@/store/slices/notesSlice'
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { CustomInput } from '@/components/CustomInput';

interface Note {
    id: string;
    title: string;
    content: string;
}

export default function ShowNote() {

    const router = useRouter();
    const {id} =  useLocalSearchParams()
    const note = useAppSelector(state => state.notes).notes.find(note => note.id === id)
    console.log("note", note)
    const dispatch = useAppDispatch()
    const [editTitleMode, setEditTitleMode] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        if (note) {
            setTitle(note.title)
            setContent(note.content)
        }
    }, [note])

    const editTitle = () => {
        if (note) {
            dispatch(updateNote({
                id: note.id,
                title: title,
                content: note.content,
            }))
            setEditTitleMode(false)
        }
    }

    return (
        <PageContainer color1={Colors.teal300} color2={Colors.pink100} gradient>
            <View style={styles.header}>
                { editTitleMode ?
                <CustomInput
                    placeholder={"New title"}
                    validate={editTitle}
                    onChangeText={(e) => setTitle(e)}
                    value={title}
                    style={{height: 44, width: '80%', fontSize: 18, }}
                />
                :
                <Pressable onPress={() => setEditTitleMode(true)} style={{width: "80%"}}>
                    <ThemedText type="smalltitle">{note?.title}</ThemedText>
                </Pressable>

                }
                <Pressable 
                    style={styles.closeNoteButton}
                    onPress={() => router.back()}
                >
                    <FontAwesomeIcon icon={faXmark} size={25}/>
                </Pressable>
            </View>
            <View style={styles.noteCard}>
                <ThemedText>{note?.content}</ThemedText>
            </View>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    header: {
        height: "20%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "90%",
    },
    noteCard: {
        height: "80%",
        backgroundColor: Colors.backGround,
        width: "90%",
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    closeNoteButton: {
        backgroundColor: Colors.backGround,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        marginBottom: 11,
    }
})