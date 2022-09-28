import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebchatState } from "../redux/slice/webchatSlice";


export class WebchatManager {

    static async removeWebchatData() {
        await AsyncStorage.removeItem("webchat");
    }

    static async getWebchatData(): Promise<WebchatState> {
        const asyncWebchatData = await AsyncStorage.getItem("webchat");
        const parseWebchatData = JSON.parse(asyncWebchatData || "{}") as WebchatState;
        return parseWebchatData;
    }

    static async setWebchatData(webchatData: WebchatState) {
        await AsyncStorage.setItem("webchat", JSON.stringify(webchatData));
    }
}