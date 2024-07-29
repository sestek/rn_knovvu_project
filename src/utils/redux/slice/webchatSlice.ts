import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {WebchatManager} from '@src/utils/functions/webchatManages';

export interface WebchatState {
  url: string;
  tenant: string;
  project: string;
  customActionData: any;
  isMicEnabled: any;
  personaId: string;
  enableNdUi :boolean;
  channel:string;

  headerColor: string;
  headerText: string;
  headerTextColor: string;

  bottomColor: string;
  bottomText: string;

  incomingText: string;
  incomingTextColor: string;
  outgoingText: string;
  outgoingTextColor: string;
  messageColor: string;
  messageBoxColor: string;

  ///new Redux
  bottomInputText: string;
  bottomInputBorderColor: string;
  bottomInputSendButtonColor: string;
  userMessageBoxBackground: string;
  userMessageBoxTextColor: string;

  userMessageBoxHeaderName: string;
  userMessageBoxHeaderNameColor: string;
  userMessageIcon:string;
  chatBotMessageBoxIcon:string;
  chatBotMessageBoxBackground: string;
  chatBotMessageBoxTextColor: string;
  chatBotMessageBoxHeaderName: string;
  chatBotMessageBoxHeaderNameColor: string;
  chatBotMessageBoxButtonBackground: string;
  chatBotMessageBoxButtonTextColor: string;
  chatBotMessageBoxButtonBorderColor: string;
  chatBody: string;
  chatBodyImage:boolean;
  sliderMaximumTrackTintColor: string;
  sliderThumbTintColor: string;
  sliderMinimumTrackTintColor: string;
  headerAlignmentType:HeaderAlignmentType;
  titleFontSize:number;
  subtitleFontSize:number;
  descriptionFontSize:number;
  dateFormat:DateFormatType;

  autoPlayAudio:boolean
  useLegacyProduct:boolean;
  clientId:string;

  ///closeModal
  cmsUse : boolean;
  cmsText:string;
  cmsTextColor: string;
  cmsBackground : string;
  cmsYesButtonText: string;
  cmsYesButtonTextColor: string;
  cmsYesButtonBackground: string;
  cmsYesButtonBorderColor: string;
  cmsNoButtonText: string;
  cmsNoButtonTextColor: string;
  cmsNoButtonBackground: string;
  cmsNoButtonBorderColor: string;

}

interface SetKeyValue {
  key: string;
  value: any;
}

type HeaderAlignmentType = 'textToLeft' | 'textToRight' | 'textToCenter';

type DateFormatType = 'short' | 'long' ;

const initialState: WebchatState = {
  url: 'https://eu.va.knovvu.com/webchat/chathub',
  tenant: 'internal',
  project: 'Knovvu_Bot',
  isMicEnabled: 'false',
  personaId: '',
  customActionData: '',
  enableNdUi : false,
  channel:'mobil',

  // enableNdUi : false,

  /// new redux
  headerColor: '#863CEB',
  headerText: 'Knovvu',
  headerTextColor: '#FCFBF7',
  bottomColor: 'white',
  bottomInputText: 'Type a message',
  bottomInputBorderColor: '#d5d5d5',
  bottomInputSendButtonColor: '#7743DB',
  userMessageBoxBackground: '#863CEB',
  userMessageBoxTextColor: 'white',

  userMessageBoxHeaderName: '',
  userMessageBoxHeaderNameColor: 'white',
  userMessageIcon: "",
  chatBotMessageBoxIcon:"",
  chatBotMessageBoxBackground: '#EFEFEF',
  chatBotMessageBoxTextColor: 'black',
  chatBotMessageBoxHeaderName: 'Knovvu',
  chatBotMessageBoxHeaderNameColor: 'black',
  chatBotMessageBoxButtonBackground: 'white',
  chatBotMessageBoxButtonTextColor: 'black',
  chatBotMessageBoxButtonBorderColor: '#863CEB',
  chatBody: 'white',
  chatBodyImage:false,
  sliderMaximumTrackTintColor: '#8c8c8c',
  sliderThumbTintColor: '#C3ACD0',
  sliderMinimumTrackTintColor: '#C3ACD0',
  headerAlignmentType:'textToCenter',
  autoPlayAudio:false,
  useLegacyProduct:false,
  clientId:'',

  
 
  cmsUse : true,
  cmsText: "Are you sure you want to leave the chat?",
  cmsTextColor: 'black',
  cmsBackground : 'white',
  cmsYesButtonText: 'Yes',
  cmsYesButtonTextColor: 'white',
  cmsYesButtonBackground: '#863CEB',
  cmsYesButtonBorderColor: 'transparent',
  cmsNoButtonText: 'No',
  cmsNoButtonTextColor: 'black',
  cmsNoButtonBackground: 'transparent',
  cmsNoButtonBorderColor: '#863CEB',
  titleFontSize:18,
  subtitleFontSize:16,
  descriptionFontSize:13,
  dateFormat:'long',
};

export const asyncGetWebchatData = createAsyncThunk(
  'webchat/asyncGetWebchatData',
  async () => {
    const data = await WebchatManager.getWebchatData();
    if (data?.url) {
      return data;
    }
    return null;
  },
);

export const asyncSetCustomizeConfiguration = createAsyncThunk(
  'webchat/asyncSetCustomizeConfiguration',

  async (data: WebchatState) => {
    await WebchatManager.setWebchatData(data);
    return data;
  },
);

export const asyncSetInitialState = createAsyncThunk(
  'webchat/asyncSetInitialState',
  async () => {
    await WebchatManager.setWebchatData(initialState);
    return initialState;
  },
);

const setStateWebchat = (state: WebchatState, data: WebchatState) => {
  state.url = data.url;
  state.tenant = data.tenant;
  state.project = data.project;
  state.customActionData = data.customActionData;
  state.enableNdUi = data.enableNdUi;
  state.channel= data.channel;
  state.headerColor = data.headerColor;
  state.headerText = data.headerText;
  state.bottomColor = data.bottomColor;
  state.bottomText = data.bottomText;
  state.incomingText = data.incomingText;
  state.incomingTextColor = data.incomingTextColor;
  state.outgoingText = data.outgoingText;
  state.outgoingTextColor = data.outgoingTextColor;
  state.messageColor = data.messageColor;
  state.messageBoxColor = data.messageBoxColor;
  state.personaId = data.personaId;
  state.isMicEnabled = data.isMicEnabled;

 state.headerTextColor = data.headerTextColor;
  state.bottomColor = data.bottomColor;
  state.bottomInputText = data.bottomInputText;
  state.bottomInputBorderColor = data.bottomInputBorderColor;
  state.bottomInputSendButtonColor = data.bottomInputSendButtonColor;
  state.userMessageBoxBackground = data.userMessageBoxBackground;
  state.userMessageBoxTextColor = data.userMessageBoxTextColor;

  state.userMessageBoxHeaderName = data.userMessageBoxHeaderName;
  state.userMessageBoxHeaderNameColor = data.userMessageBoxHeaderNameColor;
  state.userMessageIcon = data.userMessageIcon;
  state.chatBotMessageBoxIcon = data.chatBotMessageBoxIcon;
  state.chatBotMessageBoxBackground = data.chatBotMessageBoxBackground;
  state.chatBotMessageBoxTextColor = data.chatBotMessageBoxTextColor;
  state.chatBotMessageBoxHeaderName = data.chatBotMessageBoxHeaderName;
  state.chatBotMessageBoxHeaderNameColor = data.chatBotMessageBoxHeaderNameColor;
  state.chatBotMessageBoxButtonBackground = data.chatBotMessageBoxButtonBackground;
  state.chatBotMessageBoxButtonTextColor = data.chatBotMessageBoxButtonTextColor;
  state.chatBotMessageBoxButtonBorderColor = data.chatBotMessageBoxButtonBorderColor;
  state.chatBody = data.chatBody;
  state.chatBodyImage = data.chatBodyImage;
  state.sliderMaximumTrackTintColor = data.sliderMaximumTrackTintColor;
  state.sliderThumbTintColor = data.sliderThumbTintColor;
  state.sliderMinimumTrackTintColor = data.sliderMinimumTrackTintColor;
  state.headerAlignmentType = data.headerAlignmentType;
  state.autoPlayAudio = data.autoPlayAudio;
  state.useLegacyProduct = data.useLegacyProduct;
  state.clientId = data.clientId;

  state.cmsUse = data.cmsUse;
  state.cmsText = data.cmsText;
  state.cmsTextColor = data.cmsTextColor;
  state.cmsBackground = data.cmsBackground;
  state.cmsYesButtonText= data.cmsYesButtonText;
  state.cmsYesButtonTextColor = data.cmsYesButtonTextColor;
  state.cmsYesButtonBackground = data.cmsYesButtonBackground;
  state.cmsYesButtonBorderColor = data.cmsYesButtonBorderColor;
  state.cmsNoButtonText = data.cmsNoButtonText;
  state.cmsNoButtonTextColor = data.cmsNoButtonTextColor
  state.cmsNoButtonBackground = data.cmsNoButtonBackground;
  state.cmsNoButtonBorderColor = data.cmsNoButtonBorderColor;
  state.titleFontSize = data.titleFontSize;
  state.subtitleFontSize = data.subtitleFontSize;
  state.descriptionFontSize = data.descriptionFontSize;
  state.dateFormat = data.dateFormat;

};

export const webchatSlice = createSlice({
  name: 'webchat',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setTenant: (state, action: PayloadAction<string>) => {
      state.tenant = action.payload;
    },
    setProject: (state, action: PayloadAction<string>) => {
      state.project = action.payload;
    },
    setInitialState: state => {
      state.url = 'https://eu.va.knovvu.com/webchat/chathub';
      state.tenant = 'internal';
      state.project = 'Knovvu_Bot';
      state.customActionData = '';
      state.headerColor = '#7f81ae';
      state.bottomColor = '#7f81ae';
      state.incomingText = 'Test User';
      state.incomingTextColor = 'black';
      state.outgoingText = 'Knovvu Virtual Agent';
      state.outgoingTextColor = '#7f81ae';
      state.messageColor = '#FCFBF7';
      state.messageBoxColor = '#7f81ae';
      state.headerAlignmentType = 'textToCenter'
      state.titleFontSize = 18;
      state.subtitleFontSize = 16;
      state.descriptionFontSize = 13;
      state.headerText = 'Knovvu';
      state.bottomInputText = 'Type a message';
      state.cmsText = 'Are you sure you want to exit chat?';
      state.cmsYesButtonText = 'Yes';
      state.cmsNoButtonText ='No';
      state.dateFormat='long'
    },
    setCustomizeConfiguration: (state, action: PayloadAction<SetKeyValue>) => {
      (state as any)[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        asyncGetWebchatData.fulfilled,
        (state, action: PayloadAction<WebchatState | null>) => {
          if (action.payload) {
            setStateWebchat(state, action.payload);
          }
        },
      )
      .addCase(
        asyncSetCustomizeConfiguration.fulfilled,
        (state, action: PayloadAction<WebchatState>) => {
          setStateWebchat(state, action.payload);
        },
      )
      .addCase(
        asyncSetInitialState.fulfilled,
        (state, action: PayloadAction<WebchatState>) => {
          setStateWebchat(state, action.payload);
        },
      );
  },
});

export const {
  setUrl,
  setTenant,
  setProject,
  setInitialState,
  setCustomizeConfiguration,
} = webchatSlice.actions;

export default webchatSlice.reducer;
