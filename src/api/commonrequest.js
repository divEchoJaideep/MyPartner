import axios from "axios";
import Toast from "react-native-toast-message";
import { globalLogout } from "../utils/globalLogout"; 

let isLoggingOut = false;

axios.defaults.baseURL = "https://clients.divecho.com/matrimony/api";

async function commonrequest(method, url, body = {}, token = "") {
  try {
    const isFormData = body instanceof FormData;

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
      Accept: "application/json",
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
    };

    const response = await axios({ method, url, headers, data: body });
    return response.data;
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if ((status === 401 || message === "Unauthenticated") && !isLoggingOut) {
      isLoggingOut = true;

      Toast.show({
        type: "error",
        text1: "Logged Out",
        text2: "Your account is logged into another device.",
      });

      await globalLogout();

      setTimeout(() => {
        isLoggingOut = false;
      }, 3000);
    }

    return {
      success: false,
      message:
        message || error.message || "Error connecting to server",
    };
  }
}

export default commonrequest;
