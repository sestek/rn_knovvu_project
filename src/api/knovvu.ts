import axiosKnovvu from "./axios";

export default class Knovvu {

    static async postContactEmail(body: any) {
        const { status, data } = await axiosKnovvu.post('send-contact-email', body);
        return data;
    }

}