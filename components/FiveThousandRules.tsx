import {View, ScrollView} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPooStorm } from '@fortawesome/free-solid-svg-icons'

export function FiveThousandRules() {
  return (
    <View style={{padding: 20}}>
      <ThemedText type="subtitle" center style={{marginTop: 20, marginBottom: 20}}>5000 Rules</ThemedText>
      <ScrollView>
        <ThemedText type="defaultSemiBold">Intro</ThemedText>
        <ThemedText type="default">
          The 5000 is a dice game which is played with five dice and at least two players.
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={{marginTop: 12}}>How to play</ThemedText>
        <ThemedText type="default">
          Each turn, a player throw the five dice, a 1 is worth 100 points and a 5 is worth 50 points, outside of special combination.
        </ThemedText>
      </ScrollView>
    </View>
  )
}