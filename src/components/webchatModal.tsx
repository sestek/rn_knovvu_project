import {useAppDispatch, useAppSelector} from '@src/utils/redux/hooks';
import {setModalVisible} from '@src/utils/redux/slice/mainSlice';
import React, {useEffect, useRef, useState} from 'react';
import {ChatModal} from 'rn-sestek-webchat';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'react-native-fetch-blob';
import {Slider} from '@miblanchard/react-native-slider';
import {WebView} from 'react-native-webview';
import {PermissionsManager} from '@src/utils/functions/permissionsManager';
import {WebchatManager} from '@src/utils/functions/webchatManages';
import {
  BotPause,
  BotPlay,
  Knovvu32,
  ModalClose,
  ModalMinus,
  ModalPause,
  ModalPlay,
} from '@src/assests';
import AudioRecord from 'react-native-audio-record';
import DocumentPicker from 'react-native-document-picker';
interface WebchatModalProps {
  modalRef: any;
}
const WebchatModal = (props: WebchatModalProps) => {
  const webchat = useAppSelector(state => state.webchat);
  const color_200 = useAppSelector(state => state.theme.color_200);
  const color_300 = useAppSelector(state => state.theme.color_300);

  const {modalRef} = props;

  const dispatch = useAppDispatch();

  const [clientId, setClientId] = useState<string | undefined>();
  useEffect(() => {
    WebchatManager.getUniqueGuid().then((guid: string) => {
      setClientId(guid);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setModalVisible(modalRef?.current?.startConversation));
    }, 200);
  }, [webchat.url]);

  const audioClickFunc = () => {
    return new Promise<void>((resolve, reject) => {
      PermissionsManager.checkMicrophone()
        .then(res => {
          if (res) {
            resolve();
          } else {
            reject();
          }
        })
        .catch(() => reject());
    });
  };

  const [responseData, setResponseData] = useState<any>({});
  const setResponse = (value: any) => {
    setResponseData(value);
  };
  return (
    <ChatModal
      url={webchat.url}
      modules={{
        AudioRecorderPlayer: AudioRecorderPlayer,
         RNFS: RNFetchBlob,
        RNSlider: Slider,
        RNWebView: WebView,
        Record: AudioRecord,
        RNFileSelector: DocumentPicker,
      }}
      ref={modalRef}
      defaultConfiguration={{
        sendConversationStart: true,
        tenant: webchat.tenant,
        projectName: webchat.project,
        channel: 'Mobil',
        clientId: 'mobile-testing',
        // enableNdUi: false,
        getResponseData: setResponse,
        customActionData: webchat.customActionData,
      }}
      customizeConfiguration={{
        // Header
        headerColor: webchat.headerColor,
        headerText: webchat.headerText,
        headerTextColor: webchat.headerTextColor,
        headerHideIcon: {
          type: 'component',
          value: ModalMinus,
        },
        headerCloseIcon: {
          type: 'component',
          value: ModalClose,
        },
        headerAlignmentType: webchat?.headerAlignmentType,
        chatBotCarouselSettings: {
          // nexButtonIcon: {
          //   type: 'component',
          //   value: require('./example.png'),
          // },
          // prevButtonIcon: {
          //   type: 'component',
          //   value: require('./example.png'),
          // },
          buttonGroup: {
            borderColor:  webchat.chatBotMessageBoxButtonBorderColor,
            backgroundColor: webchat.chatBotMessageBoxButtonBackground,
            textColor:  webchat.chatBotMessageBoxButtonTextColor,
          },
        },
        // Bottom
        bottomColor: webchat.bottomColor,
        bottomInputText: webchat.bottomInputText,
        bottomInputBorderColor: webchat.bottomInputBorderColor,
        bottomInputSendButtonColor: webchat.bottomInputSendButtonColor,
        // User MessageBox
        userMessageBoxBackground: webchat.userMessageBoxBackground,
        userMessageBoxTextColor: webchat.userMessageBoxTextColor,
        // userMessageBoxIcon: {
        //   type: 'uri',
        //   value: '',
        // },
        userMessageBoxHeaderName: webchat.userMessageBoxHeaderName,
        userMessageBoxHeaderNameColor: webchat.userMessageBoxHeaderNameColor,
        // ChatBot MessageBox
        chatBotMessageBoxBackground: webchat.chatBotMessageBoxBackground,
        chatBotMessageBoxTextColor: webchat.chatBotMessageBoxTextColor,
        chatBotMessageIcon: {
          type: webchat.chatBotMessageBoxIcon ? 'uri' : 'component',
          value: webchat.chatBotMessageBoxIcon
            ? webchat.chatBotMessageBoxIcon
            : Knovvu32,
        },
        chatBotMessageBoxHeaderName: webchat.chatBotMessageBoxHeaderName,
        chatBotMessageBoxHeaderNameColor:
          webchat.chatBotMessageBoxHeaderNameColor,
        chatBotMessageBoxButtonBackground:
          webchat.chatBotMessageBoxButtonBackground,
        chatBotMessageBoxButtonTextColor:
          webchat.chatBotMessageBoxButtonTextColor,
        chatBotMessageBoxButtonBorderColor:
          webchat.chatBotMessageBoxButtonBorderColor,
        // Chat Body
        chatBody: {type: 'color', value: webchat.chatBody},
        chatStartButtonHide: true,

        fontSettings:{
          titleFontSize:webchat.titleFontSize,
          subtitleFontSize:webchat.subtitleFontSize,
          descriptionFontSize: webchat.descriptionFontSize,
        },
        // Slider

        audioSliderSettings: {
          userSliderMinimumTrackTintColor: webchat.sliderMinimumTrackTintColor,
          userSliderMaximumTrackTintColor: webchat.sliderMaximumTrackTintColor,
          userSliderThumbTintColor: webchat.sliderThumbTintColor,
          userSliderPlayImage: {
            type: 'component',
            value: ModalPlay,
          },
          userSliderPauseImage: {
            type: 'component',
            value: ModalPause,
          },
          //bot
          botSliderMinimumTrackTintColor:webchat.sliderMinimumTrackTintColor,
          botSliderMaximumTrackTintColor: webchat.sliderMaximumTrackTintColor,
          botSliderThumbTintColor: webchat.sliderThumbTintColor,
          botSliderPlayImage: {
            type: 'component',
            value: BotPlay,
          },
          botSliderPauseImage: {
            type: 'component',
            value: BotPause,
          },
        },
        // sliderMaximumTrackTintColor: webchat.sliderMaximumTrackTintColor,
        // sliderThumbTintColor: webchat.sliderThumbTintColor,
        // sliderMinimumTrackTintColor: webchat.sliderMinimumTrackTintColor,
        // sliderPauseImage: {
        //   type: 'component',
        //   value: ModalPause,
        // },
        // sliderPlayImage: {
        //   type: 'component',
        //   value: ModalPlay,
        // },
        // Before Func
        permissionAudioCheck: audioClickFunc,
        // Close Modal
        closeModalSettings: {
          use: webchat.cmsUse,
          text: webchat.cmsText,
          textColor: webchat.cmsTextColor,
          background: webchat.cmsBackground,
          buttons: {
            yesButton: {
              text: webchat.cmsYesButtonText,
              textColor: webchat.cmsYesButtonTextColor,
              background: webchat.cmsYesButtonBackground,
              borderColor: webchat.cmsYesButtonBorderColor,
            },
            noButton: {
              text: webchat.cmsNoButtonText,
              textColor: webchat.cmsNoButtonTextColor,
              background: webchat.cmsNoButtonBackground,
              borderColor: webchat.cmsNoButtonBorderColor,
            },
          },
        },
      }}
    />
  );
};

export default WebchatModal;
