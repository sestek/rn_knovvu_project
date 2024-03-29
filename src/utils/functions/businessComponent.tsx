import React from 'react';
import { Icon } from '@rneui/base';
import { CtIconEnum } from '@src/utils/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Zocial from 'react-native-vector-icons/Zocial';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default class BusinessComponent {
    constructor() {

    }

    static getIconComponent(type?: CtIconEnum, name?: string, size: number = 24, color: string = 'black') {
        switch (type) {
            case CtIconEnum.SimpleLineIcons:
                return <SimpleLineIcons name={name || ''} size={size} color={color} />;
            case CtIconEnum.AntDesign:
                return <AntDesign name={name || ''} size={size} color={color} />;
            case CtIconEnum.FontAwesome:
                return <FontAwesome name={name || ''} size={size} color={color} style={{ margin: 4 }} />;
            case CtIconEnum.Foundation:
                return <Foundation name={name || ''} size={size} color={color} />;
            case CtIconEnum.Fontisto:
                return <Fontisto name={name || ''} size={size} color={color} />;
            case CtIconEnum.Ionicons:
                return <Ionicons name={name || ''} size={size} color={color} />;
            case CtIconEnum.Zocial:
                return <Zocial name={name || ''} size={size} color={color} />;
            case CtIconEnum.Entypto:
                return <Entypo name={name || ''} size={size} color={color} />;
            case CtIconEnum.Feather:
                return <Feather name={name || ''} size={size} color={color} />;
            default:
                return <Icon name={name || ''} size={size} color={color} />;
        }
    }

    static capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static validateEmail = (email: string) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email);
    };

    static createGuid() {
        var s = ["M", "o", "b", "i", "l"];
        var hexDigits = "0123456789abcdef";
        for (var i = 5; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = "2";
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }
}