import { Input, Text, Button } from "@rneui/base";
import Knovvu from "@src/api/knovvu";
import BusinessComponent from "@src/utils/functions/businessComponent";
import { useAppSelector } from "@src/utils/redux/hooks";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";


interface TContantData {
    name: string;
    surname: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    message: string;
}

const initializeData: TContantData = {
    "name": "",
    "surname": "",
    "companyName": "",
    "email": "",
    "phoneNumber": "",
    "message": ""
};

const ContactUs = ({ navigation }) => {

    const color_300 = useAppSelector(state => state.theme.color_300);
    const color_100 = useAppSelector(state => state.theme.color_100);
    const color_400 = useAppSelector(state => state.theme.color_400);

    const [contactData, setContactData] = useState<TContantData>(initializeData);
    const [errorContactData, setErrorContactData] = useState<TContantData>(initializeData);

    const onChangeContactData = (key: string, value: string) => {
        const newObj = Object.assign({}, contactData);
        (newObj as any)[key] = value;
        setContactData(newObj);
    }

    const checkErrorData = (): boolean => {
        const newObj = Object.assign({}, errorContactData);
        Object.keys(contactData).forEach((value: string) => {
            if (!(contactData as any)[value]) {
                (newObj as any)[value] = `The ${BusinessComponent.capitalizeFirstLetter(value)} field cannot be left blank.`;
            }
            else {
                (newObj as any)[value] = "";
            }
        });
        if (!newObj.phoneNumber && contactData.phoneNumber.length > 12) {
            newObj.phoneNumber = `The Phone Number field must be a maximum of 12 characters.`;
        }
        if (!newObj.message && contactData.message.length > 500) {
            newObj.phoneNumber = `The Message field must be a maximum of 500 characters.`;
        }
        if (!newObj.email && !BusinessComponent.validateEmail(contactData.email)) {
            newObj.email = `You must enter a valid e-mail address.`;
        }

        setErrorContactData(newObj);

        let checker = false;
        Object.keys(newObj).forEach((value: string) => {
            if ((newObj as any)[value]) {
                checker = true;
                return;
            }
        });
        return checker;
    }

    const sendContactData = async () => {
        if (!checkErrorData()) {
            var data = await Knovvu.postContactEmail(contactData);
            console.log(data);
            if (data?.statusCode === 200) {
                setErrorContactData(initializeData);
                setContactData(initializeData);
                showMessage({
                    backgroundColor: '#7f81ae',
                    description: Array.isArray(data.message) ? data.message[0] : data.message,
                    message: 'Success'
                });
            }
            else if (data?.error) {
                showMessage({
                    backgroundColor: '#7f81ae',
                    description: Array.isArray(data.error) ? data.error[0] : data.error,
                    message: 'Error'
                });
            }
        }

    }

    return (
        <ScrollView style={{ flex: 1, paddingTop: 30, paddingHorizontal: 15 }}>
            <View style={{ marginBottom: 50 }}>
                <Text h4 style={{ color: color_300, paddingBottom: 10 }}>Contact Us</Text>
                <View style={{ padding: 4 }}>
                    <Text style={styles.text}>Name</Text>
                    <Input
                        placeholder="Name"
                        value={contactData.name}
                        onChangeText={value => onChangeContactData('name', value)}
                        errorMessage={errorContactData.name}
                    />
                </View>
                <View style={{ padding: 4 }}>
                    <Text style={styles.text}>Surname</Text>
                    <Input
                        placeholder="Surname"
                        value={contactData.surname}
                        onChangeText={value => onChangeContactData('surname', value)}
                        errorMessage={errorContactData.surname}
                    />
                </View>
                <View style={{ padding: 4 }}>
                    <Text style={styles.text}>Company Name</Text>
                    <Input
                        placeholder="Company Name"
                        value={contactData.companyName}
                        onChangeText={value => onChangeContactData('companyName', value)}
                        errorMessage={errorContactData.companyName}
                    />
                </View>
                <View style={{ padding: 4 }}>
                    <Text style={styles.text}>Email</Text>
                    <Input
                        placeholder="Email"
                        value={contactData.email}
                        onChangeText={value => onChangeContactData('email', value)}
                        errorMessage={errorContactData.email}
                    />
                </View>
                <View style={{ padding: 4 }}>
                    <Text style={styles.text}>Phone Number</Text>
                    <Input
                        placeholder="Phone Number"
                        value={contactData.phoneNumber}
                        onChangeText={value => onChangeContactData('phoneNumber', value)}
                        errorMessage={errorContactData.phoneNumber}
                    />
                </View>
                <View style={{ padding: 4 }}>
                    <Text style={styles.text}>Message</Text>
                    <Input
                        placeholder="Message"
                        value={contactData.message}
                        multiline
                        onChangeText={value => onChangeContactData('message', value)}
                        errorMessage={errorContactData.message}
                    />
                </View>
                <Button radius={10} onPress={sendContactData} type="solid" color={"warning"}>Send</Button>
            </View>
        </ScrollView>
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

export default ContactUs;
