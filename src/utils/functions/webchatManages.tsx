import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebchatState } from "../redux/slice/webchatSlice";
import BusinessComponent from "./businessComponent";


export class WebchatManager {

    static MOBILE_GUID = "mobile-guid";
    static WEBCHAT = "webchat";

    static async removeWebchatData() {
        await AsyncStorage.removeItem(this.WEBCHAT);
    }

    static async getWebchatData(): Promise<WebchatState> {
        const asyncWebchatData = await AsyncStorage.getItem(this.WEBCHAT);
        const parseWebchatData = JSON.parse(asyncWebchatData || "{}") as WebchatState;
        return parseWebchatData;
    }

    static async setWebchatData(webchatData: WebchatState) {
        await AsyncStorage.setItem(this.WEBCHAT, JSON.stringify(webchatData));
    }

    static async getUniqueGuid(): Promise<string> {
        const mobileGuid = await AsyncStorage.getItem(this.MOBILE_GUID);
        if (!mobileGuid) {
            var newGuid = BusinessComponent.createGuid();
            await AsyncStorage.setItem(this.MOBILE_GUID, newGuid);
            return newGuid;
        }
        return mobileGuid;
    }
}