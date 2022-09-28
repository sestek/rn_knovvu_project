import axios from "axios";

const axiosKnovvu = axios.create();

axiosKnovvu.defaults.baseURL = "https://api.knovvu.com/";
axiosKnovvu.defaults.timeout = 25000;
axiosKnovvu.defaults.headers.common["Content-Type"] = "application/json";
axiosKnovvu.defaults.headers.common["Accept"] = "application/json";

export default axiosKnovvu;