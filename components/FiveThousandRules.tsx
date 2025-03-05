import {View, ScrollView} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPooStorm } from '@fortawesome/free-solid-svg-icons'

export function FiveThousandRules() {
  return (
    <View style={{padding: 20}}>
      <ThemedText type="subtitle" center style={{marginTop: 20, marginBottom: 20}}>5000 Rules</ThemedText>
      <ScrollView style={{marginBottom: 20}}>
        <ThemedText type="defaultSemiBold">Intro</ThemedText>
        <ThemedText>
          The 5000 is a dice game which is played with five dices and at least two players. The goal of the game is to reach 5000 points.
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={{marginTop: 12}}>How to play</ThemedText>
        <ThemedText>
          Each turn, a player throw the dices, a 1 is worth 100 points and a 5 is worth 50 points, outside of special combination. After a throw, the player can keep playing by keeping at least one of his/her dice that is 1 or 5 or a special combination. If the player don't throw again, the current points given by the dices are added to his/her total score. If the new throw don't give any point, the turn ends and the player get a tose (<FontAwesomeIcon icon={faPooStorm} />) and lose all point gained during the turn. If the new throw give some points, the player may chose to keep playing or stop his/her turn and get the points obtained during the turn. 
        </ThemedText>
        <ThemedText style={{marginTop: 6}}>
          If all the dices give points, the player get a full hand: he have to keep playing by throwing the 5 dice again, with the previous points counting toward the score of the turn.
        </ThemedText>
        <ThemedText style={{marginTop: 6}}>
          If a player doesn't gain any point, they get a tose (<FontAwesomeIcon icon={faPooStorm} />), if a player get 3 tose in a row, they lose 500 points.
        </ThemedText>
        <ThemedText style={{marginTop: 6}}>
          When a new player begin his/her turn, they can throw the 5 dices or they can start from the previous player position: they can throw only the dice not getting any point from the previous player throw and start from the previous player last score. If after a throw no point are gained, all previous point are lost and the player get a tose (<FontAwesomeIcon icon={faPooStorm} />).
        </ThemedText>
        <ThemedText style={{marginTop: 6}}>
          If at any point a player reach the same total score as another player, that other player go back to his previous total score.
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={{marginTop: 12}}>Special Combination:</ThemedText>
        <ThemedText type="defaultSemiBold" style={{marginTop: 6}}>Suit</ThemedText>
        <ThemedText>If you got 5 numbers following each other, you get 1500 points, and since all five dice count toward your score, that's a full hand.</ThemedText>
        <ThemedText type="defaultSemiBold" style={{marginTop: 6}}>Full</ThemedText>
        <ThemedText>If a player get 3 of a kind and two of a kind, he get 100 times the number of the 3 dices + 100 times the number of the 2 dices</ThemedText>
        <ThemedText type="defaultSemiBold" style={{marginTop: 6}}>3 of a kind</ThemedText>
        <ThemedText>If a player get 3 of kind, he get 100 times the number of the dice, even if it isn't 1 or 5.</ThemedText>
        <ThemedText type="defaultSemiBold" style={{marginTop: 6}}>4 of a kind</ThemedText>
        <ThemedText>If a player get 4 of kind, he get 200 times the number of the dice, even if it isn't 1 or 5.</ThemedText>
        <ThemedText type="defaultSemiBold" style={{marginTop: 6}}>5 of a kind</ThemedText>
        <ThemedText>If a player get 4 of kind, he get 400 times the number of the dice, even if it isn't 1 or 5. If the 5 dices end up on a 1, the score of the player is set to 5000.</ThemedText>
        
        <ThemedText type="defaultSemiBold" style={{marginTop: 12}}>End of the game</ThemedText>
        <ThemedText>
          The game end when a player reach exactly 5000 points. If a player end his turn with a total score beyond 5000 points, they get a tose (<FontAwesomeIcon icon={faPooStorm} />). If a player reach exactly 5000 points, each other player get one turn to try equalize the score and be the one at 5000 points, which trigger another turn for each other players and so on. If all player have play their last turn and no one reached 5000 points, the player with 5000 points is the winner.
        </ThemedText>
      </ScrollView>
    </View>
  )
}