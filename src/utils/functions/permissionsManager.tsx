import { request, check, Permission, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import { Platform } from 'react-native';
import { showMessage } from "react-native-flash-message";

export class PermissionsManager {

    static addMessage(message: string, description: string, backgroundColor: string = "#7f81ae") {
        showMessage({
            backgroundColor,
            description,
            message
        });
    }

    static async checkMicrophone(): Promise<boolean> {
        let result: boolean = false;
        if (Platform.OS === 'android') {
            result = await this.checkAndroid(PERMISSIONS.ANDROID.RECORD_AUDIO);
        }
        else if (Platform.OS === "ios") {
            result = await this.checkIOS(PERMISSIONS.IOS.MICROPHONE);
        }
        return result;
    }

    static checkIOS(permissionType: Permission) {
        return new Promise<boolean>((resolve) => {
            check(permissionType)
                .then(async (result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            this.addMessage('Warning', 'This feature is not available (on this device / in this context)');
                            resolve(false);
                            break;
                        case RESULTS.BLOCKED:
                        case RESULTS.LIMITED:
                            openSettings();
                            resolve(false);
                            break;
                        case RESULTS.GRANTED:
                            resolve(true);
                            break;
                        case RESULTS.DENIED:
                            const res = await this.requestIOS(permissionType);
                            resolve(res);
                            break;
                    }
                })
                .catch((error) => {
                    this.addMessage('Error', error);
                    resolve(false);
                });
        });
    }

    static requestIOS(permissionType: Permission) {
        return new Promise<boolean>((resolve) => {
            request(permissionType).then(async (result) => {
                switch (result) {
                    case RESULTS.GRANTED:
                        resolve(true);
                        break;
                    case RESULTS.BLOCKED:
                        openSettings();
                        resolve(false);
                        break;
                }
            });
        });
    }

    static checkAndroid(permissionType: Permission) {
        return new Promise<boolean>((resolve) => {
            check(permissionType)
                .then(async (result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            this.addMessage('Warning', 'This feature is not available (on this device / in this context)');
                            resolve(false);
                            break;
                        case RESULTS.GRANTED:
                            resolve(true);
                            break;
                        case RESULTS.DENIED:
                            const res = await this.requestAndroid(permissionType);
                            resolve(res);
                            break;
                    }
                })
                .catch((error) => {
                    this.addMessage('Error', error);
                    resolve(false);
                });
        });
    }

    static requestAndroid(permissionType: Permission) {
        return new Promise<boolean>((resolve) => {
            request(permissionType).then(async (result) => {
                switch (result) {
                    case RESULTS.GRANTED:
                        resolve(true);
                        break;
                    case RESULTS.DENIED:
                        var res = await this.requestAndroid(permissionType);
                        resolve(res);
                        break;
                    case RESULTS.BLOCKED:
                        openSettings();
                        resolve(false);
                        break;
                }
            });
        });
    }

}