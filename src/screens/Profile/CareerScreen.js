import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Content, Header } from '../../components';
import TextInputScreen from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import CommanText from '../../components/CommanText';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from '../../components/SelectDropdown/Select';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { updateUserCureer } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatusModal from '../../components/StatusModal/StatusModal';

const CareerScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.user.access_token)
  const jobtype_list = useSelector((state) => state.preList.jobtype_list);
  const userCareerInfo = useSelector((state) => state.userDetails.userCareerInfo);
  const loading = useSelector((state) => state.userDetails.loading);

  const [error, setError] = useState('');
  const [data, setData] = useState({
    job_type: '',
    work_field: '',
    income: '',
  });

  // modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [actionType, setActionType] = useState(''); // save / next

  useEffect(() => {
    if (userCareerInfo) {
      setData({
        job_type: userCareerInfo.job_type || '',
        work_field: userCareerInfo.occupation || '',
        income: userCareerInfo.Income || '',
      });
    }
  }, [userCareerInfo]);

  const handleTextChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const saveData = async () => {
    try {
      setActionType('save');
      const token = await AsyncStorage.getItem('UserToken');
      const res = await updateUserCureer(data, token);
      console.log('res career :', res);

      if (res?.success) {
        setModalType('success');
        setModalMessage(res.message || 'Career updated successfully!');
      } else {
        setModalType('error');
        setModalMessage(res.message || 'Something went wrong');
      }
      setModalVisible(true);
    } catch (err) {
      setModalType('error');
      setModalMessage('API call failed!');
      setModalVisible(true);
    }
  };

  const NextBtn = async () => {
    try {
      setActionType('next');
      const token = await AsyncStorage.getItem('UserToken');
      const res = await updateUserCureer(data, token);
      console.log('res career :', res);

      if (res?.success) {
        setModalType('success');
        setModalMessage(res.message || 'Career updated successfully!');
      } else {
        setModalType('error');
        setModalMessage(res.message || 'Something went wrong');
      }
      setModalVisible(true);
    } catch (err) {
      setModalType('error');
      setModalMessage('API call failed!');
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);

    if (modalType === 'success') {
      if (actionType === 'next') {
        navigation.navigate('Physical');
      } else if (actionType === 'save') {
        navigation.navigate('Dashboard', { screen: 'Profile' });
      }
    }
    // ❌ error case me kahi navigate nahi hoga
  };

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Career Details"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />
        <View>
          <SelectDropdown
            data={jobtype_list ?? []}
            label="Job Type"
            value={data?.job_type}
            placeholder="Job Type"
            onSelectChange={value => handleTextChange('job_type', value)}
          />
          <CommanText
            commanText="Occupation"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            value={data?.work_field}
            placeholder="Occupation ( work field )"
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('work_field', text)}
          />
          <CommanText
            commanText="Monthly Income (₹)"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            value={data?.income}
            placeholder="Monthly Income (₹)"
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('income', text)}
          />
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

      <StatusModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </Container>
  );
};

export default CareerScreen;
