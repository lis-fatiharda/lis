
import Axios from "axios";
import router from "./router";
import fs from "fs";
//import { Loading, QSpinnerGrid, QSpinnerRadio } from "quasar";
//import https from "https"

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
//const httpsAgent = new https.Agent({
//    keepAlive: true,
//    rejectUnauthorized: false,
//    cert: fs.readFileSync("/etc/ssl/sertifika.crt"),
//    key: fs.readFileSync("/etc/ssl/private.key"),
//});


const appAxios = Axios.create({
    //httpsAgent,
    baseURL: "https://lis.liserp.com/lisApi/", //+ ":" + viteEnv.lisApi_PORT + "/",
    withCredentials: false,
    timeout: 990000,

    headers: {
        sys_user: localStorage.sys_user,
        sys_token: localStorage.sys_token,
    },
});

// Step-2: Create request, response & error handlers
var userLocation = "";
const requestHandler = async (request) => {
    // Token will be dynamic so we can use any app-specific way to always
    // fetch the new token before making the call

    request.baseURL = "https://lis.liserp.com/lisApi/";

    //request.headers.sys_user = localStorage.sys_user;
    //request.headers.sys_token = localStorage.sys_token;
    request.headers["Authorization"] =
        localStorage.sys_user + "$" + localStorage.sys_token + "|";

    async function getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                userLocation =
                    position.coords.latitude + "$" + position.coords.longitude;
            });
        } else {
            console.log("Lokasyon Desteklenmiyor veya İzin verilmedi!");
            return "";
        }
    }
    getPosition();

    request.headers["Authorization"] += userLocation;

    //Loading.show();
    return request;
};

const responseHandler = (response) => {
    //Loading.hide();

    return response;
};

const errorHandler = (error) => {
    //Loading.hide();
    if (error.response.status == 401) {
        localStorage.sys_token = "";
        router.push("/login");
    }
    return Promise.reject(error);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
appAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

appAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

// Step-4: Export the newly created Axios instance to be used in different locations.
export default appAxios;
