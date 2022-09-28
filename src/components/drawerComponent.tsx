import React from "react";
import { Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { KnovvuMainLogo2 } from "@src/assests";
import { Text } from "@rneui/base";
import { useAppSelector } from "@src/utils/redux/hooks";

const DrawerComponent = (props: any) => {

    const color_400 = useAppSelector(state => state.theme.color_400);

    return (
        <>
            <Image
                source={KnovvuMainLogo2}
                style={{ marginTop: 50, width: '100%', height: 100 }}
                resizeMode="cover"
            />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <Text style={{ fontSize: 12, paddingVertical: 20, paddingLeft: 10, color: color_400 }}>Copyright © 2022 Knovvu. All rights reserved.</Text>
        </>

    );
}

export default DrawerComponent;