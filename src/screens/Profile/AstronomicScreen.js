import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Content, Header} from '../../components';
import DatePickerInput from '../../components/DatePickerInput';
import TextInputScreen from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import CommanText from '../../components/CommanText';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from '../../components/SelectDropdown/Select';
import {
  selectedCityOfBirth,
  selectedManglik,
  selectedTimeOfBirth,
} from '../../actions/AppAction';
import {connect} from 'react-redux';
import Error from '../../components/Error';
import UpdateAstronomic from '../../api/updateAstronomic';
import Loading from '../../components/Loading';
import GetAstronomic from '../../api/GetAstronomic';

const option = [
  {id: 1, name: 'Yes '},
  {id: 0, name: 'No '},
];
const Astronomic = props => {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState();
  const [data, setData] = useState({
    time_of_birth: '',
    city_of_birth: '',
    manglik: '',
  });
  useEffect(() => {
    getAstronomic();
  }, []);

  const getAstronomic = async () => {
    setLoading(true);
    const response = await GetAstronomic({token: props.token});
    console.log('get astronomic api : ', response.data);
    if (response && response.data) {
      setData(response.data);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };
  const handleTextChange = (key, value) => {
    console.log('key', key, value);
    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };
  const NextStep = async () => {
    if (!data.time_of_birth || !data.city_of_birth || !data.manglik) {
      console.log('data if: ', data);
      setError('Please enter details.');
      return;
    }

    const response = await UpdateAstronomic({data: data, token: props.token});
    console.log('response : ', response);
    if (!response.success) {
      setError(response.message);
      return;
    }
    await props.time_of_birth(data.time_of_birth);
    await props.city_of_birth(data.city_of_birth);
    await props.manglik(data.manglik);

    navigation.navigate('PermanentAddress');
  };
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Astronomic Information"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />
        <View style={styles.inputView}>
          <CommanText
            commanText="Time Of Birth"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            placeholder="time Of birth"
            value={data?.time_of_birth}
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('time_of_birth', text)}
          />
          <CommanText
            commanText="City Of Birth"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            placeholder="city Of birth"
            value={data?.city_of_birth}
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('city_of_birth', text)}
          />
        </View>
        <SelectDropdown
          data={option}
          value={data?.manglik}
          label="Manglik"
          placeholder="Select"
          onSelectChange={value => handleTextChange('manglik', value)}
        />
        <CommanBtnScreen
          btnText="Next"
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.btnStyle}
          onBtnPress={() => NextStep()}
        />
      </Content>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    token: state.auth.user.access_token,
    time_of_birth: state.astronomic.time_of_birth,
    city_of_birth: state.astronomic.city_of_birth,
    manglik: state.astronomic.manglik,
  };
}

const mapDispatchToProps = dispatch => ({
  selectedTimeOfBirth: data => dispatch(selectedTimeOfBirth(data)),
  selectedCityOfBirth: data => dispatch(selectedCityOfBirth(data)),
  selectedManglik: data => dispatch(selectedManglik(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Astronomic);
