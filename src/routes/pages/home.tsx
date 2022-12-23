import { Button, Card, Text } from "@rneui/base";
import { KnovvuBackground, LottieVoice } from "@src/assests";
import { useAppSelector } from "@src/utils/redux/hooks";
import React, {  useState } from "react";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import Lottie from 'lottie-react-native';
import BusinessComponent from "@src/utils/functions/businessComponent";
import { CtIconEnum } from "@src/utils/types";
import { C_Avaya, C_Five9, C_GarantiBBVA, C_Genesys, C_Groupama, C_Hepsiburada, C_IngBANK, C_TurkTelekom, C_VakıfBank, C_Vodafone } from '@src/assests';
import YoutubeIframeModal from "@src/components/youtubeIframeModal";
import SwiperText  from "@src/components/swiperText";

const customer_image = [C_Avaya, C_Five9, C_GarantiBBVA, C_Genesys, C_Groupama, C_Hepsiburada, C_IngBANK, C_TurkTelekom, C_VakıfBank, C_Vodafone];

const whyKnovvu = [
    { title: `We deliver.Period.`, body: 'With our 22 years of experience, we are proud of our project delivery rate of 100%.' },
    { title: 'Market-leading performance.', body: 'Our speech recognition accuracy rate is >95% in real world environment. Higher rate of accuracy means better insights from customer conversations.' },
    { title: 'We are cloud-agnostic.', body: 'On-premise, on public cloud or on private cloud, our solutions are ready to be deployed anywhere.' },
    { title: 'Not only high tech but high touch.', body: 'We are always in close contact with our customers to understand their pain points better and tailor our solutions to fit their needs perfectly.' },
    { title: '100% Ownership of Technology.', body: 'With our +100 R&D staff, we develop all of our products and core technologies in-house.' },
    { title: 'True Omnichannel Experience.', body: 'Not only for the customers but also for the business units involved, we provide a scalable, omnichannel, end to end conversational platform.' },
];

const Home = ({ navigation }) => {

    const {color_100, color_200, color_300, color_400} = useAppSelector(state => state.theme);

    const [openYoutube, setOpenYoutube] = useState<boolean>(false);
    const triggerYoutube = () => setOpenYoutube(old => !old);

    return (
        <ScrollView>
            <View style={styles.extarnalView}>
                <YoutubeIframeModal open={openYoutube} setOpen={triggerYoutube} />
                <Lottie source={LottieVoice} speed={0.2} autoPlay loop style={{ height: Dimensions.get('screen').height * 0.07, marginBottom: 20 }} />
                <Text h4 h4Style={{ ...styles.text, ...styles.textHome }}>Know Your Customers.</Text>
                <Text h4 h4Style={{ ...styles.text, ...styles.textHome }}>Know Your Agents.</Text>
                <Text h4 h4Style={{ ...styles.text, ...styles.textHome, fontWeight: '900' }}>and <SwiperText texts={['Emotions', 'Requests', 'Everything', 'Problems', 'Conversations']} /> in Between.</Text>
                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                <Text>{"\n"}</Text>
                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <Button type="solid" color={color_300} containerStyle={{ marginRight: 10, borderRadius: 200 }} onPress={triggerYoutube} testID="youtube">
                        {BusinessComponent.getIconComponent(CtIconEnum.FontAwesome, 'play', 32, 'white')}
                    </Button>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: color_400 }} h4Style={styles.font500} h4>WHAT IS KNOVVU?</Text>
                        <Text h4 h4Style={{ fontSize: 19, fontWeight: '400' }}>Watch our movie</Text>
                    </View>
                </View>
                 <View style={styles.knovvuImage}>
                    <Image source={KnovvuBackground} style={{ width: Dimensions.get('window').width, height: 360 }} resizeMode="cover" />
                </View> 
            </View>
           <View style={[styles.mainContainer, { backgroundColor: 'white' }]}>
                <Lottie source={LottieVoice} speed={0.2} autoPlay loop style={{ height: Dimensions.get('screen').height * 0.07, marginBottom: 20 }} />
                <Text style={{ color: color_400 }} h4Style={styles.font500} h4>OUR CUSTOMERS</Text>
                <Text h4 h4Style={{ ...styles.text, ...styles.textHome }}>Leading companies trust our conversational technologies</Text>
            </View>
            <View style={styles.imageContainer}>
                {customer_image.map((customer,index) => <Image key={index} source={customer} style={styles.imageStyle} resizeMode="contain" />)}
            </View>
            <View style={[styles.mainContainer, { backgroundColor: color_100 }]}>
                <Lottie source={LottieVoice} speed={0.2} autoPlay loop style={{ height: Dimensions.get('screen').height * 0.05, marginBottom: 20 }} />
                <Text style={{ color: 'white' }} h4Style={styles.font500} h4>WHY KNOVVU ? {'\n'}</Text>
                <Text h4 style={{ color: 'white' }} h4Style={{ ...styles.text, ...styles.textHome }}>Why global brands are</Text>
                <Text h4 style={{ color: color_200 }} h4Style={{ ...styles.text, ...styles.textHome }}>choosing Knovvu</Text>
                <View style={styles.rowWrapContainer}>
                    {whyKnovvu.map((data,index) =>
                        <Card key={index} containerStyle={{ width: Dimensions.get('screen').width * 0.4 + 15, margin: 2, backgroundColor: 'rgba(24,28,42,0.38)', borderRadius: 4, borderColor: 'rgba(127,129,174,0.3)' }}>
                            <Card.Title style={{ color: color_200 }}>{data.title}</Card.Title>
                            <Text style={{ color: 'white' }} h4Style={styles.font500}>{data.body}</Text>
                        </Card>
                    )}

                </View>
            </View> 
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: '700',
        fontStyle: 'normal',
        fontSize: 18,
        lineHeight: 28,
    },
    font500: {
        marginBottom: 4, fontSize: 11, fontWeight: '500'
    },
    textHome: {
        marginBottom: 8
    },
    mainContainer: {
        flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center',
    },
    rowWrapContainer: {
        flex: 1, flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'
    },
    imageContainer: {
        flex: 1, padding: 20, backgroundColor: 'white', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'
    },
    imageStyle: {
        height: 40, maxWidth: 120, margin: 20
    },
    extarnalView:{
        flex: 1, 
        padding: 20, 
        backgroundColor: 'white'
    },
    knovvuImage:{
        position: 'absolute', 
        bottom: 0, 
        zIndex: -1, 
        marginTop: 400
    }
})

export default Home;
