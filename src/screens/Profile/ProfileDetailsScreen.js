import { View, Text, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Content, Header } from '../../components';
import TextInputScreen from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from '../../components/SelectDropdown/Select';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import { updateUserBasicInfo } from '../../redux/actions/userDetailsActions';
import { resetState } from '../../redux/reducers/userDetailsReducer';
import Loading from '../../components/Loading';
import ProfilePhoto from '../../components/ProfilePhoto';
import { updateBasicInfo } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommanText from '../../components/CommanText';
import StatusModal from '../../components/StatusModal/StatusModal';
import { Images } from '../../theme';

const gender = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
  { id: 3, name: 'Other' },
];

const searching_for = [
  { id: 1, name: "Life Partner" },
  { id: 2, name: "True Friend" },
];

const ProfileDetailsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userBasicInfo = useSelector((state) => state.userDetails.userBasicInfo);
  const success = useSelector((state) => state.userDetails.success)
  const { onbehalf_list, maritial_status } = useSelector((state) => state.preList);
  const token = useSelector((state) => state.auth.user.access_token);
  const loading = useSelector((state) => state.userDetails.loading);
  const [modalVisible, setModalVisible] = useState(false);
  const [nextScreen, setNextScreen] = useState(null);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [error, setError] = useState('');
  const [data, setData] = useState({
    first_name: '',
    searching_for: '',
    gender: '',
    on_behalf: '',
    birth_year: '',
    marital_status: '',
    photo: '',
  });

  console.log('data profile  :', data);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const stored = await AsyncStorage.getItem("UserInfo");
      if (stored) {
        const parsed = JSON.parse(stored);
        setData(prev => ({
          ...prev,
          photo: parsed?.basic_details?.photo || prev.photo,
        }));
      }
    };
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    if (userBasicInfo?.basic_details) {
      const bd = userBasicInfo.basic_details;
      setData(prev => ({
        ...prev,
        first_name: bd.first_name || prev.first_name,
        searching_for: bd.searching_for || prev.searching_for,
        gender: bd.gender || prev.gender,
        on_behalf: bd.on_behalf || prev.on_behalf,
        birth_year: bd.birth_year || prev.birth_year,
        marital_status: bd.marital_status || prev.marital_status,
        photo: bd.photo || prev.photo, // 👈 string url save karo
      }));
    }

    if (success) {
      dispatch(resetState());
    }
  }, [success, dispatch, userBasicInfo]);

  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1900 + 1 }, (_, i) => ({
      id: (currentYear - i),
      name: (currentYear - i).toString(),
    }));
  };
  const years = getYearRange();

  useEffect(() => {
    if (userBasicInfo) {
      setData(prev => ({
        ...prev,
        ...userBasicInfo,
        photo: userBasicInfo.photo
          ? (typeof userBasicInfo.photo === "string"
            ? userBasicInfo.photo
            : userBasicInfo.photo?.uri || prev.photo)
          : prev.photo, // agar null ho to purana photo preserve karo
      }));
    }

    if (success) {
      dispatch(resetState());
    }
  }, [success, dispatch, userBasicInfo]);

  //   const saveData = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('UserToken');

  //     const res = await updateBasicInfo(data, token);


  //     if (res.success) {
  //       setModalType("success");
  //       setModalMessage(res.message || "Basic information updated successfully!");
  //       setNextScreen({ name: 'Dashboard', params: { screen: 'Profile' } });
  //     } else {
  //       setModalType("error");
  //       setModalMessage(res.message || "Something went wrong!");
  //       setNextScreen(null);
  //     }
  //     setModalVisible(true);
  //   } catch (err) {
  //     setModalType("error");
  //     setModalMessage("API call failed!");
  //     setModalVisible(true);
  //   }
  // };


  const saveData = async () => {
    try {
      let formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("searching_for", data.searching_for);
      formData.append("gender", data.gender);
      formData.append("on_behalf", data.on_behalf);
      formData.append("birth_year", data.birth_year);
      formData.append("marital_status", data.marital_status);

      // 👇 Only append if new image object is selected
      if (data.photo && typeof data.photo === "object" && data.photo.uri) {
        formData.append("photo", {
          uri: data.photo.uri,
          type: data.photo.type || "image/jpeg",
          name: data.photo.name || `photo_${Date.now()}.jpg`,
        });
      }

      // 🚀 API Call
      const res = await updateBasicInfo(formData, token, true);

      if (res.success) {
        // 🔥 AsyncStorage update with API response
        let stored = await AsyncStorage.getItem("UserInfo");
        let parsed = stored ? JSON.parse(stored) : {};
        parsed.basic_details = {
          ...parsed.basic_details,
          ...data,
          photo: res?.data?.photo || parsed.basic_details?.photo, // API se naya mile to use lo
        };
        await AsyncStorage.setItem("UserInfo", JSON.stringify(parsed));

        setModalType("success");
        setModalMessage(res.message || "Basic information updated successfully!");
        setNextScreen({ name: 'Dashboard', params: { screen: 'Profile' } });
      } else {
        setModalType("error");
        setModalMessage(res.message || "Something went wrong!");
        setNextScreen(null);
      }
      setModalVisible(true);
    } catch (err) {
      setModalType("error");
      setModalMessage("API call failed!");
      setModalVisible(true);
    }
  };
  const NextBtn = async () => {
    try {
      let formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("searching_for", data.searching_for);
      formData.append("gender", data.gender);
      formData.append("on_behalf", data.on_behalf);
      formData.append("birth_year", data.birth_year);
      formData.append("marital_status", data.marital_status);

      if (data.photo) {
        if (typeof data.photo === "object" && data.photo.uri) {
          formData.append("photo", {
            uri: data.photo.uri,
            type: data.photo.type || "image/jpeg",
            name: data.photo.name || `photo_${Date.now()}.jpg`,
          });
        } else if (typeof data.photo === "string") {
          formData.append("photo", data.photo);
        }
      }



      const res = await updateBasicInfo(formData, token, true);

      if (res.success) {
        // 🔥 AsyncStorage update karein
        let stored = await AsyncStorage.getItem("UserInfo");
        let parsed = stored ? JSON.parse(stored) : {};
        parsed.basic_details = {
          ...parsed.basic_details,
          ...data,
          photo: res?.data?.photo
            ? res.data.photo  // API se naya url mila to use lo
            : typeof data.photo === "object" && data.photo.uri
              ? data.photo.uri // object ko sirf uri me convert karo
              : data.photo || parsed.basic_details.photo, // fallback purana photo
        };

        await AsyncStorage.setItem("UserInfo", JSON.stringify(parsed));

        setModalType("success");
        setModalMessage(res.message || "Basic information updated successfully!");
        setNextScreen({ name: 'AddPhoto' });
      } else {
        setModalType("error");
        setModalMessage(res.message || "Something went wrong!");
        setNextScreen(null);
      }
      setModalVisible(true);
    } catch (err) {
      setModalType("error");
      setModalMessage("API call failed!");
      setModalVisible(true);
    }
  };


  const handleTextChange = (key, value) => {
    setData((prevData) => {
      const knownLanguages = prevData.known_languages || [];
      if (key === "known_languages") {
        const updatedLanguages = knownLanguages.includes(value)
          ? knownLanguages.filter(lang => lang !== value)
          : [...knownLanguages, value];
        return {
          ...prevData,
          known_languages: updatedLanguages,
        };
      } else {
        return {
          ...prevData,
          [key]: value,
        };
      }
    });
  };

  // const normalizedPhoto = data.photo
  // ? typeof data.photo === "string"
  //   ? { uri: data.photo }
  //   : data.photo?.uri
  //     ? { uri: data.photo.uri }
  //     : Images.UserImage
  // : Images.UserImage;


  const getPhotoSource = (photo) => {
    if (!photo) return Images.UserImage; // fallback local image

    if (typeof photo === "string") {
      return { uri: photo }; // remote URL
    }

    if (typeof photo === "object" && photo.uri) {
      return { uri: photo.uri }; // picker object
    }

    if (typeof photo === "number") {
      return photo; // local require() image
    }

    return Images.UserImage;
  };


  return (
    <Container safeAreaView>
      <Header
        transparent
        hasBackBtn
        title="Basic Information"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <Loading loading={loading} />
        <View style={styles.inputView}>
         
          <ProfilePhoto
            source={getPhotoSource(data.photo)}
            onChange={image => handleTextChange("photo", image)}
          />


          <Error error={error} />
          <TextInputScreen
            defaultInput
            value={data?.first_name}
            onChangeText={text => handleTextChange('first_name', text)}
            placeholder="Name"
            type="default"
            inputStyle={styles.inputStyle}
          />

          <SelectDropdown
            data={onbehalf_list ?? []}
            label="Profile Handler"
            value={data?.on_behalf}
            labelField="name"
            valueField="id"
            placeholder="Select"
            searchPlaceholder="Search "
            onSelectChange={value => handleTextChange('on_behalf', value)}
          />

          <SelectDropdown
            data={searching_for ?? []}
            label="Searching For"
            value={data?.searching_for}
            labelField="name"
            valueField="id"
            placeholder="Searching For"
            searchPlaceholder="Searching For"
            onSelectChange={value => handleTextChange('searching_for', value)}
          />

          <SelectDropdown
            data={maritial_status ?? []}
            label="Marital status"
            value={data?.marital_status}
            labelField="name"
            valueField="id"
            placeholder="Your relationship status"
            searchPlaceholder="Search Marital status"
            onSelectChange={value => handleTextChange('marital_status', value)}
          />

          <SelectDropdown
            data={years ?? []}
            label="Birth Year"
            value={data?.birth_year}
            labelField="name"
            valueField="id"
            dropdownPosition='auto'
            placeholder="Birth Year"
            searchPlaceholder="Search Year"
            onSelectChange={value => handleTextChange('birth_year', value)}
          />

          <SelectDropdown
            data={gender ?? []}
            label="Gender "
            value={data?.gender}
            labelField="name"
            valueField="id"
            dropdownPosition='auto'
            placeholder="Select your gender"
            searchPlaceholder="Search gender"
            onSelectChange={value => handleTextChange('gender', value)}
          />
        </View>
      </Content>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CommanBtnScreen
          btnText="Save"
          onBtnPress={() => saveData()}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.twoBtnStyle}
        />
        <CommanBtnScreen
          btnText="Next"
          onBtnPress={() => NextBtn()}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={[styles.twoBtnStyle, styles.btnBg]}
        />
      </View>
      <StatusModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={() => {
          setModalVisible(false);
          if (nextScreen) {
            navigation.navigate(nextScreen.name, nextScreen.params);
            setNextScreen(null);
          }
        }}
      />

    </Container>
  );
};

export default ProfileDetailsScreen;
