import axios from "axios";

async function commonrequest(method, url, body, token) {
  console.log('body common reques :',body);
  
  try {
    const isFormData = body instanceof FormData;

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
      Accept: "application/json",
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" }),
    };

    if (isFormData) {
      // console.log("Sending FormData...");
      try {
        if (typeof body.getParts === "function") {
          // console.log("FormData parts:", body.getParts());
        } else {
          // console.log("FormData object:", body);
        }
      } catch (err) {
        // console.log("FormData Debug Error:", err);
      }
    } else {
      // console.log("Sending JSON:", body);
    }

    const config = {
      method,
      url,
      headers,
      data: body,
    };

    const response = await axios(config);
    return response.data;

  } catch (error) {
    console.log("Axios Error:", error?.response || error?.message);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        "Error connecting to server",
    };
  }
}

export default commonrequest;
