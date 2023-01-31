import BusinessComponent from "@src/utils/functions/businessComponent";
import { useAppDispatch, useAppSelector } from "@src/utils/redux/hooks";
import { setModalVisible } from "@src/utils/redux/slice/mainSlice";
import { CtIconEnum } from "@src/utils/types";
import React, { useEffect, useRef, useState } from "react";
import { ChatModal, ChatModalRef } from "rn-sestek-webchat";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'react-native-fetch-blob';
import { Slider } from '@miblanchard/react-native-slider';
import { WebView } from 'react-native-webview';
import { PermissionsManager } from "@src/utils/functions/permissionsManager";
import { WebchatManager } from "@src/utils/functions/webchatManages";
import { Knovvu32 } from '@src/assests';

const WebchatModal = () => {
    const modalRef = useRef<ChatModalRef>(null);
    const webchat = useAppSelector(state => state.webchat);
    const color_200 = useAppSelector(state => state.theme.color_200);
    const color_300 = useAppSelector(state => state.theme.color_300);

    const dispatch = useAppDispatch();

    const [clientId, setClientId] = useState<string | undefined>();
    useEffect(() => {
        WebchatManager.getUniqueGuid().then((guid: string) => {
            setClientId(guid);
        })
    }, []);

    useEffect(() => {
        setTimeout(() => {
            dispatch(setModalVisible(modalRef?.current?.startConversation));
        }, 200);
    }, [webchat.url]);

    const audioClickFunc = () => {
        return new Promise<void>((resolve, reject) => {
            PermissionsManager.checkMicrophone().then(res => {
                if (res) {
                    resolve();
                }
                else {
                    reject();
                }
            }).catch(() => reject());

        })
    }

    console.log(clientId)

    return (
        <ChatModal
            url={webchat.url}
            modules={{ AudioRecorderPlayer: AudioRecorderPlayer, RNFS: RNFetchBlob, RNSlider: Slider, RNWebView: WebView }}
            ref={modalRef}
            defaultConfiguration={{
                sendConversationStart: true,
                tenant: webchat.tenant,
                projectName: webchat.project,
                channel: 'NdaInfoBip',
                clientId: clientId,
                customActionData: webchat.customActionData,
            }}
            customizeConfiguration={{
                headerColor: webchat.headerColor,
                headerText: webchat.headerText,
                bottomColor: webchat.bottomColor,
                bottomInputText: webchat.bottomText,
                //bottomVoiceIcon: "<Cmp />",
                //bottomSendIcon: "<Cmp />",
                incomingIcon: { type: 'uri', value: 'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png' },
                incomingText: webchat.incomingText,
                incomingTextColor: webchat.incomingTextColor,
                outgoingIcon: { type: 'component', value: Knovvu32 },
                outgoingText: webchat.outgoingText,
                outgoingTextColor: webchat.outgoingTextColor,
                messageColor: webchat.messageColor,
                messageBoxColor: webchat.messageBoxColor,
                //bodyColorOrImage: { type: 'image', value: 'https://i.pinimg.com/550x/4a/6f/59/4a6f59296f90c11d77744720ca10d1af.jpg' },
                bodyColorOrImage: { type: 'color', value: '#7f81ae' },
                //firsIcon: { type: 'component', value: require('@src/assests/knovvu_32.png') },
                //firstColor: 'white',
                //firstSize: 0,
                firstIconHide: true,
                hideIcon: () => BusinessComponent.getIconComponent(CtIconEnum.Ionicons, 'close-circle-sharp', 28, 'white'),
                closeIcon: () => BusinessComponent.getIconComponent(CtIconEnum.Ionicons, 'arrow-down-circle-sharp', 28, 'white'),
                leftMessageBoxColor: color_200,
                sliderMaximumTrackTintColor: 'gray',
                sliderThumbTintColor: color_300,
                sliderMinimumTrackTintColor: color_300,
                beforeAudioClick: audioClickFunc
            }}
        />
    )
}

export default WebchatModal;