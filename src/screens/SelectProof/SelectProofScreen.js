import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Container, Content, Header } from '../../components';
import CommanHeading from '../../components/CommanHeading';
import CommanBtn from '../../components/CommanBtn';
import CommanText from '../../components/CommanText';
import { navigate } from '../../navigation/ReduxNavigation';
import styles from './Styles/SelectProofStyle';
import SelectDropdown from '../../components/SelectDropdown/Select';
import ProfilePhoto from '../../components/ProfilePhoto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserAllDetails, updateUserProff } from '../../api/api';
import StatusModal from '../../components/StatusModal/StatusModal';

const documentType = [
  { id: "aadhar", name: "Aadhar Card" },
  { id: "voter_id", name: "Voter Id" },
  { id: "driving_licence", name: "Driving Licence" },
  { id: "other", name: "Other" }
];

function SelectProofScreen({ navigation }) {
  const [data, setData] = useState({
    document_type: "",
    front_photo: "",
    back_photo: ""
  });

  const [loading, setLoading] = useState(true);

  // 🔥 Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('success'); // success / error
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    getUserFullDetails();
  }, []);

  const handleTextChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const updateImage = (key, image) => {
    setData({ ...data, [key]: image });
  };

  const saveData = async () => {
    try {
      if (!data.document_type || !data.front_photo || !data.back_photo) {
        setModalType('error');
        setModalMessage("All fields are required!");
        setModalVisible(true);
        return;
      }

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

      const res = await updateUserProff(formData, token);

      if (res.success) {
        setModalType('success');
        setModalMessage(res.message || "Image updated successfully!");
      } else {
        setModalType('error');
        setModalMessage(res.message || "Something went wrong");
      }
      setModalVisible(true);
    } catch (err) {
      setModalType('error');
      setModalMessage("Connect to help center");
      setModalVisible(true);
    }
  };

  const getUserFullDetails = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('UserToken');
      const res = await getUserAllDetails(token);

      if (res.success) {
        setData({
          document_type: res?.data?.verification?.document_type || "",
          front_photo: res?.data?.verification?.front_photo || "",
          back_photo: res?.data?.verification?.back_photo || "",
        });
      }
    } catch (err) {
      console.log("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Modal close handle
  const handleModalClose = () => {
    setModalVisible(false);
    if (modalType === 'success') {
      navigation.navigate('Dashboard', { screen: 'Profile' });
    }
  };

  const renderImageBox = (label, value, keyName) => (
    <View style={{ alignItems: 'center' }}>
      {loading ? (
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="small" color="#000" />
        </View>
      ) : (
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <ProfilePhoto
            source={value}
            userGallery
            onChange={image => updateImage(keyName, image)}
            placeholderComponent={
              <CommanText
                commanText="+"
                commanTextstyle={{ fontSize: 30, color: '#aaa' }}
              />
            }
          />
        </View>
      )}
      <CommanText commanText={label} commanTextstyle={styles.birthdayText} />
    </View>
  );

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Identity Verification"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <SelectDropdown
          data={documentType}
          label="Choose an ID type"
          value={data?.document_type}
          placeholder="Choose an ID type"
          searchPlaceholder="Search ID Type"
          onSelectChange={value => handleTextChange('document_type', value)}
        />

        <CommanHeading headingText heading="Upload Image" navigation={navigate} />

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          {renderImageBox("Front Image", data?.front_photo, "front_photo")}
          {renderImageBox("Back Image", data?.back_photo, "back_photo")}
        </View>

        <CommanBtn
          btnText="Save"
          onBtnPress={saveData}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.twoBtnStyle}
        />
      </Content>

      <StatusModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </Container>
  );
}

export default SelectProofScreen;
