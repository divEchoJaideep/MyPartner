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
import {countryList, stateList} from '../../actions/AppAction';
import {connect} from 'react-redux';
import GetCities from '../../api/GetCities';
import Error from '../../components/Error';
import UpdateAddress from '../../api/updateAddress';
import GetPermanentAddress from '../../api/GetPermanentAddress';

const PermanentAddress = props => {
  const navigation = useNavigation();
  const [cityList, setCityList] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState();
  const [data, setData] = useState({
    address_type: 'permanent',
    country_id: 101,
    state_id: '',
    city_id: '',
    postal_code: '',
    city_name: '',
    address: '',
  });
  useEffect(() => {
    getPermanentAddress();
  }, []);

  const getPermanentAddress = async () => {
    setLoading(true);
    const response = await GetPermanentAddress({token: props.token});
    if (response && response.data) {
      setData(response.data);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  const handleTextChange = (key, value) => {
    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const onStateChange = async stateID => {
    const response = await GetCities({
      stateID: stateID,
      token: props?.token,
    });

    if (response.data) {
      setCityList(response.data);
    }
  };
  const NextStep = async () => {
    // if (
    //   !data.country_id ||
    //   !data.state_id ||
    //   !data.city_id ||
    //   !data.city_name ||
    //   !data.address ||
    //   !data.postal_code
    // ) {
    //   setError('Please enter details.');
    //   return;
    // }

    const response = await UpdateAddress({data: data, token: props.token});
    if (!response.success) {
      setError(response.message);
      return;
    }
    await props.country_id(data.country_id);
    await props.state_id(data.state_id);
    await props.address_type(data.address_type);
    await props.city_id(data.city_id);
    await props.postal_code(data.postal_code);
    await props.city_name(data.city_name);
    await props.address(data.address);

    navigation.navigate('Family');
  };

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Permanent Address"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <Error error={error} />
        <View style={styles.inputView}>
          <CommanText
            commanText="Country"
            commanTextstyle={styles.birthdayText}
          />
          <CommanText
            commanText="India"
            commanTextstyle={styles.indiaTextStyle}
          />
          <SelectDropdown
            data={props?.state_list}
            value={data?.state_id}
            label="Select State"
            placeholder="Select your state"
            searchPlaceholder="Search state"
            onSelectChange={value => {
              handleTextChange('state_id', value);
              onStateChange(value);
            }}
          />
          {cityList && cityList.length > 0 && (
            <SelectDropdown
              data={cityList}
              value={data?.city_id}
              label="Select District"
              placeholder="Chose your District"
              searchPlaceholder="Search District"
              onSelectChange={value => {
                handleTextChange('city_id', value);
              }}
            />
          )}
          <CommanText commanText="City" commanTextstyle={styles.birthdayText} />
          <TextInputScreen
            defaultInput
            value={data?.city_name}
            placeholder="City"
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('city_name', text)}
          />
          <CommanText
            commanText="Address"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            value={data?.address}
            placeholder="Address"
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('address', text)}
          />
          <CommanText
            commanText="Postal code"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            value={data?.postal_code}
            placeholder="Postal code"
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('postal_code', text)}
          />
        </View>
        <CommanBtnScreen
          btnText="Next"
          onBtnPress={() => NextStep()}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.btnStyle}
        />
      </Content>
    </Container>
  );
};
function mapStateToProps(state) {
  // console.log('presentAddress Screen: ', state);
  return {
    token: state.auth.user.access_token,
    country_list: state.country.country_list,
    state_list: state.state.state_list,
    //updateaddress state
    country_id: state.address.country_id,
    state_id: state.address.state_id,
    address_type: state.address.address_type,
    city_id: state.address.city_id,
    postal_code: state.address.postal_code,
    city_name: state.address.city_name,
    address: state.address.address,
  };
}

const mapDispatchToProps = dispatch => ({
  countryList: data => dispatch(countryList(data)),
  stateList: data => dispatch(stateList(data)),
  //updateAddress redux
  selectedCountry: data => dispatch(selectedCountry(data)),
  selectedState: data => dispatch(selectedState(data)),
  selectedCity: data => dispatch(selectedCity(data)),
  cityName: data => dispatch(cityName(data)),
  addressName: data => dispatch(addressName(data)),
  addressType: data => dispatch(addressType(data)),
  postalCode: data => dispatch(postalCode(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PermanentAddress);
