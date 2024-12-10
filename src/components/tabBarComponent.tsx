import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import {
  HomeActive,
  HomePassive,
  ChatBotActive,
  ChatBotPassive,
  AvatarActive,
  AvatarPassive,
} from '@src/assests';
import {Text} from '@rneui/base';
import {useAppSelector} from '@src/utils/redux/hooks';
import useModalCloseStore from '@src/zustandStore/chatgpt/store';
import useModalCloseAvatarStore from '@src/zustandStore/avatar/store';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import { KnovuuIcon } from 'rn-sestek-webchat/src/image';

const TabBarComponent = ({state, descriptors, navigation, modalRef}) => {
  const newState = {...state};
  newState.routes = newState.routes.filter(
    (item: any) => item.name !== 'ChatGpt' && item.name !== 'Settings',
  );
  const dynamicWidth =
    Dimensions.get('screen').width * (1 / state.routes?.length);

  const color_100 = useAppSelector(state => state.theme.color_100);
  const color_200 = useAppSelector(state => state.theme.color_200);
  const color_300 = useAppSelector(state => state.theme.color_300);

  const modalVisible = useAppSelector(state => state.main.modalVisible);
  const [visible, setVisible] = useState<boolean>(true);

  const {isModalOpen, setIsModalOpen} = useModalCloseStore();
  const {isModalAvatarOpen, setIsModalAvatarOpen} = useModalCloseAvatarStore();

  useEffect(() => {
    let keyboardEventListeners: {remove: () => any}[];
    if (Platform.OS === 'android') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
        Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
      ];
    }
    return () => {
      if (Platform.OS === 'android') {
        keyboardEventListeners &&
          keyboardEventListeners.forEach((eventListener: {remove: () => any}) =>
            eventListener.remove(),
          );
      }
    };
  }, []);


  const RenderTabBarComp = () => {
    return (
      <View style={styles().mainView}>
        {newState.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            if (route.name === 'Home') {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event?.defaultPrevented) {
                navigation.navigate({name: route.name, merge: true});
              }
            } else {
              NetInfo.addEventListener(state => {
                if (state.isConnected) {
                  if (route.name === 'Virtual Agent' && modalVisible) {
                    modalRef?.current?.startConversation();                   
                    return;
                  }

                  if (route.name === 'ChatGpt') {
                    setIsModalOpen(true);
                    navigation.navigate('ChatGpt');
                    return;
                  }

                  if (route.name === 'Avatar') {
                    setIsModalAvatarOpen(true);
                    navigation.navigate('Avatar');
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
                } else {
                  Toast.show({
                    type: 'error',
                    text1: 'Internet bağlantısı kurulamadı ⚠️',
                  });
                  navigation.navigate('Home');
                }
              });
            }
          };
          const getIconFunc = (focused: boolean) => {
            let imageName;
            if (route.name === 'Home') {
              imageName = focused ? HomePassive : HomeActive;
            } else if (route.name === 'Virtual Agent') {
              imageName = KnovuuIcon;
            } else if (route.name === 'Avatar') {
              imageName = focused ? AvatarPassive : AvatarActive;
            }

            return (
              <Image
                source={imageName}
                resizeMode="stretch"
                style={styles().image}
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

  const render = () => {
    if (Platform.OS === 'ios') {
      return <RenderTabBarComp />;
    }
    if (!visible) return null;
    return <RenderTabBarComp />;
  };

  return render();
};

const styles = (prm?: any, prm2?: any, prm3?: any) =>
  StyleSheet.create({
    text: {
      color: prm === true ? prm2 : prm3,
      fontSize: 11,
    },
    touchArea: {
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1,
      width: prm,
      paddingTop: 6,
      paddingBottom: 20,
      backgroundColor: 'white',
    },
    image: {
      width: 30,
      height: 30,
      backgroundColor: 'white',
    },
    mainView: {
      flexDirection: 'row',
      justifyContent: 'center',
      borderTopWidth: 0.5,
      borderTopColor: '#5F6295',
      borderTopRadius: 30,
    },
  });

export default TabBarComponent;
