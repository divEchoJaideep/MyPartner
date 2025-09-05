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
  selectedGeneral,
  selectedPartnerCaste,
  selectedPartnerChildren,
  selectedPartnerHeight,
  selectedPartnerManglik,
  selectedPartnerMarital,
  selectedPartnerReligion,
  selectedPartnerReligionCaste,
  selectedPartnerSubCaste,
  selectedResidenceCountry,
  selectedResidenceState,
} from '../../actions/AppAction';
import GetSubCaste from '../../api/GetSubCaste';
import GetCaste from '../../api/GetCaste';
import GetReligionCaste from '../../api/GetReligionCaste';
import Error from '../../components/Error';
import UpdatePartner from '../../api/updatePartner';
import Loading from '../../components/Loading';
import GetPartnerExpectation from '../../api/GetPartnerExpectation';

//

const option = [
  {id: 1, name: 'Yes'},
  {id: 0, name: 'No'},
];
const PartnerExpectation = props => {
  const navigation = useNavigation();
  const [religionCaste, setReligionCaste] = useState();
  const [caste, setCaste] = useState();
  const [subCaste, setSubCaste] = useState();

  const onReligionChange = async religionID => {
    // console.log('onReligionChange: ', religionID);
    const response = await GetReligionCaste({
      religionID: religionID,
      token: props?.token,
    });
    // console.log('onReligionChange response: ', response);
    if (response.data) {
      setReligionCaste(response.data);
    }
  };
  const onReligionCasteChange = async casteID => {
    // console.log('onReligionCasteChange: ', casteID);
    const response = await GetCaste({
      casteID: casteID,
      token: props?.token,
    });
    // console.log('onReligionCasteChange response: ', response);

    if (response.data) {
      setCaste(response.data);
    }
  };
  const onCasteChange = async subCasteID => {
    // console.log('onCasteChange: ', subCasteID);
    const response = await GetSubCaste({
      subCasteID: subCasteID,
      token: props?.token,
    });
    // console.log('onCasteChange response: ', response);

    if (response.data) {
      setSubCaste(response.data);
    }
  };
  const [error, setError] = useState('');
  const [loading, setLoading] = useState();
  const [data, setData] = useState({
    general: '',
    partner_height: '',
    partner_marital_status: '',
    partner_children_acceptable: '',
    residence_country_id: '',
    residence_state_id: '',
    partner_religion_id: '',
    partner_religion_caste_id: '',
    partner_caste_id: '',
    partner_sub_caste_id: '',
  });
  useEffect(() => {
    getPartnerExpectation();
  }, []);

  const getPartnerExpectation = async () => {
    setLoading(true);
    const response = await GetPartnerExpectation({token: props.token});
    console.log('get partner api : ', response.data);
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
    if (
      !data.general ||
      !data.partner_height ||
      !data.partner_marital_status ||
      !data.partner_children_acceptable ||
      !data.residence_country_id ||
      !data.residence_state_id ||
      !data.partner_religion_id ||
      !data.partner_religion_caste_id ||
      !data.partner_caste_id ||
      !data.partner_sub_caste_id
    ) {
      console.log('data if: ', data);
      // console.log('data props:', props.partner);
      setError('Please enter details.');
      return;
    }

    // const response = await UpdatePartner({data: data, token: props.token});
    // console.log('response : ', response);
    // if (!response.success) {
    //   setError(response.message);
    //   return;
    // }
    // console.log('data if: ', data);
    await props.general(data.general);
    await props.partner_height(data.partner_height);
    await props.partner_marital_status(data.partner_marital_status);
    await props.partner_children_acceptable(data.partner_children_acceptable);
    await props.residence_country_id(data.residence_country_id);
    await props.residence_state_id(data.residence_state_id);
    await props.partner_religion_id(data.partner_religion_id);
    await props.partner_religion_caste_id(data.partner_religion_caste_id);
    await props.partner_caste_id(data.partner_caste_id);
    await props.partner_sub_caste_id(data.partner_sub_caste_id);

    navigation.navigate('PartnerExpectation2');
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
          <CommanText
            commanText="General"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            value={data?.general}
            placeholder="General"
            type="default"
            inputStyle={styles.inputStyle}
            onChangeText={text => handleTextChange('general', text)}
          />
          <SelectDropdown
            data={props?.height_list}
            value={data?.partner_height}
            label="Height"
            placeholder="select"
            onSelectChange={value => handleTextChange('partner_height', value)}
          />

          <SelectDropdown
            data={props?.maritial_status}
            value={data?.partner_marital_status}
            label="Marital Status"
            placeholder="marital status"
            onSelectChange={value =>
              handleTextChange('partner_marital_status', value)
            }
          />

          <SelectDropdown
            data={option}
            value={data?.partner_children_acceptable}
            label="Children Acceptable"
            placeholder="Select"
            onSelectChange={value =>
              handleTextChange('partner_children_acceptable', value)
            }
          />
          <SelectDropdown
            data={props?.country_list}
            value={data?.residence_country_id}
            label="Country"
            placeholder="residence country"
            onSelectChange={value =>
              handleTextChange('residence_country_id', value)
            }
          />
          <SelectDropdown
            data={props?.state_list}
            value={data?.residence_state_id}
            label="State"
            placeholder="residence state"
            onSelectChange={value =>
              handleTextChange('residence_state_id', value)
            }
          />
          <SelectDropdown
            data={props?.religion_list}
            value={data?.partner_religion_id}
            label="Religion"
            placeholder="religion"
            onSelectChange={value => {
              handleTextChange('partner_religion_id', value);
              onReligionChange(value);
            }}
          />
          {religionCaste && religionCaste.length > 0 && (
            <SelectDropdown
              data={religionCaste}
              value={data?.partner_religion_caste_id}
              label="Religion-Caste"
              placeholder="religion-caste"
              onSelectChange={value => {
                handleTextChange('partner_religion_caste_id', value);
                onReligionCasteChange(value);
              }}
            />
          )}
          {caste && caste.length > 0 && (
            <SelectDropdown
              data={caste}
              value={data?.partner_caste_id}
              label="Caste"
              placeholder="caste"
              onSelectChange={value => {
                handleTextChange('partner_caste_id', value);
                onCasteChange(value);
              }}
            />
          )}
          {subCaste && subCaste.length > 0 && (
            <SelectDropdown
              data={subCaste}
              value={data?.partner_sub_caste_id}
              label="Sub Caste"
              placeholder="sub caste"
              onSelectChange={value => {
                handleTextChange('partner_sub_caste_id', value);
              }}
            />
          )}
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
  // console.log('state: ', state.updatePartner);
  return {
    token: state.auth.user.access_token,
    country_list: state.country.country_list,
    state_list: state.state.state_list,
    height_list: state.height.height_list,
    maritial_status: state.maritial.maritial_status,
    religion_list: state.religion.religion_list,
    //update partner
    partner: state.updatePartner,
  };
}

const mapDispatchToProps = dispatch => ({
  //update partner
  selectedGeneral: data => dispatch(selectedGeneral(data)),
  selectedPartnerHeight: data => dispatch(selectedPartnerHeight(data)),
  selectedPartnerMarital: data => dispatch(selectedPartnerMarital(data)),
  selectedPartnerManglik: data => dispatch(selectedPartnerManglik(data)),
  selectedPartnerChildren: data => dispatch(selectedPartnerChildren(data)),
  selectedResidenceCountry: data => dispatch(selectedResidenceCountry(data)),
  selectedResidenceState: data => dispatch(selectedResidenceState(data)),
  selectedPartnerReligion: data => dispatch(selectedPartnerReligion(data)),
  selectedPartnerReligionCaste: data =>
    dispatch(selectedPartnerReligionCaste(data)),
  selectedPartnerCaste: data => dispatch(selectedPartnerCaste(data)),
  selectedPartnerSubCaste: data => dispatch(selectedPartnerSubCaste(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PartnerExpectation);
