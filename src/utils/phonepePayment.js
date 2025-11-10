import PhonePePaymentSDK from "react-native-phonepe-pg";
import base64 from "react-native-base64";
import { sha256 } from "react-native-sha256";
import { getPhonePeToken } from "../api/getSDKToken";


const getOrderToken = async (merchantTransactionId, amount) => {
  try {
    const token = await getPhonePeToken(); 
    if (!token) throw new Error("Failed to get OAuth token");

    const body = {
      merchantOrderId: merchantTransactionId,
      amount: amount, // in paise
      paymentFlow: { type: "PG_CHECKOUT" },
      // Optional: callback URLs, metaInfo, expireAfter
    };

    const response = await fetch(`https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/sdk/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `O-Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const data = await response.json();
    if (!data.token) throw new Error("No order token returned");
    return data.token;

  } catch (error) {
    console.error("❌ Failed to get order token:", error);
    return null;
  }
};

// ✅ Step 2: Start PhonePe SDK transaction
export const phonePeStartTransaction = async (props) => {
  
  try {
    console.log("Start Payment Process");

    const amount = props.amount * 100; 
    const merchantTransactionId = props.transactionId;
    const merchantUserId = "USER_" + Date.now();
    const merchantId = "M225RLNI4LMHX";
    const salt_key = "NGM4NmIwYWUtMzRhNC00NWUzLTk2NTgtMTJkMjEyMGFlYzUx";
    const salt_index = "1";

    const orderToken = await getOrderToken(merchantTransactionId, amount);
    if (!orderToken) return { success: false, message: "Failed to get order token" };

    const requestBody = {
      merchantId,
      merchantUserId,
      amount,
      orderId: merchantTransactionId,
      token: orderToken,
      paymentMode: { type: "PAY_PAGE" },
    };
console.log('requestBody :',requestBody);

    const jsonPayload = JSON.stringify(requestBody);
    const base64Payload = base64.encode(jsonPayload);
    console.log('base64Payload :',base64Payload);
    console.log('salt_key :',salt_key);
    
    const string = base64Payload + "/sdk/v1/pay" + salt_key;
    console.log('string :',string);
    
    const checksum = (await sha256(string)) + "###" + salt_index;
console.log('checksum :',checksum);

    console.log("📦 JSON Payload:", jsonPayload);
    console.log("🔐 Checksum:", checksum);

    const result = await PhonePePaymentSDK.startTransaction(jsonPayload, checksum);
    console.log("✅ Transaction Result:", result);
    return { success: true, data: result };

  } catch (error) {
    console.error("❌ Transaction Failed:", error);
    return { success: false, message: error.message };
  }
};

export const initPhonePeSDK = async () => {
  const merchantId = "M225RLNI4LMHX";
  const environment = "SANDBOX";
  const flowId = "DJBOOKING_FLOW_" + Date.now();

  try {
    const result = await PhonePePaymentSDK.init(environment, merchantId, flowId, true);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
