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
import StatusModal from '../../components/StatusModal/StatusModal';
import { savePhysicalAttribute } from '../../redux/actions/userDetailsActions';

const body_type = [
  { id: 1, name: "Physically Fit" },
  { id: 2, name: "Specially Abled" }
];

const PhysicalAttributes = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const { userPhysicalAttributes, loading, error } = useSelector((state) => state.userDetails);

  const [data, setData] = useState({ body_type: '', height: '' });

  // const [modalVisible, setModalVisible] = useState(false);
  // const [modalType, setModalType] = useState('');
  // const [modalMessage, setModalMessage] = useState('');
  // const [actionType, setActionType] = useState('');

  useEffect(() => {
    if (userPhysicalAttributes) {
      setData({
        height: userPhysicalAttributes.height || '',
        body_type: Number(userPhysicalAttributes.body_type) || '',
      });
    }
  }, [userPhysicalAttributes]);

  const handleTextChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const saveData = async () => {
    const res = await dispatch(savePhysicalAttribute(data, token));
    if (res.success) {
      navigation.navigate('Dashboard', { screen: 'Profile' });
    }
  };

  const NextBtn = async () => {
    const res = await dispatch(savePhysicalAttribute(data, token));
    if (res.success) {
      navigation.navigate('Language');
    }
  };


  // const handleModalClose = () => {
  //   setModalVisible(false);

  //   if (modalType === 'success') {
  //     if (actionType === 'next') {
  //       navigation.navigate('Language');
  //     } else if (actionType === 'save') {
  //       navigation.navigate('Dashboard', { screen: 'Profile' });
  //     }
  //   }
  // };

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
        {/* <Error error={error} /> */}
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
          <CommanText commanText="Height" commanTextstyle={styles.birthdayText} />
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
          onBtnPress={() => saveData()}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.twoBtnStyle}
        />
        <CommanBtnScreen
          btnText="Next"
          onBtnPress={() => NextBtn()}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={[styles.twoBtnStyle, styles.btnBg]}
        />
      </View>

      {/* <StatusModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={handleModalClose}
      /> */}
    </Container>
  );
};

export default PhysicalAttributes;
