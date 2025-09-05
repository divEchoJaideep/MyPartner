import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Content, Header} from '../../components';
import TextInputScreen from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import CommanText from '../../components/CommanText';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from '../../components/SelectDropdown/Select';
import {connect} from 'react-redux';
import {
  selectedDrinking,
  selectedPartnerBodyType,
  selectedPartnerComplexion,
  selectedPartnerDiet,
  selectedPartnerFamilyValue,
  selectedPartnerJobtype,
  selectedPartnerLanguage,
  selectedPartnerManglik,
  selectedSmoking,
} from '../../actions/AppAction';
import UpdatePartner from '../../api/updatePartner';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import GetPartnerExpectation from '../../api/GetPartnerExpectation';

const option = [
  {id: '1', name: 'Yes '},
  {id: '0', name: 'No '},
  {id: '2', name: "Doesn't Matter "},
  {id: '3', name: 'Occasionally '},
];
const PartnerExpectation2 = props => {
  // console.log('partner props: ', props.partner);

  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState();
  const [data, setData] = useState({
    job_type: '',
    smoking_acceptable: '',
    drinking_acceptable: '',
    partner_diet: '',
    partner_body_type: '',
    partner_manglik: '',
    language_id: '',
    family_value_id: '',
    partner_complexion: '',
  });
  useEffect(() => {
    getPartnerExpectation();
  }, []);

  const getPartnerExpectation = async () => {
    setLoading(true);
    const response = await GetPartnerExpectation({token: props.token});
    console.log('get partner2 api : ', response.data);
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
    // if (
    //   !data.job_type ||
    //   !data.smoking_acceptable ||
    //   !data.drinking_acceptable ||
    //   !data.partner_diet ||
    //   !data.partner_body_type ||
    //   !data.partner_manglik ||
    //   !data.language_id ||
    //   !data.family_value_id ||
    //   !data.partner_complexion
    // ) {
    //   console.log('data if: ', data);
    //   setError('Please enter details.');
    //   return;
    // }

    const response = await UpdatePartner({
      data: props.partner,
      token: props.token,
    });
    console.log('response : ', response);
    if (!response.success) {
      setError(response.message);
      return;
    }
    await props.job_type(data.job_type);
    await props.smoking_acceptable(data.smoking_acceptable);
    await props.drinking_acceptable(data.drinking_acceptable);
    await props.partner_diet(data.partner_diet);
    await props.partner_body_type(data.partner_body_type);
    await props.partner_manglik(data.partner_manglik);
    await props.language_id(data.language_id);
    await props.family_value_id(data.family_value_id);
    await props.partner_complexion(data.partner_complexion);
    navigation.navigate('Dashboard');
  };
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Partner Expectation"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />
        <View style={styles.inputView}>
          <SelectDropdown
            data={props?.jobtype_list}
            value={data?.job_type}
            label="Job Type"
            placeholder="job type"
            onSelectChange={value => handleTextChange('job_type', value)}
          />
          <SelectDropdown
            data={props?.language_list}
            value={data?.language_id}
            label="Language"
            placeholder="language"
            onSelectChange={value => handleTextChange('language_id', value)}
          />
          <SelectDropdown
            data={option}
            value={data?.smoking_acceptable}
            label="Smoking Acceptable"
            placeholder="Select"
            onSelectChange={value =>
              handleTextChange('smoking_acceptable', value)
            }
          />
          <SelectDropdown
            data={option}
            value={data?.drinking_acceptable}
            label="Drinking Acceptable"
            placeholder="Select"
            onSelectChange={value =>
              handleTextChange('drinking_acceptable', value)
            }
          />

          <CommanText commanText="Diet" commanTextstyle={styles.birthdayText} />
          <TextInputScreen
            defaultInput
            value={data?.partner_diet}
            placeholder="diet"
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('partner_diet', text)}
          />
          <CommanText
            commanText="Body Type"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            value={data?.partner_body_type}
            placeholder="body type"
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('partner_body_type', text)}
          />
          <SelectDropdown
            data={option}
            value={data?.partner_manglik}
            label="Manglik"
            placeholder="Select"
            onSelectChange={value => handleTextChange('partner_manglik', value)}
          />
          <SelectDropdown
            data={props?.family_value_list}
            value={data?.family_value_id}
            label="Family Value"
            placeholder="family value"
            onSelectChange={value => handleTextChange('family_value_id', value)}
          />
          <SelectDropdown
            data={props?.colour_list}
            value={data?.partner_complexion}
            label="Colour"
            placeholder="colour"
            onSelectChange={value =>
              handleTextChange('partner_complexion', value)
            }
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
  return {
    token: state.auth.user.access_token,
    language_list: state.language.language_list,
    family_value_list: state.family.family_value_list,
    colour_list: state.colour.colour_list,
    jobtype_list: state.jobtype.jobtype_list,
    //update partner
    partner: state.updatePartner,
  };
}

const mapDispatchToProps = dispatch => ({
  //update partner
  selectedPartnerJobtype: data => dispatch(selectedPartnerJobtype(data)),
  selectedPartnerLanguage: data => dispatch(selectedPartnerLanguage(data)),
  selectedSmoking: data => dispatch(selectedSmoking(data)),
  selectedDrinking: data => dispatch(selectedDrinking(data)),
  selectedPartnerDiet: data => dispatch(selectedPartnerDiet(data)),
  selectedPartnerBodyType: data => dispatch(selectedPartnerBodyType(data)),
  selectedPartnerManglik: data => dispatch(selectedPartnerManglik(data)),
  selectedPartnerFamilyValue: data =>
    dispatch(selectedPartnerFamilyValue(data)),
  selectedPartnerComplexion: data => dispatch(selectedPartnerComplexion(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PartnerExpectation2);
