import { Button, Card, Input, Text } from "@rneui/base";
import { KnovvuMainLogo2 } from "@src/assests";
import ColorPickerModal from "@src/components/colorPickerModal";
import { useAppDispatch, useAppSelector } from "@src/utils/redux/hooks";
import { asyncSetCustomizeConfiguration, asyncSetInitialState } from "@src/utils/redux/slice/webchatSlice";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, Platform, ScrollView, StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";

interface WebchatType {
    url: string,
    tenant: string,
    project: string
    headerColor: string,
    headerText: string,
    bottomColor: string,
    bottomText: string,
    incomingTextColor: string,
    incomingText: string,
    outgoingTextColor: string,
    outgoingText: string,
    messageColor: string,
    messageBoxColor: string
}

const Settings = () => {

    const webchat = useAppSelector(state => state.webchat);
    useEffect(() => {
        const newObj = Object.assign({}, webchat);
        setWebchatCustomize(newObj);
    }, [webchat]);

    const [headerColorState, setHeaderColorState] = useState<boolean>(false);
    const [bottomColorState, setBottomColorState] = useState<boolean>(false);
    const [incomingColorState, setIncomingColorState] = useState<boolean>(false);
    const [outgoingColorState, setOutgoingColorState] = useState<boolean>(false);
    const [messageColorState, setMessageColorState] = useState<boolean>(false);
    const [messageBoxColorState, setMessageBoxColorState] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const onChangeInput = (key: string, value: string) => {
        const newObj = Object.assign({}, webchatCustomize);
        (newObj as any)[key] = value;
        setWebchatCustomize(newObj);
    }

    const [webchatCustomize, setWebchatCustomize] = useState<WebchatType>(Object.assign({}, webchat));

    const onChangeCustomize = (key: string, value: string) => {
        const newObj = Object.assign({}, webchatCustomize);
        (newObj as any)[key] = value;
        setWebchatCustomize(newObj);
    }

    const saveChatState = () => {

        dispatch(asyncSetCustomizeConfiguration(webchatCustomize));
        /*nnObject.keys(webchatCustomize).forEach(function (key, index) {
            dispatch(setCustomizeConfiguration({ key, value: (webchatCustomize as any)[key] }));
        });*/
        showMessage({
            backgroundColor: '#7f81ae',
            description: 'Your changes have been made.',
            message: 'Success'
        });
    }

    const resetChatState = () => {
        Alert.alert(
            "Warning",
            "If you do a reset, the settings will return to the settings when the application was first installed.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => dispatch(asyncSetInitialState()) }
            ]
        );
    }

    return (
        <View style={{ flex: 1, marginTop: 8 }}>
            <ScrollView >
                <Image source={KnovvuMainLogo2} style={{ width: Dimensions.get('window').width, height: 100 }} resizeMode="cover" />
                <Card style={{ padding: 8 }}>
                    <Card.Title>DEFAULT CONFIGURATION</Card.Title>
                    <Card.Divider />
                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>URL</Text>
                        <Input
                            placeholder="URL"
                            rightIcon={{ type: 'font-awesome', name: 'link' }}
                            value={webchatCustomize.url}
                            onChangeText={value => onChangeInput('url', value)}
                        />
                    </View>
                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>Tenant</Text>
                        <Input
                            placeholder="Tenant"
                            rightIcon={{ type: 'font-awesome', name: 'link' }}
                            value={webchatCustomize.tenant}
                            onChangeText={value => onChangeInput('tenant', value)}
                        />
                    </View>
                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>Project</Text>
                        <Input
                            placeholder="Project"
                            rightIcon={{ type: 'font-awesome', name: 'link' }}
                            value={webchatCustomize.project}
                            onChangeText={value => onChangeInput('project', value)}
                        />
                    </View>
                </Card>
                <Card style={{ padding: 8 }}>
                    <Card.Title>CUSTOMIZE CONFIGURATION</Card.Title>
                    <Card.Divider />
                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>Header Color</Text>
                        <ColorPickerModal
                            color={webchatCustomize.headerColor}
                            headerText="Header Color"
                            isVisible={headerColorState}
                            setIsVisible={setHeaderColorState}
                            saveColor={(color: string) => onChangeCustomize('headerColor', color)}
                        />
                        <Input
                            disabled
                            placeholder="Header Color"
                            leftIcon={{ type: 'font-awesome', name: 'circle', color: webchatCustomize.headerColor }}
                            value={webchatCustomize.headerColor}
                            onPressIn={() => setHeaderColorState(true)}
                        />
                    </View>
                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>Header Text</Text>
                        <Input
                            placeholder="Header Text"
                            rightIcon={{ type: 'font-awesome', name: 'link' }}
                            value={webchatCustomize.headerText}
                            onChangeText={value => onChangeCustomize('headerText', value)}
                        />
                    </View>
                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>Bottom Color</Text>
                        <ColorPickerModal
                            color={webchatCustomize.bottomColor}
                            headerText="Bottom Color"
                            isVisible={bottomColorState}
                            setIsVisible={setBottomColorState}
                            saveColor={(color: string) => onChangeCustomize('bottomColor', color)}
                        />
                        <Input
                            disabled
                            placeholder="Bottom Color"
                            leftIcon={{ type: 'font-awesome', name: 'circle', color: webchatCustomize.bottomColor }}
                            value={webchatCustomize.bottomColor}
                            onPressIn={() => setBottomColorState(true)}
                        />
                    </View>
                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>Bottom Text</Text>
                        <Input
                            placeholder="Bottom Text"
                            rightIcon={{ type: 'font-awesome', name: 'link' }}
                            value={webchatCustomize.bottomText}
                            onChangeText={value => onChangeCustomize('bottomText', value)}
                        />
                    </View>

                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>Incoming Text Color</Text>
                        <ColorPickerModal
                            color={webchatCustomize.incomingTextColor}
                            headerText="Incoming Text Color"
                            isVisible={incomingColorState}
                            setIsVisible={setIncomingColorState}
                            saveColor={(color: string) => onChangeCustomize('incomingTextColor', color)}
                        />
                        <Input
                            disabled
                            placeholder="Incoming Text Color"
                            leftIcon={{ type: 'font-awesome', name: 'circle', color: webchatCustomize.incomingTextColor }}
                            value={webchatCustomize.incomingTextColor}
                            onPressIn={() => setIncomingColorState(true)}
                        />
                    </View>
                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>Incoming Text</Text>
                        <Input
                            placeholder="Incoming Text"
                            rightIcon={{ type: 'font-awesome', name: 'link' }}
                            value={webchatCustomize.incomingText}
                            onChangeText={value => onChangeCustomize('incomingText', value)}
                        />
                    </View>

                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>Outgoing Text Color</Text>
                        <ColorPickerModal
                            color={webchatCustomize.outgoingTextColor}
                            headerText="Outgoing Text Color"
                            isVisible={outgoingColorState}
                            setIsVisible={setOutgoingColorState}
                            saveColor={(color: string) => onChangeCustomize('outgoingTextColor', color)}
                        />
                        <Input
                            disabled
                            placeholder="Outgoing Text Color"
                            leftIcon={{ type: 'font-awesome', name: 'circle', color: webchatCustomize.outgoingTextColor }}
                            value={webchatCustomize.outgoingTextColor}
                            onPressIn={() => setOutgoingColorState(true)}
                        />
                    </View>
                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>Outgoing Text</Text>
                        <Input
                            placeholder="Outgoing Text"
                            rightIcon={{ type: 'font-awesome', name: 'link' }}
                            value={webchatCustomize.outgoingText}
                            onChangeText={value => onChangeCustomize('outgoingText', value)}
                        />
                    </View>

                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>Message Color</Text>
                        <ColorPickerModal
                            color={webchatCustomize.messageColor}
                            headerText="Message Color"
                            isVisible={messageColorState}
                            setIsVisible={setMessageColorState}
                            saveColor={(color: string) => onChangeCustomize('messageColor', color)}
                        />
                        <Input
                            placeholder="Message Color"
                            leftIcon={{ type: 'font-awesome', name: 'circle', color: webchatCustomize.messageColor }}
                            value={webchatCustomize.messageColor}
                            disabled
                            onPressIn={() => setMessageColorState(true)}
                        />
                    </View>

                    <View style={{ padding: 8 }}>
                        <Text style={styles.text}>Message Box Color</Text>
                        <ColorPickerModal
                            color={webchatCustomize.messageBoxColor}
                            headerText="Message Box Color"
                            isVisible={messageBoxColorState}
                            setIsVisible={setMessageBoxColorState}
                            saveColor={(color: string) => onChangeCustomize('messageBoxColor', color)}
                        />
                        <Input
                            placeholder="Message Box Color"
                            leftIcon={{ type: 'font-awesome', name: 'circle', color: webchatCustomize.messageBoxColor }}
                            value={webchatCustomize.messageBoxColor}
                            disabled
                            onPressIn={() => setMessageBoxColorState(true)}
                        />
                    </View>
                </Card>
            </ScrollView>
            <View style={{ padding: Platform.OS === "ios" ? 20 : 8, paddingBottom: Platform.OS === "ios" ? 30 : 8, marginRight: Dimensions.get('screen').width / 6, flexDirection: 'row' }}>
                <View style={{ flex: 2, paddingHorizontal: 2 }}>
                    <Button radius={10} onPress={saveChatState} color="#7f81ae">Save</Button>
                </View>
                <View style={{ flex: 2, marginLeft: 4 }}>
                    <Button radius={10} onPress={resetChatState} type="solid" color={"warning"}>Reset</Button>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    text: {
        paddingLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: 'gray',
    }
})

export default Settings;