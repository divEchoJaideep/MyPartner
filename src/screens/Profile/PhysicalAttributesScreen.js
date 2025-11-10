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
import Loading from '../../components/Loading';
import { savePhysicalAttribute, saveUserLanguage } from '../../redux/actions/userDetailsActions';
import { getUserAllDetails } from '../../api/api';

const body_type = [
  { id: 1, name: 'Physically Fit' },
  { id: 2, name: 'Specially Abled' },
];

const PhysicalAttributes = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const { userPhysicalAttributes, loading } = useSelector(state => state.userDetails);
  const { language_list } = useSelector(state => state.preList);

  // 👉 STATES
  const [data, setData] = useState({ body_type: '', height: '' });
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [dataLanguage, setDataLanguage] = useState({ known_languages: [] });
  const [originalPhysical, setOriginalPhysical] = useState({});
  const [originalLanguage, setOriginalLanguage] = useState([]);

  // 🔹 Load user physical attributes
  useEffect(() => {
    if (userPhysicalAttributes?.height) {
      // Expecting format like: "5 feet 9 inches"
      const match = userPhysicalAttributes.height.match(/(\d+)\s*feet\s*(\d+)?/i);
      if (match) {
        setFeet(match[1] || '');
        setInches(match[2] || '');
      }
      setData({
        height: userPhysicalAttributes.height,
        body_type: Number(userPhysicalAttributes.body_type) || '',
      });
      setOriginalPhysical({
        height: userPhysicalAttributes.height,
        body_type: Number(userPhysicalAttributes.body_type) || '',
      });
    }
  }, [userPhysicalAttributes]);

  // 🔹 Update height string dynamically
  useEffect(() => {
    if (feet || inches) {
      const formattedHeight = `${feet ? feet + ' feet' : ''} ${inches ? inches + ' inches' : ''}`.trim();
      setData(prev => ({ ...prev, height: formattedHeight }));
    } else {
      setData(prev => ({ ...prev, height: '' }));
    }
  }, [feet, inches]);

  // 🔹 Get user language details
  useEffect(() => {
    getUserFullDetails();
  }, []);

  const getUserFullDetails = async () => {
    try {
      const res = await getUserAllDetails(token);
      if (res?.success) {
        const langs = res?.data?.language?.map(l => l.id.toString()) || [];
        setDataLanguage({ known_languages: langs });
        setOriginalLanguage(langs);
      }
    } catch (err) {
    }
  };

  const handleTextChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  // 🔹 Detect changes
  const isPhysicalChanged =
    data.body_type !== originalPhysical.body_type ||
    data.height !== originalPhysical.height;

  const isLanguageChanged =
    JSON.stringify([...dataLanguage.known_languages].sort()) !==
    JSON.stringify([...originalLanguage].sort());

  // 🔹 Unified Save Handler
  const handleSave = async navigateTo => {
    try {
      if (isPhysicalChanged) await dispatch(savePhysicalAttribute(data, token));
      if (isLanguageChanged) await dispatch(saveUserLanguage(dataLanguage, token));

      if (navigateTo === 'Profile') {
        navigation.navigate('Dashboard', { screen: 'Profile' });
      } else if (navigateTo) {
        navigation.navigate(navigateTo);
      }
    } catch (err) {
    }
  };

  return (
    <Container paddingBottomContainer={true}>
      <Header
        transparent
        hasBackBtn
        title="Personality"
        hasHomeBTN
        onHomeBTN={() => navigation.navigate('Dashboard', { screen: 'Profile' })}
        onBackPress={() => navigation.goBack()}
      />

      <Content hasHeader contentContainerStyle={styles.container}>
        <Loading loading={loading} />

        {/* 🧍 Physical Attributes */}
        <View style={styles.inputView}>
          <SelectDropdown
            data={body_type ?? []}
            label="Physical Status"
            value={data?.body_type}
            placeholder="Physical Status"
            dropDownStyle={styles.inputStyle}
            onSelectChange={value => handleTextChange('body_type', value)}
          />

          <CommanText commanText="Height" commanTextstyle={styles.birthdayText} />

          <View style={[styles.inputViewWrap, { alignItems: 'center' }]}>
            {/* Feet input */}
            <View style={styles.inputViewBox}>
              <TextInputScreen
                defaultInput
                value={feet}
                placeholder="Feet"
                type="numeric"
                inputStyle={[styles.inputStyle, { flex: 1, textAlign: 'center' }]}
                onChangeText={text => {
                  const clean = text.trim().replace(/[^0-9]/g, '');
                  setFeet(clean);
                }}
                maxLength={1}
              />
              <CommanText
                commanText="Feet"
                commanTextstyle={{ marginLeft: 6, fontSize: 16, color: '#555' }}
              />
            </View>

            {/* Inches input */}
            <View style={styles.inputViewBox}>
              <TextInputScreen
                defaultInput
                value={inches}
                placeholder="Inches"
                type="numeric"
                inputStyle={[styles.inputStyle, { flex: 1, textAlign: 'center' }]}
                onChangeText={text => {
                  const clean = text.trim().replace(/[^0-9]/g, '');
                  setInches(clean);
                }}
                maxLength={2}
              />
              <CommanText
                commanText="Inches"
                commanTextstyle={{ marginLeft: 6, fontSize: 16, color: '#555' }}
              />
            </View>
          </View>

          {/* 🌐 Languages */}
          <View style={styles.inputView}>
            <SelectDropdown
              MultiSelectDropdown
              data={
                language_list?.map(item => ({
                  id: item.id.toString(),
                  name: item.name,
                })) ?? []
              }
              value={dataLanguage.known_languages}
              label="Known Languages"
              placeholder="Select Known Languages"
              onSelectChange={selectedItems => {
                if (!selectedItems) return;
                const idsArray = selectedItems.map(item =>
                  item?.id ? item.id.toString() : item.toString()
                );
                setDataLanguage({ known_languages: idsArray });
              }}
            />
          </View>
        </View>
      </Content>

      {/* ✅ Bottom Buttons */}
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
          onBtnPress={() => handleSave('Profile')}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.twoBtnStyle}
          disabled={loading}
        />
        <CommanBtnScreen
          btnText="Next"
          onBtnPress={() => handleSave('Social')}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={[styles.twoBtnStyle, styles.btnBg]}
          disabled={loading}
        />
      </View>
    </Container>
  );
};

export default PhysicalAttributes;
