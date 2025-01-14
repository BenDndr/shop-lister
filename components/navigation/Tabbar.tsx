import { View, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { IconSymbol } from '../ui/IconSymbol';
import { Colors } from '@/constants/Colors';

interface CustomTabBarProps extends BottomTabBarProps {

}

const TabBar: React.FC<CustomTabBarProps>  = ({ state, descriptors, navigation }) => {

//   const icons = {
//     lesson: require("../../assets/icons/lesson.png"),
//     lessonActive: require("../../assets/icons/lesson-green.png"),
//     student: require("../../assets/icons/student.png"),
//     studentActive: require("../../assets/icons/student-green.png"),
//     demandes: require("../../assets/icons/demandes.png"),
//     demandesActive: require("../../assets/icons/demandes-green.png"),
//     burger: require("../../assets/icons/burger-yellow.png"),
//   }
  
  return (
    <View style={styles.tabBar}>

      {state.routes.map((route, index) => {

        const { options } = descriptors[route.key];

        // let icon
        // let iconFocused

        // if (route.name == "lessons") {
        //   icon = icons.lesson
        //   iconFocused = icons.lessonActive
        // } else if (route.name == "eLearning" || route.name == "students") {
        //   icon = icons.student
        //   iconFocused = icons.studentActive
        // } else if (route.name == "collectiveLessons" || route.name == "requests") {
        //   icon = icons.demandes
        //   iconFocused = icons.demandesActive
        // } else {
        //   icon = icons.burger
        //   iconFocused = icons.burger
        // }

        const globalIndex = state.routes.findIndex((r) => r.name === route.name);
        const isFocused = state.index === globalIndex;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            // testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{...styles.tabContainer, borderBottomColor: isFocused ? Colors.pink500 : 'transparent'}}
            key={index}
          >

            {/* <Image source={isFocused ? iconFocused : icon} style={styles.tabBarIcons} /> */}
            <IconSymbol size={28} name="house.fill" color={isFocused ? Colors.pink500 : Colors.orange300} />

          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    bottom: 30,
    width: '95%',
    marginHorizontal: '2.5%',
    paddingVertical: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  tabButton: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  burgerIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  tabContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
  },
  tabBarIcons: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  }
})

export default TabBar