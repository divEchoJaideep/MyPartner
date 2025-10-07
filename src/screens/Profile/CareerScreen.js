import { View } from 'react-native';
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
import { saveUserCareerInfo } from '../../redux/actions/userDetailsActions';

const CareerScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const jobtype_list = useSelector((state) => state.preList.jobtype_list);
  const userCareerInfo = useSelector((state) => state.userDetails.userCareerInfo);
  const loading = useSelector((state) => state.userDetails.loading);
  const error = useSelector((state) => state.userDetails.error);

  const [data, setData] = useState({
    job_type: '',
    work_field: '',
    income: '',
  });

  useEffect(() => {
    if (userCareerInfo) {
      setData({
        job_type: userCareerInfo.job_type || '',
        work_field: userCareerInfo.occupation || userCareerInfo.work_field || '',
        income: userCareerInfo.Income || userCareerInfo.income || '',
      });
    }
  }, [userCareerInfo]);

  const handleTextChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const saveData = async () => {
    try {
      const res = await dispatch(saveUserCareerInfo(data, token));
      if (res?.success) {
        navigation.navigate('Dashboard', { screen: 'Profile' });
      }
    } catch (err) {
      // console.log('error saving career info', err);
    }
  };

  const NextBtn = async () => {
    try {
      const res = await dispatch(saveUserCareerInfo(data, token));
      if (res?.success) {
        navigation.navigate('Physical');
      }
    } catch (err) {
      // console.log('error next career info', err);
    }
  };

  return (
    <Container paddingBottomContainer={true}>
      <Header
        transparent
        hasBackBtn
        title="Career Details"
        hasHomeBTN
        onHomeBTN={() => navigation.navigate('Dashboard', { screen: 'Profile' })}
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        {/* <Error error={error} /> */}
        <Loading loading={loading} />
        <View>
          <SelectDropdown
            data={jobtype_list ?? []}
            label="Job Type"
            value={data?.job_type}
            placeholder="Job Type"
            onSelectChange={(value) => handleTextChange('job_type', value)}
          />
          <CommanText commanText="Occupation" commanTextstyle={styles.birthdayText} />
          <TextInputScreen
            defaultInput
            value={data?.work_field}
            placeholder="Occupation (work field)"
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={(text) => handleTextChange('work_field', text)}
          />
          <CommanText commanText="Monthly Income (₹)" commanTextstyle={styles.birthdayText} />
          <TextInputScreen
            defaultInput
            value={data?.income}
            placeholder="Monthly Income (₹)"
            type="numeric"
            inputStyle={styles.inputStyle}
            onChangeText={(text) => handleTextChange('income', text)}
          />
        </View>
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
    </Container>
  );
};

export default CareerScreen;
