import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Content, Header } from '../../components';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import CommanText from '../../components/CommanText';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from '../../components/SelectDropdown/Select';
import { useSelector } from 'react-redux';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetProfileDropdown, getUserAllDetails, upadateUserLanguage } from '../../api/api';
import StatusModal from '../../components/StatusModal/StatusModal';

const LanguageScreen = props => {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [languageOptions, setLanguageOptions] = useState([]);
  const [actionType, setActionType] = useState(''); // save/next track karega

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // success/error
  const [modalMessage, setModalMessage] = useState('');

  const [data, setData] = useState({
    known_languages: [],
  });

  const userLanguage = useSelector(state => state.userDetails.userLanguage);

  useEffect(() => {
    getLanguage();
    getUserFullDetails();
  }, []);

  // Fetch dropdown options
  const getLanguage = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('UserToken');
      const res = await GetProfileDropdown(token);

      if (res?.success) {
        setLanguageOptions(res?.data?.language_list || []);
      } else {
        setError(res?.message || 'Failed to fetch languages');
      }
    } catch (err) {
      console.log('getLanguage Error:', err);
      setError('Something went wrong while fetching languages');
    }
    setLoading(false);
  };

  // Fetch user details
  const getUserFullDetails = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('UserToken');
      const res = await getUserAllDetails(token);

      if (res?.success) {
        setData({
          known_languages: res?.data?.language?.map(l => l.id.toString()) || [],
        });
      } else {
        setError(res?.message || 'Failed to fetch user languages');
      }
    } catch (err) {
      console.log('getUserFullDetails Error:', err);
      setError('Something went wrong while fetching user details');
    }
    setLoading(false);
  };

  const handleTextChange = (key, value) => {
    setData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateUserLanguage = async navigateTo => {
    setLoading(true);
    setActionType(navigateTo); // save/next ka type set ho jayega
    try {
      const token = await AsyncStorage.getItem('UserToken');
      const payload = {
        known_languages: data.known_languages || [],
      };

      const response = await upadateUserLanguage(payload, token);

      if (response?.success) {
        setModalType('success');
        setModalMessage(response?.message || 'Language updated successfully');
      } else {
        setModalType('error');
        setModalMessage(response?.message || 'Failed to update language');
      }
      setModalVisible(true);

    } catch (err) {
      console.log('UpdateLanguage API Error:', err);
      setModalType('error');
      setModalMessage('Something went wrong while updating language');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // Modal close handler
  const handleModalClose = () => {
    setModalVisible(false);
    if (modalType === 'success') {
      if (actionType === 'profile') {
        navigation.navigate('Dashboard', { screen: 'Profile' });
      } else if (actionType === 'social') {
        navigation.navigate('Social');
      }
    }
  };

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Language"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />

        <View style={styles.inputView}>
          {/* Known Languages Dropdown */}
          <SelectDropdown
            MultiSelectDropdown
            data={languageOptions.map(item => ({
              id: item.id.toString(),
              name: item.name,
            }))}
            value={data?.known_languages}
            label="Known Languages"
            placeholder="Select Known Languages"
            onSelectChange={selectedItems => {
              if (!selectedItems) return;
              const idsArray = selectedItems.map(item =>
                item?.id ? item.id.toString() : item.toString()
              );
              handleTextChange('known_languages', idsArray);
            }}
          />
        </View>
      </Content>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}>
        <CommanBtnScreen
          btnText="Save"
          onBtnPress={() => updateUserLanguage('profile')}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.twoBtnStyle}
        />
        <CommanBtnScreen
          btnText="Next"
          onBtnPress={() => updateUserLanguage('social')}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={[styles.twoBtnStyle, styles.btnBg]}
        />
      </View>

      {/* Status Modal */}
      <StatusModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </Container>
  );
};

export default LanguageScreen;
