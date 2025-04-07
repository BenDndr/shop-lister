import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faOtter } from '@fortawesome/free-solid-svg-icons'
import { PageContainer } from '@/components/PageContainer';
import {ThemedText} from '@/components/ThemedText';
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";


export default function AboutIndex() {

    return (
        <PageContainer color1={Colors.teal300} color2={Colors.pink100} gradient>
            <View style={styles.presCard}>
                <Image
                    style={styles.avatar}
                    source={require("../../../assets/images/Profile-pic.png")}
                />
                <ThemedText type="subtitle">Who am I ?</ThemedText>
                <Text>My name is Benjamin Dandre. I'm a web and mobile developer, and this is one of my personal projects. I'm currently looking for a job. If you're interested, or if you just want to chat, feel free to contact me.</Text>
                <FontAwesomeIcon icon={faOtter} size={24}/>
                <ThemedText type="defaultSemiBold">Want to get in touch ?</ThemedText>
                <View style={styles.rsView}>
                    <TouchableOpacity style={styles.rsButton} onPress={() => Linking.openURL("https://www.linkedin.com/in/benjamin-dandre/")}>
                        <FontAwesomeIcon icon={faLinkedin} size={24}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rsButton} onPress={() => Linking.openURL("https://github.com/BenDndr")}>
                        <FontAwesomeIcon icon={faGithub} size={24}/>
                    </TouchableOpacity>
                </View>

            </View>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    presCard: {
        height: '50%',
        backgroundColor: Colors.backGround,
        width: "80%",
        padding: 42,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        gap: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: Colors.backGround,
        borderWidth: 4,
        position: "absolute",
        top: -50,
    },
    rsView: {
        flexDirection: 'row',
        gap: 20,
    },
    rsButton: {
        elevation: 2,
        padding: 10,
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 4px',
        borderRadius: 8,
    }
})