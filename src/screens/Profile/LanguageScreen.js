import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Content, Header } from '../../components';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from '../../components/SelectDropdown/Select';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { getUserAllDetails } from '../../api/api';
import { saveUserLanguage } from '../../redux/actions/userDetailsActions';

const LanguageScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { language_list } = useSelector(state => state.preList);
  const { userLanguage, loading, error } = useSelector(state => state.userDetails);
  const token = useSelector(state => state.auth.token);

  const [data, setData] = useState({ known_languages: [] });

  useEffect(() => {
    getUserFullDetails();
  }, []);

  const getUserFullDetails = async () => {
    try {
      const res = await getUserAllDetails(token);
      if (res?.success) {
        setData({
          known_languages: res?.data?.language?.map(l => l.id.toString()) || [],
        });
      }
    } catch (err) {
      console.log('getUserFullDetails Error:', err);
    }
  };

  const handleTextChange = (key, value) => {
    setData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const res = await dispatch(saveUserLanguage(data, token));
    if (res.success) {
      navigation.navigate('Dashboard', { screen: 'Profile' });
    }
  };

  const nextStep = async () => {
    const res = await dispatch(saveUserLanguage(data, token));
    if (res.success) {
      navigation.navigate('Social');
    }
  };

  return (
    <Container paddingBottomContainer={true}>
      <Header
        transparent
        hasBackBtn
        title="Language"
        hasHomeBTN
        onHomeBTN={() => navigation.navigate('Dashboard', { screen: 'Profile' })}
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />

        <View style={styles.inputView}>
          <SelectDropdown
            MultiSelectDropdown
            data={language_list?.map(item => ({
              id: item.id.toString(),
              name: item.name,
            })) ?? []}
            value={data.known_languages}
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
          onBtnPress={handleSubmit}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.twoBtnStyle}
        />
        <CommanBtnScreen
          btnText="Next"
          onBtnPress={nextStep}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={[styles.twoBtnStyle, styles.btnBg]}
        />
      </View>
    </Container>
  );
};

export default LanguageScreen;
