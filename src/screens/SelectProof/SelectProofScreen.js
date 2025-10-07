import * as React from "react";
import { useState, useEffect } from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { Container, Content, Header } from "../../components";
import CommanHeading from "../../components/CommanHeading";
import CommanBtn from "../../components/CommanBtn";
import CommanText from "../../components/CommanText";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Styles/SelectProofStyle";
import SelectDropdown from "../../components/SelectDropdown/Select";
import ProfilePhoto from "../../components/ProfilePhoto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchUserVerificationInfo,
  saveUserVerificationInfo,
} from "../../redux/actions/userDetailsActions";
import StatusModal from "../../components/StatusModal/StatusModal";
import { updateVerification } from "../../redux/reducers/userDetailsReducer";

const documentType = [
  { id: "aadhar", name: "Aadhar Card" },
  { id: "voter_id", name: "Voter Id" },
  { id: "driving_licence", name: "Driving Licence" },
  { id: "other", name: "Other" },

];

function SelectProofScreen({ navigation }) {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const dispatch = useDispatch();
  const { loading, userVerification } = useSelector(state => state.userDetails);
  const verification = useSelector(state => state.userDetails.userVerification)
  const [data, setData] = useState({
    document_type: "",
    front_photo: "",
    back_photo: "",
  });

  // const [modalVisible, setModalVisible] = useState(false);
  // const [modalType, setModalType] = useState("success");
  // const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const token = await AsyncStorage.getItem("UserToken");
    const res = await dispatch(saveUserVerificationInfo(formData, token));

    dispatch(updateVerification({
      document_type: data.document_type,
      front_photo: data.front_photo,
      back_photo: data.back_photo,
    }));
  }

  useEffect(() => {
    if (verification) {
      setData({
        document_type: verification.document_type || "",
        front_photo: verification.front_photo || "",
        back_photo: verification.back_photo || "",
      });
    }
  }, [verification]);

  const handleTextChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const updateImage = (key, image) => {
    setData({ ...data, [key]: image });
  };

  const saveData = async () => {

    try {
      const token = await AsyncStorage.getItem("UserToken");

      const formData = new FormData();
      formData.append("document_type", data.document_type);

      if (data.front_photo) {
        formData.append("front_photo", {
          uri: data.front_photo.uri || data.front_photo,
          type: data.front_photo.type || "image/jpeg",
          name: data.front_photo.fileName || "front.jpg",
        });
      }

      if (data.back_photo) {
        formData.append("back_photo", {
          uri: data.back_photo.uri || data.back_photo,
          type: data.back_photo.type || "image/jpeg",
          name: data.back_photo.fileName || "back.jpg",
        });
      }

      const res = await dispatch(saveUserVerificationInfo(formData, token));
      if (res.success) {
        navigation.navigate("Dashboard", { screen: "Profile" });
      }
    } catch (err) {
      // setModalType("error");
      // setModalMessage("Connect to help center");
    }
  };

  // const handleModalClose = () => {
  //   setModalVisible(false);
  //   if (modalType === "success") {
  //     navigation.navigate("Dashboard", { screen: "Profile" });
  //   }
  // };

  const renderImageBox = (label, value, keyName) => (
    <View style={{ alignItems: "center",flexDirection:"column" }}>
      {loading ? (
        <View
          style={{
            width: screenWidth - 60,
            height: screenHeight/5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="small" color="#000" />
        </View>
      ) : (
        <View
          style={{
            width: screenWidth - 60,
            height: screenHeight /5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <ProfilePhoto
            source={value}
            width={screenWidth - 60}
            height={screenHeight / 5}
            userGallery
            onChange={(image) => updateImage(keyName, image)}
            placeholderComponent={
              <CommanText
                commanText="+"
                commanTextstyle={{ fontSize: 30, color: "#aaa" }}
              />
            }
          />
        </View>
      )}
      <CommanText commanText={label} commanTextstyle={styles.birthdayText} />
    </View>
  );

  return (
    <Container paddingBottomContainer={true}>
      <Header
        transparent
        hasBackBtn
        title="Identity Verification"
        hasHomeBTN
        onHomeBTN={() => navigation.navigate('Dashboard', { screen: 'Profile' })}
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <SelectDropdown
          data={documentType}
          label="Choose an ID type"
          value={data?.document_type}
          placeholder="Choose an ID type"
          searchPlaceholder="Search ID Type"
          onSelectChange={(value) => handleTextChange("document_type", value)}
        />

        <CommanHeading headingText heading="Upload Image" />

        <View
          style={{
            width: "100%",
            // flexDirection: "row",
            gap:56,
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {renderImageBox("Front Image", data?.front_photo, "front_photo")}
          {renderImageBox("Back Image", data?.back_photo, "back_photo")}
        </View>

      </Content>
      <CommanBtn
        btnText="Save"
        onBtnPress={saveData}
        commanBtnTextStyle={styles.commanBtnTextStyle}
        commanBtnStyle={styles.twoBtnStyle}
      />

      {/* <StatusModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={handleModalClose}
      /> */}
    </Container>
  );
}

export default SelectProofScreen;
