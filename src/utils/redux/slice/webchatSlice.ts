import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebchatManager } from '@src/utils/functions/webchatManages';

export interface WebchatState {
    url: string,
    tenant: string,
    project: string,

    headerColor: string,
    headerText: string,
    bottomColor: string,
    bottomText: string,

    incomingText: string,
    incomingTextColor: string,
    outgoingText: string,
    outgoingTextColor: string,
    messageColor: string,
    messageBoxColor: string,
}


interface SetKeyValue {
    key: string;
    value: any;
}

const initialState: WebchatState = {
    url: "https://nd-test-webchat2.sestek.com/chathub",
    tenant: "BAC",
    project: "EN_BANKING_v1.0",

    headerColor: '#7f81ae',
    headerText: 'Knovvu Chat Client',
    bottomColor: '#7f81ae',
    bottomText: 'Input text..',

    incomingText: 'Test User',
    incomingTextColor: 'black',
    outgoingText: 'Knovvu Assistant',
    outgoingTextColor: '#7f81ae',
    messageColor: '#FCFBF7',
    messageBoxColor: '#7f81ae',
}

export const asyncGetWebchatData = createAsyncThunk(
    "webchat/asyncGetWebchatData",
    async () => {
        const data = await WebchatManager.getWebchatData();
        if (data?.url) {
            return data;
        }
        return null;
    }
);

export const asyncSetCustomizeConfiguration = createAsyncThunk(
    "webchat/asyncSetCustomizeConfiguration",
    async (data: WebchatState) => {
        await WebchatManager.setWebchatData(data);
        return data;
    }
);

export const asyncSetInitialState = createAsyncThunk(
    "webchat/asyncSetInitialState",
    async () => {
        var data = {
            url: "https://nd-test-webchat2.sestek.com/chathub",
            tenant: "BAC",
            project: "EN_BANKING_v1.0",

            headerColor: '#7f81ae',
            headerText: 'Knovvu Chat Client',
            bottomColor: '#7f81ae',
            bottomText: 'Input text..',

            incomingText: 'Test User',
            incomingTextColor: 'black',
            outgoingText: 'Knovvu Assistant',
            outgoingTextColor: '#7f81ae',
            messageColor: '#FCFBF7',
            messageBoxColor: '#7f81ae',
        };
        await WebchatManager.setWebchatData(data);
        return data;
    }
);

const setStateWebchat = (state: WebchatState, data: WebchatState) => {
    state.url = data.url;
    state.tenant = data.tenant;
    state.project = data.project;
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
}

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
        setInitialState: (state) => {
            state.url = "https://nd-test-webchat2.sestek.com/chathub";
            state.tenant = "BAC",
                state.project = "EN_BANKING_v1.0",
                state.headerColor = '#7f81ae';
            state.headerText = 'Knovvu Chat Client';
            state.bottomColor = '#7f81ae';
            state.bottomText = 'Input text..';
            state.incomingText = 'Test User';
            state.incomingTextColor = 'black';
            state.outgoingText = 'Knovvu Assistant';
            state.outgoingTextColor = '#7f81ae';
            state.messageColor = '#FCFBF7';
            state.messageBoxColor = '#7f81ae';
        },
        setCustomizeConfiguration: (state, action: PayloadAction<SetKeyValue>) => {
            (state as any)[action.payload.key] = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                asyncGetWebchatData.fulfilled,
                (state, action: PayloadAction<WebchatState | null>) => {
                    if (action.payload) {
                        setStateWebchat(state, action.payload);
                    }
                }
            )
            .addCase(
                asyncSetCustomizeConfiguration.fulfilled,
                (state, action: PayloadAction<WebchatState>) => {
                    setStateWebchat(state, action.payload);
                }
            )
            .addCase(
                asyncSetInitialState.fulfilled,
                (state, action: PayloadAction<WebchatState>) => {
                    setStateWebchat(state, action.payload);
                }
            );
    },
})

export const { setUrl, setTenant, setProject, setInitialState, setCustomizeConfiguration } = webchatSlice.actions

export default webchatSlice.reducer