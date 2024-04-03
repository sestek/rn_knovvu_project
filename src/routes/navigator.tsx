import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './pages/home';
import Settings from './pages/settings';
import TabBarComponent from '@src/components/tabBarComponent';
import {useAppDispatch, useAppSelector} from '@src/utils/redux/hooks';
import {asyncGetWebchatData} from '@src/utils/redux/slice/webchatSlice';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import ChatGpt from './pages/chatGpt';
import DigitalHuman from './pages/digitalHuman';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const KnovvuCmp = ({navigation}) => {
  return null;
};
interface NavigatorProps {
  modalRef: any;
}
const Navigator = (propsNavigator: NavigatorProps) => {
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
          tabBar={props => (
            <TabBarComponent {...props} modalRef={propsNavigator.modalRef} />
          )}
          screenOptions={({route}) => ({
            title: route.name,
            headerShown: false,
            tabBarHideOnKeyboard: true,
            headerTintColor: color_100,
            tabBarActiveTintColor: color_200,
            tabBarInactiveTintColor: color_300,
          })}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="ChatGpt" component={ChatGpt} />
          <Drawer.Screen name="Avatar" component={DigitalHuman} />
          <Drawer.Screen name="Knovvu" component={KnovvuCmp} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigator;
