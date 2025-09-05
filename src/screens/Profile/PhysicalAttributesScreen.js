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
import { savePhysicalAttribute } from '../../redux/actions/userDetailsActions'
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetProfileDropdown, updateUserPhysical } from '../../api/api';
import StatusModal from '../../components/StatusModal/StatusModal';

const body_type = [
  { id: 1, name: "Physically Fit" },
  { id: 2, name: "Specially Abled" }
];

const PhysicalAttributes = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { language_list } = useSelector((state) => state.preList);
  const { userPhysicalAttributes, loading } = useSelector((state) => state.userDetails);

  const [error, setError] = useState('');
  const [height, setHeight] = useState([]);
  const [data, setData] = useState({
    body_type: '',
    height: '',
  });

  // ✅ Modal States
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); 
  const [modalMessage, setModalMessage] = useState('');
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    const fetchDropdown = async () => {
      try {
        const token = await AsyncStorage.getItem('UserToken');
        const res = await GetProfileDropdown(token);

        if (res.success) {
          setHeight(res.data?.height_list || []);
        }
      } catch (err) {}
    };

    fetchDropdown();
  }, []);

  useEffect(() => {
    if (userPhysicalAttributes) {
      setData({
        height: userPhysicalAttributes.height || '',
        body_type: Number(userPhysicalAttributes.body_type) || '',
      });
    }
  }, [userPhysicalAttributes, loading]);

  const handleTextChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  // ✅ Common API Call
  const handleSubmit = async (type) => {
    try {
      setActionType(type); // save / next
      const token = await AsyncStorage.getItem('UserToken');
      const res = await updateUserPhysical(data, token);

      if (res.success) {
        setModalType('success');
        setModalMessage(res.message || 'Physical attributes updated successfully!');
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

  // ✅ Modal Close Handling
  const handleModalClose = () => {
    setModalVisible(false);

    if (modalType === 'success') {
      if (actionType === 'next') {
        navigation.navigate('Language');   // Next btn
      } else if (actionType === 'save') {
        navigation.navigate('Dashboard', { screen: 'Profile' }); // Save btn
      }
    }
  };

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Personality"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />
        <View style={styles.inputView}>
          <SelectDropdown
            data={body_type ?? []}
            label="Physical Status"
            value={data?.body_type}
            placeholder="Physical Status"
            dropDownStyle={styles.inputStyle}
            onSelectChange={value => handleTextChange('body_type', value)}
          />
          <CommanText
            commanText="Height"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            value={data?.height}
            placeholder="Height"
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('height', text)}
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
            onBtnPress={() => handleSubmit('save')}
            commanBtnTextStyle={styles.commanBtnTextStyle}
            commanBtnStyle={styles.twoBtnStyle}
          />
          <CommanBtnScreen
            btnText="Next"
            onBtnPress={() => handleSubmit('next')}
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

export default PhysicalAttributes;
