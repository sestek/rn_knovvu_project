import React from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Knovvu32} from '@src/assests';
import {Text} from '@rneui/base';
import {useAppSelector} from '@src/utils/redux/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabBarComponent = ({state, descriptors, navigation}) => {
  const color_100 = useAppSelector(state => state.theme.color_100);
  const color_200 = useAppSelector(state => state.theme.color_200);
  const color_300 = useAppSelector(state => state.theme.color_300);

  const modalVisible = useAppSelector(state => state.main.modalVisible);

  const dynamicWidth =
    Dimensions.get('screen').width * (1 / state.routes?.length);

  return (
    <View style={styles(color_300).mainView}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'Knovvu' && modalVisible) {
            modalVisible();
            return;
          }

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event?.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };
        const getIconFunc = (focused: boolean) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-build' : 'ios-build-outline';
          } else if (route.name === 'About') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Contact Us') {
            iconName = focused ? 'ios-mail-sharp' : 'ios-mail-outline';
          } else if (route.name === 'Knovvu') {
            return (
              <Image
                source={Knovvu32}
                resizeMode="stretch"
                style={styles().image}
              />
            );
          }
          return (
            <Ionicons
              name={iconName || ''}
              size={26}
              color={focused ? color_200 : color_300}
            />
          );
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={route.name}
            onPress={onPress}
            style={styles(dynamicWidth).touchArea}
            key={route.name}>
            {getIconFunc(isFocused)}
            <Text style={styles(isFocused, color_200, color_300).text}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = (prm?: any, prm2?: any, prm3?: any) =>
  StyleSheet.create({
    text: {
      color: prm ? prm2 : prm3,
      fontSize: 11,
    },
    touchArea: {
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1,
      width: prm,
      padding: 6,
    },
    image: {
      width: Dimensions.get('screen').width * 0.11,
      height: Dimensions.get('screen').width * 0.11,
    },
    mainView: {
      flexDirection: 'row',
      justifyContent: 'center',
      borderTopWidth: 0.2,
      borderTopColor: prm,
    },
  });

export default TabBarComponent;
