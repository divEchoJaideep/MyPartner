import {View, Text} from 'react-native';
import React from 'react';
import {Container, Content, Header} from '../../components';
import DatePickerInput from '../../components/DatePickerInput';
import TextInputScreen from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import CommanText from '../../components/CommanText';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from '../../components/SelectDropdown/Select';
const birth_country = [
  {label: 'India', value: 'India'},
  {label: 'Afganisthan', value: 'Afganisthan'},
  {label: 'USA', value: 'USA'},
  {label: 'Russia', value: 'Russia'},
  {label: 'UK', value: 'UK'},
];
const residency_country = [
  {label: 'India', value: 'India'},
  {label: 'Afganisthan', value: 'Afganisthan'},
  {label: 'USA', value: 'USA'},
  {label: 'Russia', value: 'Russia'},
  {label: 'UK', value: 'UK'},
];
const grow_up_country = [
  {label: 'India', value: 'India'},
  {label: 'Afganisthan', value: 'Afganisthan'},
  {label: 'USA', value: 'USA'},
  {label: 'Russia', value: 'Russia'},
  {label: 'UK', value: 'UK'},
];
const ResidencyInformation = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Residency Information"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <View style={styles.inputView}>
          <SelectDropdown
            data={birth_country}
            label="Birth Country"
            placeholder="birth country"
          />
          <SelectDropdown
            data={residency_country}
            label="Residency Country"
            placeholder="residency country"
          />
          <SelectDropdown
            data={grow_up_country}
            label="Grow Up Country"
            placeholder="grow up country"
          />
          <CommanText
            commanText="Immigration Status"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            placeholder="Immigration Status"
            type="default"
            inputStyle={styles.inputStyle}
          />
        </View>
        <CommanBtnScreen
          btnText="Next"
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.btnStyle}
          onBtnPress={() => navigation.navigate('Social')}
        />
      </Content>
    </Container>
  );
};

export default ResidencyInformation;
