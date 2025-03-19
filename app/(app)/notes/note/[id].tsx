import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faXmark, faPen } from '@fortawesome/free-solid-svg-icons'
import { PageContainer } from '@/components/PageContainer'
import {ThemedText} from '@/components/ThemedText';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { updateNote, deleteNote } from '@/store/slices/notesSlice'
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { CustomInput } from '@/components/CustomInput';

export default function ShowNote() {

    const router = useRouter();
    const {id} =  useLocalSearchParams()
    const note = useAppSelector(state => state.notes).notes.find(note => note.id === id)
    const content = note?.content
    const dispatch = useAppDispatch()
    const [editTitleMode, setEditTitleMode] = useState(false)
    const [title, setTitle] = useState("")

    useEffect(() => {
        if (note) {
            setTitle(note.title)
        }
    }, [note])

    const handleEditTitle = () => {
        setEditTitleMode(true)
    }

    const validatelEditTitle = () => {
        if (!note) return
        dispatch(updateNote({
            id: note.id,
            title: title,
            content: note.content,
        }))
        setEditTitleMode(false)
    }

    const editContent = (content: string) => {
        if (!note) return
        dispatch(updateNote({
            id: note.id,
            title: note.title,
            content: content,
        }))
    }

    return (
        <PageContainer color1={Colors.teal300} color2={Colors.pink100} gradient>
            <View style={styles.header}>
                { editTitleMode ?
                <CustomInput
                    placeholder={"New title"}
                    validate={validatelEditTitle}
                    onChangeText={(e) => setTitle(e)}
                    value={title}
                    style={{height: 44, width: '70%', fontSize: 18, }}
                />
                :
                <Pressable onPress={handleEditTitle} style={{width: "70%"}}>
                    <ThemedText type="smalltitle">{note?.title}</ThemedText>
                </Pressable>
                }
                <Pressable 
                    style={styles.closeNoteButton}
                    onPress={() => router.back()}
                >
                    <FontAwesomeIcon icon={faCheck} size={25}/>
                </Pressable>
            </View>
            <View style={styles.noteCard}>
                <TextInput
                    style={styles.contentInput}
                    placeholder="Write your note here..."
                    value={content}
                    onChangeText={(e) => editContent(e)}
                    multiline={true}
                    numberOfLines={20}
                    textAlignVertical="top"
                />
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
    },
    contentInput: {
        height: "90%",
        width: "100%",
        fontSize: 16,
    },
})