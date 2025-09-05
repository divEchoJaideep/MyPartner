import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Content, Header} from '../../components';
import DatePickerInput from '../../components/DatePickerInput';
import TextInputScreen from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import CommanText from '../../components/CommanText';
import {useNavigation} from '@react-navigation/native';
import Error from '../../components/Error';
import {connect} from 'react-redux';
import {
  selectedDiet,
  selectedDrink,
  selectedSmoke,
} from '../../actions/AppAction';
import UpdateLifestyle from '../../api/updateLifestyle';
import SelectDropdown from '../../components/SelectDropdown/Select';
import Loading from '../../components/Loading';
import GetLifestyle from '../../api/GetLifestyle';

const option = [
  {id: '1', name: 'Yes'},
  {id: '2', name: 'No'},
];

const Lifestyle = props => {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState();
  const [data, setData] = useState({
    diet: '',
    drink: '',
    smoke: '',
  });
  useEffect(() => {
    getLifestyle();
  }, []);

  const getLifestyle = async () => {
    setLoading(true);
    const response = await GetLifestyle({token: props.token});
    console.log('get lifestyle api : ', response.data);
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
    if (!data.diet || !data.drink || !data.smoke) {
      console.log('data if: ', data);
      setError('Please enter details.');
      return;
    }

    const response = await UpdateLifestyle({data: data, token: props.token});
    console.log('response : ', response);
    if (!response.success) {
      setError(response.message);
      return;
    }
    await props.diet(data.diet);
    await props.drink(data.drink);
    await props.smoke(data.smoke);

    navigation.navigate('Astronomic');
  };
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Lifestyle"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />
        <View style={styles.inputView}>
          <CommanText commanText="Diet" commanTextstyle={styles.birthdayText} />
          <TextInputScreen
            defaultInput
            placeholder="diet"
            value={data?.diet}
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('diet', text)}
          />
          <SelectDropdown
            data={option}
            value={data?.drink}
            label="Drink"
            placeholder="drink"
            onSelectChange={value => handleTextChange('drink', value)}
          />
          <SelectDropdown
            data={option}
            value={data?.smoke}
            label="Smoke"
            placeholder="smoke"
            onSelectChange={value => handleTextChange('smoke', value)}
          />
        </View>
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
  // console.log('state data :',state.lifestyle);
  return {
    token: state.auth.user.access_token,
    diet: state.lifestyle.diet,
    drink: state.lifestyle.drink,
    smoke: state.lifestyle.smoke,
  };
}

const mapDispatchToProps = dispatch => ({
  selectedDiet: data => dispatch(selectedDiet(data)),
  selectedDrink: data => dispatch(selectedDrink(data)),
  selectedSmoke: data => dispatch(selectedSmoke(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Lifestyle);
