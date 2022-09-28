import { Text } from "@rneui/base";
import { useAppSelector } from "@src/utils/redux/hooks";
import React from "react";
import { Linking, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getVersion, getBuildNumber } from 'react-native-device-info';

const About = ({ navigation }) => {

    const color_300 = useAppSelector(state => state.theme.color_300);
    const color_100 = useAppSelector(state => state.theme.color_100);
    const color_400 = useAppSelector(state => state.theme.color_400);

    const linkinguRL = (type: string, value: string) => {
        Linking.openURL(`${type}:${value}`);
    }

    return (
        <ScrollView style={{ flex: 1, paddingTop: 30, paddingHorizontal: 15 }}>

            <Text h3>Knovvu is a registered trademark of <Text style={{ color: color_300 }}>Sestek.</Text></Text>
            <Text>{"\n"}</Text>
            <Text h4 h4Style={{ fontSize: 18, fontWeight: '400' }}>
                Sestek is a global technology company helping organizations with Conversational Solutions to be data-driven, increase efficiency and deliver better experiences for their customers. Sestek’s AI-powered solutions are build on text-to-speech, speech recognition, natural language processing and voice biometrics technologies.
            </Text>
            <Text h4>{"\n"}Call Us On{"\n"}</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ color: color_100, fontSize: 18, fontWeight: '700' }}>United Kingdom</Text>
                    <TouchableOpacity onPress={() => linkinguRL('tel', '+44 7897 027400')}>
                        <Text style={{ color: color_400, fontSize: 18, fontWeight: 'bold' }}>+44 7897 027400</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ color: color_100, fontSize: 18, fontWeight: '700' }}>Unites States</Text>
                    <TouchableOpacity onPress={() => linkinguRL('tel', '+1 315 961 84 04')}>
                        <Text style={{ color: color_400, fontSize: 18, fontWeight: 'bold' }}>+1 315 961 84 04</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text>{"\n"}</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ color: color_100, fontSize: 18, fontWeight: '700' }}>Europe & Turkey</Text>
                    <TouchableOpacity onPress={() => linkinguRL('tel', '+90 212 286 25 45')}>
                        <Text style={{ color: color_400, fontSize: 18, fontWeight: 'bold' }}>+90 212 286 25 45</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={{ color: color_100, fontSize: 18, fontWeight: '700' }}>Middle East & Africa</Text>
                    <TouchableOpacity onPress={() => linkinguRL('tel', '+971 4 390 1646')}>
                        <Text style={{ color: color_400, fontSize: 18, fontWeight: 'bold' }}>+971 4 390 1646</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text>{"\n\n"}</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => linkinguRL('mailto', 'contact@knovvu.com')}>
                        <Text style={{ color: color_300, fontSize: 18, fontWeight: '700', textAlign: 'center' }}>contact@knovvu.com</Text>
                    </TouchableOpacity>
                    <Text style={{ color: color_100, fontSize: 11, fontWeight: '700', textAlign: 'center' }}>{`Version : ${getVersion()}(${getBuildNumber()})`}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default About;
