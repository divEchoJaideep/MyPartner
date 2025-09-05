import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Content, Header } from '../../components';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import CommanText from '../../components/CommanText';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from '../../components/SelectDropdown/Select';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCasteByRelisionCaste,
  getReligionCasteByRelisionId,
  getSubCasteByCaste,
} from '../../redux/actions/userDetailsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserAllDetails, updateUserSocial } from '../../api/api';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import StatusModal from '../../components/StatusModal/StatusModal';

const SocialBackground = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { family_value_list, religion_list, religionCaste, caste, subCaste } =
    useSelector(state => state.preList);

  const { loading } = useSelector(state => state.userDetails);

  const [error, setError] = useState('');
  const [data, setData] = useState({
    member_religion_id: '',
    member_religion_caste_id: '',
    member_caste_id: '',
    member_sub_caste_id: '',
    // family_value_id: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [nextScreen, setNextScreen] = useState(null); 

  useEffect(() => {
    getUserFullDetails();
  }, []);

  const getUserFullDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('UserToken');
      const res = await getUserAllDetails(token);

      if (res.success) {
        const religionData = res?.data?.religion || {};

        setData({
          member_religion_id: religionData.member_religion_id || '',
          member_religion_caste_id: religionData.member_religion_caste_id || '',
          member_caste_id: religionData.member_caste_id || '',
          member_sub_caste_id: religionData.member_sub_caste_id || '',
          // family_value_id: religionData.family_value_id || '',
        });

        // Pre-load dependent dropdowns
        if (religionData.member_religion_id) {
          dispatch(getReligionCasteByRelisionId(religionData.member_religion_id, token));
        }
        if (religionData.member_religion_caste_id) {
          dispatch(getCasteByRelisionCaste(religionData.member_religion_caste_id, token));
        }
        if (religionData.member_caste_id) {
          dispatch(getSubCasteByCaste(religionData.member_caste_id, token));
        }
      } else {
        setError(res.message || 'Failed to fetch user details');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  const onReligionChange = async religionID => {
    setData({
      ...data,
      member_religion_id: religionID,
      member_religion_caste_id: '',
      member_caste_id: '',
      member_sub_caste_id: '',
    });
    const token = await AsyncStorage.getItem('UserToken');
    dispatch(getReligionCasteByRelisionId(religionID, token));
  };

  const onReligionCasteChange = async casteID => {
    setData({
      ...data,
      member_religion_caste_id: casteID,
      member_caste_id: '',
      member_sub_caste_id: '',
    });
    const token = await AsyncStorage.getItem('UserToken');
    dispatch(getCasteByRelisionCaste(casteID, token));
  };

  const onCasteChange = async subCasteID => {
    setData({
      ...data,
      member_caste_id: subCasteID,
      member_sub_caste_id: '',
    });
    const token = await AsyncStorage.getItem('UserToken');
    dispatch(getSubCasteByCaste(subCasteID, token));
  };

  const handleTextChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  // save button
  const saveData = async () => {
    try {
      const token = await AsyncStorage.getItem('UserToken');
      const res = await updateUserSocial(data, token);

      if (res.success) {
        setModalType('success');
        setModalMessage(res.message || 'Social background updated successfully!');
        setNextScreen({ name: 'Dashboard', params: { screen: 'Profile' } });
      } else {
        setModalType('error');
        setModalMessage(res.message || 'Something went wrong');
        setNextScreen(null);
      }
      setModalVisible(true);
    } catch (err) {
      setModalType('error');
      setModalMessage('API call failed!');
      setModalVisible(true);
    }
  };

  // next button
  const NextBtn = async () => {
    try {
      const token = await AsyncStorage.getItem('UserToken');
      const res = await updateUserSocial(data, token);

      if (res.success) {
        setModalType('success');
        setModalMessage(res.message || 'Social background updated successfully!');
        setNextScreen({ name: 'identityVerification' });
      } else {
        setModalType('error');
        setModalMessage(res.message || 'Something went wrong');
        setNextScreen(null);
      }
      setModalVisible(true);
    } catch (err) {
      setModalType('error');
      setModalMessage('API call failed!');
      setModalVisible(true);
    }
  };

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Religious & Cultural Identity"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />

        <View style={styles.inputView}>
          {/* Religion */}
          <SelectDropdown
            data={religion_list ?? []}
            value={data?.member_religion_id}
            label="Religion"
            placeholder="Select Religion"
            onSelectChange={value => onReligionChange(value)}
          />

          {/* Categories */}
          <SelectDropdown
            data={religionCaste ?? []}
            value={data?.member_religion_caste_id}
            label="Categories"
            placeholder="Select Category"
            onSelectChange={value => onReligionCasteChange(value)}
          />

          {/* Caste */}
          <SelectDropdown
            data={caste ?? []}
            value={data?.member_caste_id}
            label="Caste"
            placeholder="Select Caste"
            onSelectChange={value => onCasteChange(value)}
          />

          {/* Sub Caste */}
          <SelectDropdown
            data={subCaste ?? []}
            value={data?.member_sub_caste_id}
            label="Sub Caste"
            placeholder="Select Sub Caste"
            onSelectChange={value => handleTextChange('member_sub_caste_id', value)}
          />
        </View>

        {/* Buttons */}
      </Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
          }}
        >
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

      {/* Status Modal */}
      <StatusModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={() => {
          setModalVisible(false);
          if (modalType === 'success' && nextScreen) {
            navigation.navigate(nextScreen.name, nextScreen.params);
          }
        }}
      />
    </Container>
  );
};

export default SocialBackground;
