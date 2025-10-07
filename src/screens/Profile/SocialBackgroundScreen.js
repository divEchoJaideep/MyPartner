import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Content, Header } from '../../components';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from '../../components/SelectDropdown/Select';
import { useDispatch, useSelector } from 'react-redux';

import StatusModal from '../../components/StatusModal/StatusModal';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { getCasteByRelisionCaste, getReligionCasteByRelisionId, getSubCasteByCaste, updateReligionAndCulture, } from '../../redux/actions/userDetailsActions';

const SocialBackground = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { family_value_list, religion_list, religionCaste, caste, subCaste } =
    useSelector(state => state.preList);
  const userReligionInfo = useSelector(state => state.userDetails.userReligion);
  const token = useSelector(state => state.auth.token);

  const [formData, setFormData] = useState({
    member_religion_id: '',
    member_religion_caste_id: '',
    member_caste_id: '',
    member_sub_caste_id: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [nextScreen, setNextScreen] = useState(null);

  // Fetch user data on mount
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const religionData = userReligionInfo

      setFormData({
        member_religion_id: religionData.member_religion_id || '',
        member_religion_caste_id: religionData.member_religion_caste_id || '',
        member_caste_id: religionData.member_caste_id || '',
        member_sub_caste_id: religionData.member_sub_caste_id || '',
      });


      if (religionData.member_religion_id) {
        dispatch(getReligionCasteByRelisionId(religionData.member_religion_id, token));
      }
      if (religionData.member_religion_caste_id) {
        dispatch(getCasteByRelisionCaste(religionData.member_religion_caste_id, token));
      }
      if (religionData.member_caste_id) {
        dispatch(getSubCasteByCaste(religionData.member_caste_id, token));
      }
    } catch (err) {
      console.log('Error fetching user details: ', err);
    }
  };

  const handleChange = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const onReligionChange = async (id) => {
    handleChange('member_religion_id', id);
    handleChange('member_religion_caste_id', '');
    handleChange('member_caste_id', '');
    handleChange('member_sub_caste_id', '');
    dispatch(getReligionCasteByRelisionId(id, token));
  };

  const onReligionCasteChange = async (id) => {
    handleChange('member_religion_caste_id', id);
    handleChange('member_caste_id', '');
    handleChange('member_sub_caste_id', '');
    dispatch(getCasteByRelisionCaste(id, token));
  };

  const onCasteChange = async (id) => {
    handleChange('member_caste_id', id);
    handleChange('member_sub_caste_id', '');
    dispatch(getSubCasteByCaste(id, token));
  };

  const saveData = async () => {
    try {
      const res = await dispatch(updateReligionAndCulture(formData, token));
      if (res.success) {
        navigation.navigate({ name: 'Dashboard', params: { screen: 'Profile' } });
      }
    } catch (err) { }
  };

  const nextStep = async () => {
    try {
      const res = await dispatch(updateReligionAndCulture(formData, token));
      if (res.success) navigation.navigate('identityVerification');
    } catch (err) { }
  };

  return (
    <Container paddingBottomContainer={true}>
      <Header
        transparent
        hasBackBtn
        title="Religious & Cultural Identity"
        hasHomeBTN
        onHomeBTN={() => navigation.navigate('Dashboard', { screen: 'Profile' })}
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>


        <View style={styles.inputView}>
          <SelectDropdown
            data={religion_list ?? []}
            value={formData.member_religion_id}
            label="Religion"
            placeholder="Select Religion"
            onSelectChange={onReligionChange}
          />
          <SelectDropdown
            data={religionCaste ?? []}
            value={formData.member_religion_caste_id}
            label="Categories"
            placeholder="Select Category"
            onSelectChange={onReligionCasteChange}
          />
          <SelectDropdown
            data={caste ?? []}
            value={formData.member_caste_id}
            label="Caste"
            placeholder="Select Caste"
            onSelectChange={onCasteChange}
          />
          <SelectDropdown
            data={subCaste ?? []}
            value={formData.member_sub_caste_id}
            label="Sub Caste"
            placeholder="Select Sub Caste"
            onSelectChange={(value) => handleChange('member_sub_caste_id', value)}
          />
        </View>
      </Content>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <CommanBtnScreen btnText="Save" onBtnPress={saveData} commanBtnTextStyle={styles.commanBtnTextStyle} commanBtnStyle={styles.twoBtnStyle} />
        <CommanBtnScreen btnText="Next" onBtnPress={nextStep} commanBtnTextStyle={styles.commanBtnTextStyle} commanBtnStyle={[styles.twoBtnStyle, styles.btnBg]} />
      </View>

      <StatusModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={() => {
          setModalVisible(false);
          if (modalType === 'success' && nextScreen) navigation.navigate(nextScreen.name, nextScreen.params);
        }}
      />
    </Container>
  );
};

export default SocialBackground;
