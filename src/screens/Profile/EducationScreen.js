import { View } from 'react-native';
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

const qualification = [
  { id: 1, name: 'Highest Qualification' },
  { id: 2, name: 'Professional Degree' },
  { id: 3, name: 'Other Achievements' }
];

const EducationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const tokenRedux = useSelector(state => state.auth.token);
  const { highest_education_list } = useSelector(state => state.preList);
  const userEducation = useSelector(state => state.userDetails.userEducation);
  const loading = useSelector(state => state.userDetails.loading);

  const [data, setData] = useState({
    education_type: '',
    institution: '',
  });

  const [educationOptions, setEducationOptions] = useState([]);

  useEffect(() => {
    if (userEducation) {
      setData({
        education_type: String(userEducation.education_type) || '',
        institution: String(userEducation.institution) || '',
      });
    }

    if (highest_education_list?.length) {
      setEducationOptions(
        highest_education_list.map(item => ({
          id: String(item.id),
          name: item.title,
        }))
      );
    }
  }, [userEducation, highest_education_list]);

  const handleTextChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const saveData = async () => {
    const res = await dispatch(saveUserEducation(data, tokenRedux));
    if (res?.success) {
      navigation.navigate('Dashboard', { screen: 'Profile' });
    }
  };

  const NextBtn = async () => {
    const res = await dispatch(saveUserEducation(data, tokenRedux));
    if (res?.success) {
      navigation.navigate('Career');
    }
  };

  return (
    <Container paddingBottomContainer={true}>
      <Header
        transparent
        hasBackBtn
        hasHomeBTN
        onHomeBTN={() =>navigation.navigate('Dashboard', { screen: 'Profile' }) }
        onBackPress={() => navigation.goBack()}
        title="Education"
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <Error error={null} />
        <Loading loading={loading} />
        <View>
          <SelectDropdown
            data={qualification}
            label="Education"
            value={qualification.find(item => String(item.id) === String(data?.education_type))}
            placeholder="Select Education Type"
            dropDownStyle={styles.inputStyle}
            onSelectChange={value => handleTextChange('education_type', value)}
          />

          {data?.education_type == 1 ? (
            <SelectDropdown
              data={educationOptions}
              label="Qualification"
              value={data?.institution}
              placeholder="Select Qualification"
              dropDownStyle={styles.inputStyle}
              onSelectChange={value => handleTextChange('institution', value)}
            />
          ) : (
            <>
              <CommanText
                commanText={data?.education_type == 3 ? "Other Achievements" : "Professional Degree / Diploma"}
                commanTextstyle={styles.birthdayText}
              />
              <TextInputScreen
                defaultInput
                value={data?.institution}
                placeholder={data?.education_type == 3 ? "Other Achievements" : "Professional Degree / Diploma"}
                type="default"
                inputStyle={styles.inputStyle}
                onChangeText={text => handleTextChange('institution', text)}
              />
            </>
          )}
        </View>
      </Content>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
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

export default EducationScreen;
