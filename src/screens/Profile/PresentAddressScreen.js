import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
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
import { getCityListByStateId } from '../../redux/actions/userDetailsActions';
import { updateUserAddress } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatusModal from '../../components/StatusModal/StatusModal';
import { address } from '../../redux/reducers/userDetailsReducer';


const PresentAddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Redux states
  const tokenRedux = useSelector((state) => state.auth.user.access_token);
  const { country_list, state_list, city_list } = useSelector((state) => state.preList);
  const userAddress = useSelector((state) => state.userDetails.userAddress);
  const loading = useSelector((state) => state.userDetails.loading);

  // Local states
  const [error, setError] = useState('');
  const [data, setData] = useState({
    address_type: 'present',
    country_id: 101,
    state_id: '',
    city_id: '',
    postal_code: '',
    city_name: '',
    address: '',
  });

  console.log('data present address', data);
  
  // Status modal state
const [modalVisible, setModalVisible] = useState(false);
const [modalType, setModalType] = useState(''); // success | error
const [modalMessage, setModalMessage] = useState('');
const [nextScreen, setNextScreen] = useState(null);


  useEffect(() => {
    if (userAddress) {
      setData((prev) => ({
        ...prev,
        ...userAddress,
        country_id: userAddress.country_id || 101,
      }));
    }
  }, [userAddress]);

  const handleTextChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const onStateChange = (stateID) => {
    dispatch(getCityListByStateId(stateID, tokenRedux));
  };

// Save Address



const saveAddress = async () => {
  try {
    const token = await AsyncStorage.getItem('UserToken');
    const res = await updateUserAddress(data, token);

    if (res?.success === true) {
     dispatch(address(data));

      setModalType('success');
      setModalMessage(res.message || 'Address updated successfully!');
      setNextScreen({ name: 'Dashboard', params: { screen: 'Profile' } }); // yaha navigate na karo
    } else {
      setModalType('error');
      setModalMessage(res?.message || 'Something went wrong');
      setNextScreen(null);
    }
    setModalVisible(true);

  } catch (err) {
    setModalType('error');
    setModalMessage('API call failed!');
    setNextScreen(null);
    setModalVisible(true);
  }
};

// Next Button
const NextBtn = async () => {
  try {
    const token = await AsyncStorage.getItem('UserToken');
    const res = await updateUserAddress(data, token);

    if (res?.success === true) {
       dispatch(address(data));
      dispatch(userAddress(data));
      setModalType('success');
      setModalMessage(res.message || 'Address updated successfully!');
      setNextScreen({ name: 'Education' }); 
    } else {
      setModalType('error');
      setModalMessage(res?.message || 'Something went wrong');
      setNextScreen(null);
    }
    setModalVisible(true);

  } catch (err) {
    setModalType('error');
    setModalMessage('API call failed!');
    setNextScreen(null);
    setModalVisible(true);
  }
};


  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Present Address"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />

        <View style={styles.inputView}>
          <SelectDropdown
            data={country_list ?? []}
            value={data?.country_id}
            label="Select Country"
            placeholder="Select your country"
            searchPlaceholder="Search country"
            onSelectChange={(value) => {
              handleTextChange('country_id', value);
              onStateChange(value);
            }}
          />

          <SelectDropdown
            data={state_list ?? []}
            value={data?.state_id}
            label="Select State"
            placeholder="Select your state"
            searchPlaceholder="Search state"
            onSelectChange={(value) => {
              handleTextChange('state_id', value);
              onStateChange(value);
            }}
          />

          <SelectDropdown
            data={city_list ?? []}
            value={data?.city_id}
            label="Select District"
            placeholder="Choose your District"
            searchPlaceholder="Search District"
            onSelectChange={(value) => {
              handleTextChange('city_id', value);
            }}
          />

          <CommanText commanText="Block/Tehsil" commanTextstyle={styles.birthdayText} />
          <TextInputScreen
            defaultInput
            value={data?.city_name}
            placeholder="Block/Tehsil"
            inputStyle={styles.inputStyle}
            onChangeText={(text) => handleTextChange('city_name', text)}
          />

          <CommanText commanText="Village / City" commanTextstyle={styles.birthdayText} />
          <TextInputScreen
            defaultInput
            value={data?.address}
            placeholder="Village / City name"
            inputStyle={styles.inputStyle}
            onChangeText={(text) => handleTextChange('address', text)}
          />

          <CommanText commanText="Postal code" commanTextstyle={styles.birthdayText} />
          <TextInputScreen
            defaultInput
            value={data?.postal_code}
            maxLength={6}
            placeholder="Postal code"
            type="numeric"
            inputStyle={styles.inputStyle}
            onChangeText={(text) => handleTextChange('postal_code', text)}
          />
        </View>

        {/* Buttons */}
      </Content>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <CommanBtnScreen
            btnText="Save"
            onBtnPress={saveAddress}
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

export default PresentAddressScreen;
