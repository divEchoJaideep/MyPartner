import { View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Content, Header } from '../../components';
import TextInputScreen from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from '../../components/SelectDropdown/Select';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import { updateUserBasicInfo, resetState } from '../../redux/actions/userDetailsActions';
import Loading from '../../components/Loading';
import ProfilePhoto from '../../components/ProfilePhoto';
import StatusModal from '../../components/StatusModal/StatusModal';
import { Images } from '../../theme';
import { log } from 'console';

const genderOptions = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
  { id: 3, name: 'Other' },
];

const intrestedOption = [
  { id: 'male', name: 'Male' },
  { id: 'female', name: 'Female' },
  { id: 'other', name: 'Other' },
  { id: 'both', name: 'Both ( Male/Female )' },
  { id: 'all', name: 'All' },
];

const searchingForOptions = [
  { id: 1, name: "Life Partner" },
  { id: 2, name: "True Friend" },
];

const ProfileDetailsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const userBasicInfo = useSelector(state => state.userDetails.userBasicInfo);
console.log('userBasicInfo :',userBasicInfo);

  const loading = useSelector(state => state.userDetails.loading);
  const success = useSelector(state => state.userDetails.success);
  const { onbehalf_list, maritial_status } = useSelector(state => state.preList);
  const token = useSelector(state => state.auth.token);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [nextScreen, setNextScreen] = useState(null);
  const [data, setData] = useState({
    first_name: '',
    searching_for: '',
    gender: '',
    interested_in: '',
    on_behalf: '',
    birth_year: '',
    marital_status: '',
    phone: '',
    photo: '',
  });

console.log('Photo value before submit:', data.photo);

  useEffect(() => {
    if (userBasicInfo) {
      setData({
        first_name: userBasicInfo.first_name || '',
        searching_for: userBasicInfo.searching_for || '',
        gender: userBasicInfo.gender || '',
        on_behalf: userBasicInfo.on_behalf || '',
        birth_year: userBasicInfo.birth_year || '',
        marital_status: userBasicInfo.marital_status || '',
        phone: userBasicInfo.phone,
    photo: typeof data.photo === 'object' && data.photo?.uri ? data.photo : userBasicInfo.photo || '', 
        interested_in: intrestedOption.find(item => item.id === userBasicInfo.interested_in) || '',
      });
    }
  }, [userBasicInfo]);

  const getPhotoSource = (photo) => {
    if (!photo) return Images.UserImage;
    if (typeof photo === "string") return { uri: photo };
    if (typeof photo === "object" && photo.uri) return { uri: photo.uri };
    if (typeof photo === "number") return photo;
    return Images.UserImage;
  };

  const handleTextChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

 const preparePayload = () => {
  const formData = new FormData();

  formData.append('first_name', data.first_name);
  formData.append('searching_for', data.searching_for?.id || data.searching_for);
  formData.append('gender', data.gender?.id || data.gender);
  formData.append('interested_in', data.interested_in?.id || data.interested_in);
  formData.append('on_behalf', data.on_behalf?.id || data.on_behalf);
  formData.append('birth_year', data.birth_year);
  formData.append('marital_status', data.marital_status?.id || data.marital_status);
  formData.append('phone', data.phone);

  if (typeof data.photo === 'object' && data.photo.uri) {
    formData.append('photo', {
      uri: data.photo.uri,
      name: data.photo.name || 'profile.jpg',
      type: data.photo.type || 'image/jpeg',
    });
  }

  return formData;

};

  const saveData = async () => {
    try {
      const response = await dispatch(updateUserBasicInfo(preparePayload(), token));
      if (response.success) {
        navigation.navigate("Dashboard", { screen: "Profile" });
      }
    } catch (error) {
      console.log("Save failed: ", error.message);
    }
  };

  const NextBtn = async () => {
    try {
      const response = await dispatch(updateUserBasicInfo(preparePayload(), token));
      if (response.success) {
        navigation.navigate('AddPhoto');
      }
    } catch (error) {
      console.log("Save failed: ", error.message);
    }
  };


  const years = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({
    id: new Date().getFullYear() - i,
    name: (new Date().getFullYear() - i).toString(),
  }));

  return (
    <Container paddingBottomContainer={true}>
      <Header
        transparent
        hasBackBtn
        title="Basic Information"
        hasHomeBTN
        onHomeBTN={() => navigation.navigate('Dashboard', { screen: 'Profile' })}
        onBackPress={() => navigation.goBack()}
      />
      {/* <Content contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}> */}
      <ScrollView style={[styles.container, { width: '100%' }]}>
        <Loading loading={loading} />
        <View style={styles.inputView}>
          <ProfilePhoto
            source={getPhotoSource(data.photo)}
            onChange={image => handleTextChange("photo", image)}
          />

          {/* <Error error="" /> */}

          <TextInputScreen
            defaultInput
            value={data.first_name}
            onChangeText={text => handleTextChange('first_name', text)}
            placeholder="Name"
            type="default"
            inputStyle={styles.inputStyle}
          />

          <TextInputScreen
            defaultInput
            readOnly
            value={data.phone}
            placeholder="Phone"
            type="default"
            inputStyle={styles.inputStyle}
          />

          <SelectDropdown
            data={onbehalf_list ?? []}
            label="Profile Handler"
            value={data.on_behalf}
            labelField="name"
            valueField="id"
            placeholder="Select"
            onSelectChange={value => handleTextChange('on_behalf', value)}
          />

          <SelectDropdown
            data={searchingForOptions}
            label="Searching For"
            value={data.searching_for}
            labelField="name"
            valueField="id"
            placeholder="Searching For"
            onSelectChange={value => handleTextChange('searching_for', value)}
          />

          <SelectDropdown
            data={maritial_status ?? []}
            label="Marital Status"
            value={data.marital_status}
            search
            labelField="name"
            valueField="id"
            placeholder="Your relationship status"
            onSelectChange={value => handleTextChange('marital_status', value)}
          />

          <SelectDropdown
            data={years}
            label="Birth Year"
            value={data.birth_year}
            search
            labelField="name"
            valueField="id"
            placeholder="Birth Year"
            onSelectChange={value => handleTextChange('birth_year', value)}
          />

          <SelectDropdown
            data={genderOptions}
            dropdownPosition='top'
            label="Gender"
            value={data.gender}
            labelField="name"
            valueField="id"
            placeholder="Select Gender"
            onSelectChange={value => handleTextChange('gender', value)}
          />

          <SelectDropdown
            data={intrestedOption}
            dropdownPosition='top'
            label="Intrested In"
            value={data.interested_in}
            labelField="name"
            valueField="id"
            placeholder="Select Gender"
            onSelectChange={value => handleTextChange('interested_in', value)}
          />


        </View>
        {/* </Content> */}
      </ScrollView>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', gap: 10 }}>
        <CommanBtnScreen
          btnText="Save"
          onBtnPress={saveData}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.twoBtnStyle}
        />
        <CommanBtnScreen
          btnText="Next"
          onBtnPress={NextBtn}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={[styles.twoBtnStyle, styles.btnBg]}
        />
      </View>

    </Container>
  );
};

export default ProfileDetailsScreen;
