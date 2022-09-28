import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './pages/home';
import Settings from './pages/settings';
import DrawerComponent from '@src/components/drawerComponent';
import { useAppDispatch, useAppSelector } from '@src/utils/redux/hooks';
import About from './pages/about';
import { Image } from '@rneui/base';
import { Knovvu32 } from '@src/assests';
import { asyncGetWebchatData } from '@src/utils/redux/slice/webchatSlice';
import ContactUs from './pages/contactus';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Navigator = () => {
    const dispatch = useAppDispatch();
    const color_100 = useAppSelector(state => state.theme.color_100);
    const color_200 = useAppSelector(state => state.theme.color_200);
    const color_300 = useAppSelector(state => state.theme.color_300);

    useEffect(() => {
        dispatch(asyncGetWebchatData());
    }, [])

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerRight: () => <Image source={Knovvu32} style={{ width: 32, height: 32, marginHorizontal: 16 }} />,
                    headerTintColor: color_100,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'ios-home'
                                : 'ios-home-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'ios-build' : 'ios-build-outline';
                        }
                        else if (route.name === 'About') {
                            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                        }
                        else if (route.name === 'Contact Us') {
                            iconName = focused ? 'ios-mail-sharp' : 'ios-mail-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName || ''} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: color_200,
                    tabBarInactiveTintColor: color_300,
                })}
            //drawerContent={(props) => <DrawerComponent {...props} />}
            >
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="About" component={About} />
                <Drawer.Screen name="Contact Us" component={ContactUs} />
                <Drawer.Screen name="Settings" component={Settings} />
            </Tab.Navigator>

        </NavigationContainer>
    )
}

export default Navigator;