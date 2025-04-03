import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors } from '@/constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList, faNoteSticky, faBook, faMugSaucer, faCircleUser } from '@fortawesome/free-solid-svg-icons'

interface CustomTabBarProps extends BottomTabBarProps {

}

const Tabbar: React.FC<CustomTabBarProps>  = ({ state, descriptors, navigation }) => {

  const getIcon = (routeName: string) => {
    switch (routeName) {
      case 'about':
        return faCircleUser;
      case 'notes':
        return faNoteSticky;
      case 'index':
        return faList;
      case 'extra':
        return faMugSaucer;
      default:
        return faMugSaucer;
    }
  }
  
  return (
    <View style={styles.tabBar}>

      {state.routes.map((route, index) => {

        const { options } = descriptors[route.key];

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
            style={styles.tabContainer}
            key={index}
          >
            <View style={{...styles.iconConatainer, borderBottomColor: isFocused ? Colors.pink500 : 'transparent'}}>
              <FontAwesomeIcon icon={getIcon(route.name)} color={isFocused ? Colors.pink500 : Colors.teal700} size={25}/>
            </View>

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
    bottom: 10,
    width: '95%',
    marginHorizontal: '2.5%',
    paddingVertical: 15,
    borderRadius: 16,
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
  iconConatainer: {
    height: '100%', 
    borderBottomWidth: 3, 
    justifyContent: 'center',
  },
  tabContainer: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Tabbar