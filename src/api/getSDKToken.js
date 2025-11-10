export const getPhonePeToken = async () => {
  try {
    console.log('getTokenSDK');

    // Prepare URL-encoded body
    const formBody = new URLSearchParams();
    formBody.append("client_id", "M225RLNI4LMHX_2511081354");
    formBody.append("client_version", "1"); // required by PhonePe
    formBody.append("client_secret", "NGM4NmIwYWUtMzRhNC00NWUzLTk2NTgtMTJkMjEyMGFlYzUx");
    formBody.append("grant_type", "client_credentials");

    const response = await fetch(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      }
    );

    const data = await response.json();
    console.log("PhonePe Token Response:", data);

    return data.access_token || null;
  } catch (error) {
    console.error("Failed to get PhonePe token:", error);
    return null;
  }
};

