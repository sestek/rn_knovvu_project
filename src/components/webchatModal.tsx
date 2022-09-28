import BusinessComponent from "@src/utils/functions/businessComponent";
import { useAppSelector } from "@src/utils/redux/hooks";
import { CtIconEnum } from "@src/utils/types";
import React, { useRef } from "react";
import { ChatModal, ChatModalRef } from "rn-sestek-webchat";


const WebchatModal = () => {
    const modalRef = useRef<ChatModalRef>(null);

    const webchat = useAppSelector(state => state.webchat);

    return (
        <ChatModal
            url={webchat.url}
            modules={{ AudioRecorderPlayer: undefined, RNFS: undefined }}
            ref={modalRef}
            defaultConfiguration={{
                sendConversationStart: true,
                tenant: webchat.tenant,
                projectName: webchat.project,
                channel: 'Nda',
                clientId: "mobile-testing",
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
                //outgoingIcon: { type: 'component', value: require('./images/knovvu_logo.png') },
                outgoingText: webchat.outgoingText,
                outgoingTextColor: webchat.outgoingTextColor,
                messageColor: webchat.messageColor,
                messageBoxColor: webchat.messageBoxColor,
                //bodyColorOrImage: { type: 'image', value: 'https://i.pinimg.com/550x/4a/6f/59/4a6f59296f90c11d77744720ca10d1af.jpg' },
                bodyColorOrImage: { type: 'color', value: '#7f81ae' },
                firsIcon: { type: 'component', value: require('@src/assests/knovvu_32.png') },
                firstColor: 'white',
                firstSize: 70,
                hideIcon: () => BusinessComponent.getIconComponent(CtIconEnum.Ionicons, 'close-circle-sharp', 28, 'white'),
                closeIcon: () => BusinessComponent.getIconComponent(CtIconEnum.Ionicons, 'arrow-down-circle-sharp', 28, 'white'),
            }}
        />
    )
}

export default WebchatModal;