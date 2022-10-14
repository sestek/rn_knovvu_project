import React from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Knovvu32, KnovvuMainLogo2 } from "@src/assests";
import { Button, Text } from "@rneui/base";
import { useAppSelector } from "@src/utils/redux/hooks";
import BusinessComponent from "@src/utils/functions/businessComponent";
import { CtIconEnum } from "@src/utils/types";
import Ionicons from "react-native-vector-icons/Ionicons";

function TabBarComponent({ state, descriptors, navigation }) {

    const color_100 = useAppSelector(state => state.theme.color_100);
    const color_200 = useAppSelector(state => state.theme.color_200);
    const color_300 = useAppSelector(state => state.theme.color_300);

    const modalVisible = useAppSelector(state => state.main.modalVisible);

    const dynamicWidth = Dimensions.get('screen').width * (1 / state.routes?.length);

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', borderTopWidth: 0.2, borderTopColor: color_300 }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {

                    if (route.name === "Knovvu" && modalVisible) {
                        modalVisible();
                        return;
                    }

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const getIconFunc = (focused: boolean) => {
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
                    else if (route.name === 'Knovvu') {
                        return <Image
                            source={Knovvu32}
                            resizeMode="stretch"
                            style={{
                                width: 50,
                                height: 30,
                            }} />
                    }
                    return <Ionicons name={iconName || ''} size={26} color={focused ? color_200 : color_300} />;
                }

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flexDirection: 'column', alignItems: 'center', flexGrow: 1, width: dynamicWidth, padding: 6 }}
                    >
                        {getIconFunc(isFocused)}
                        <Text style={{ color: isFocused ? color_200 : color_300, fontSize: 11 }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default TabBarComponent;

{/*<TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                    
                </TouchableOpacity>*/}