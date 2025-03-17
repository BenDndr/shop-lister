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
    const [editContentMode, setEditContentMode] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const translateX = useSharedValue<number>(-100);

    useEffect(() => {
        translateX.value = withSpring(-200)
    }, [])

    useEffect(() => {
        if (note) {
            setTitle(note.title)
            setContent(note.content)
        }
    }, [note])

    useEffect(() => {
        translateX.value = withSpring(0)
    }, [editContentMode])

    const handleEditMode = (title: boolean) => {
        if (title) {
            setEditTitleMode(true)
            setEditContentMode(false)
        } else {
            setEditContentMode(true)
            setEditTitleMode(false)
        }
    }

    const handleEdit = (titleEdit: boolean) => {
        if (note) {
            if (titleEdit) {
                dispatch(updateNote({
                    id: note.id,
                    title: title,
                    content: note.content,
                }))
                setEditTitleMode(false)
            } else {
                dispatch(updateNote({
                    id: note.id,
                    title: note.title,
                    content: content,
                }))
                setEditContentMode(false)
            }
        }
    }

    return (
        <PageContainer color1={Colors.teal300} color2={Colors.pink100} gradient>
            <View style={styles.header}>
                { editTitleMode ?
                <CustomInput
                    placeholder={"New title"}
                    validate={() => handleEdit(true)}
                    onChangeText={(e) => setTitle(e)}
                    value={title}
                    style={{height: 44, width: '70%', fontSize: 18, }}
                />
                :
                <Pressable onPress={() => handleEditMode(true)} style={{width: "70%"}}>
                    <ThemedText type="smalltitle">{note?.title}</ThemedText>
                </Pressable>

                }
                {
                    editContentMode ?
                    <Pressable onPress={() => handleEdit(false)} style={styles.validateButton}>
                        <FontAwesomeIcon icon={faCheck} size={25} color={Colors.backGround}/>
                    </Pressable>
                    :
                    <Pressable onPress={() => setEditContentMode(true)} style={styles.validateButton}>
                        <FontAwesomeIcon icon={faPen} size={25} color={Colors.backGround}/>
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
                {
                    editContentMode ?
                    <TextInput
                        style={styles.contentInput}
                        placeholder="Write your note here..."
                        value={content}
                        onChangeText={setContent}
                        multiline={true}
                        numberOfLines={10}
                        textAlignVertical="top"
                    />
                    :
                    <Pressable onPress={() => handleEditMode(false)} style={styles.contentEdit}>
                        <ThemedText>{note?.content}</ThemedText>
                    </Pressable>
                }
                    
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
    contentEdit: {
        height: "90%",
        width: "100%",
    },
    contentInput: {
        height: "80%",
        width: "100%",
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: "white",
    },
    validateButton: {
        marginBottom: 10,
        width: 50,
        height: 50,
        backgroundColor: Colors.teal700,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    }
})