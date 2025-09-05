import { updateLanguage } from "./const";

async function UpdateLanguage(payload, token) {
  try {
    let formData = new FormData();
    formData.append('known_languages', payload.known_languages);
    if (payload.mother_tongue) {
      formData.append('mother_tongue', payload.mother_tongue);
    }

    let requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      redirect: 'follow',
    };

    const response = await fetch(updateLanguage, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("UpdateLanguage API Error:", error);
    return { success: false, message: 'Error connecting to server' };
  }
}
