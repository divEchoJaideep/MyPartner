import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Content, Header } from '../../components';
import TextInputScreen from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import CommanText from '../../components/CommanText';
import { useNavigation } from '@react-navigation/native';
import Error from '../../components/Error';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { saveUserEducation } from '../../redux/actions/userDetailsActions';
import SelectDropdown from '../../components/SelectDropdown/Select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetProfileDropdown, updateUserEducation } from '../../api/api';
import StatusModal from '../../components/StatusModal/StatusModal';

const qualification = [
  { id: 1, name: 'Highest Qualification' },
  { id: 2, name: 'Professonal Dgree' },
  { id: 3, name: 'Other Achivements' }
]

const EducationScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  // const token = useSelector((state) => state.auth.user.access_token)
  // const userEducation = useSelector((state) => state.userDetails.userEducation);
  // console.log("userEducation: ", userEducation)
  const { language_list } = useSelector((state) => state.preList);
  // const error = useSelector((state) => state.userDetails.error);
  // const loading = useSelector((state) => state.userDetails.loading);



  const [data, setData] = useState({
    education_type: '',
    institution: '',
  });

  console.log('data ;', data);

  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [actionType, setActionType] = useState('');
  const [educationOptions, setEducationOptions] = useState([]);
  useEffect(() => {
    const loadUserFromStorage = async () => {
      const stored = await AsyncStorage.getItem("UserInfo");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.education) {
          setData({
            education_type: String(parsed.education.education_type) || '',
            institution: String(parsed.education.institution) || '',
          });
        }
      }
    };
    loadUserFromStorage();
    fetchDropdown();
  }, []);

  const fetchDropdown = async () => {
    try {
      const token = await AsyncStorage.getItem('UserToken');
      const res = await GetProfileDropdown(token);
      if (res.success) {
        setEducationOptions(
          (res.data?.highest_education_list || []).map(item => ({
            id: String(item.id),
            name: item.title,
          }))
        );
      } else {
        setError(res.message || 'Failed to load education options');
      }
    } catch (err) {
      setError('Something went wrong while fetching options');
    }
  };


  // const saveData = async () => {
  //   if (!data.degree || !data.institution) {
  //     console.log('data if: ', data);
  //     setError('Please enter details.');
  //     return;
  //   }
  //   dispatch(saveUserEducation(data, token))
  // };

  const saveData = async (type = "save") => {
    try {
      setLoading(true);
      setActionType(type);
      const token = await AsyncStorage.getItem('UserToken');
      const res = await updateUserEducation(data, token);
      console.log('res :', res);

      if (res?.success === true) {
        // Update AsyncStorage
        const stored = await AsyncStorage.getItem("UserInfo");
        if (stored) {
          let parsed = JSON.parse(stored);
          parsed.education = {
            education_type: data.education_type,
            institution: data.institution,
          };
          await AsyncStorage.setItem("UserInfo", JSON.stringify(parsed));
        }

        setModalType('success');
        setModalMessage(res.message || 'Education updated successfully!');
      } else {
        setModalType('error');
        setModalMessage(res?.message || 'Something went wrong');
      }
      setModalVisible(true);
    } catch (err) {
      setModalType('error');
      setModalMessage('Try Again after sometime !');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };
  const handleTextChange = (key, value) => {
  if (key === "education_type") {
    setData({
      education_type: value,
      institution: "", // ✅ reset institution on change
    });
  } else {
    setData(prev => ({ ...prev, [key]: value }));
  }
};


  const handleModalClose = () => {
    setModalVisible(false);

    if (modalType === 'success') {
      if (actionType === 'next') {
        navigation.navigate('Career');
      } else {
        navigation.navigate('Dashboard', { screen: 'Profile' });
      }
    }
  };




  return (
    <Container>
      <Header transparent hasBackBtn onBackPress={() => navigation.goBack()} />
      <Content hasHeader contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />
        <View>
          <SelectDropdown
            data={qualification ?? []}
            label="Education"
            value={qualification.find(item => String(item.id) === String(data?.education_type))} 
            placeholder="Select Education Type"
            dropDownStyle={styles.inputStyle}
            onSelectChange={value => handleTextChange('education_type', value)} 
          />


          {data?.education_type == 1 ? (
            <SelectDropdown
              data={educationOptions ?? []}
              label="Qualification"
              value={data?.institution}
              placeholder="Select Qualification"
              dropDownStyle={styles.inputStyle}
              onSelectChange={value =>
                handleTextChange('institution', value)
              } />
          ) : (
            <>
              <CommanText
                commanText={data?.education_type == 3 ? "Other Achivements" : "Professonal Dgree / Diploma"}
                commanTextstyle={styles.birthdayText}
              />
              <TextInputScreen
                defaultInput
                value={data?.institution}
                placeholder={data?.education_type == 3 ? "Other Achivements" : "Professonal Dgree / Diploma"}
                type="default"
                inputStyle={styles.inputStyle}
                onChangeText={text => handleTextChange('institution', text)}
              />
            </>
          )}
        </View>
      </Content>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}>
        <CommanBtnScreen
          btnText="Save"
          onBtnPress={() => saveData("save")}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.twoBtnStyle}
        />
        <CommanBtnScreen
          btnText="Next"
          onBtnPress={() => saveData("next")}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={[styles.twoBtnStyle, styles.btnBg]}
        />
      </View>
      <StatusModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </Container>
  );
};

export default EducationScreen;