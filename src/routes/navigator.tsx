import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './pages/home';
import Settings from './pages/settings';
import TabBarComponent from '@src/components/tabBarComponent';
import {useAppDispatch, useAppSelector} from '@src/utils/redux/hooks';
import About from './pages/about';
import {Knovvu32} from '@src/assests';
import {asyncGetWebchatData} from '@src/utils/redux/slice/webchatSlice';
import ContactUs from './pages/contactus';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions, Image, StatusBar} from 'react-native';
import ChatGpt from './pages/chatGpt';
import Sound from './pages/sound';
import DigitalHuman from './pages/digitalHuman';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const KnovvuCmp = ({navigation}) => {
  return null;
};

const Navigator = () => {
  const dispatch = useAppDispatch();
  const color_100 = useAppSelector(state => state.theme.color_100);
  const color_200 = useAppSelector(state => state.theme.color_200);
  const color_300 = useAppSelector(state => state.theme.color_300);

  useEffect(() => {
    dispatch(asyncGetWebchatData());
  }, []);


  return (
    <>
      <StatusBar hidden={false} barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          tabBar={props => <TabBarComponent {...props} />}
          
          screenOptions={({route}) => ({
            title:'',
            headerRight: () => (
              <Image
                source={Knovvu32}
                style={{width: 32, height: 32, marginHorizontal: 16}}
              />
            ),
            tabBarHideOnKeyboard: true,
            headerTintColor: color_100,
            tabBarActiveTintColor: color_200,
            tabBarInactiveTintColor: color_300,
          })}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="ChatGpt" component={ChatGpt} />
          <Drawer.Screen name="Avatar" component={DigitalHuman} />
          <Drawer.Screen name="Knovvu" component={KnovvuCmp} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigator;
