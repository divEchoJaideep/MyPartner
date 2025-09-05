import {Image, Text, View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Container, Content, Header} from '../../components';
import CommanText from '../../components/CommanText';
import styles from './Styles';
import CommanBtn from '../../components/CommanBtn';
import {Images} from '../../theme';
import SelectDropdown from '../../components/SelectDropdown/Select';

const data = [
  {label: 'Women', value: 'Women'},
  {label: 'Men', value: 'Men'},
  {label: 'Other', value: 'Other'},
];
const GenderShowScreen = ({navigation}) => {
  const [showGender, setShowGender] = useState('');
  const [sortBy, setSortBy] = useState();
  console.log('showGender: ', showGender);
  return (
    <Container statusBar={true}>
      <Header transparent hasBackBtn onBackPress={() => navigation.goBack()} />
      <Content hasHeader contentContainerStyle={styles.container}>
        <CommanText
          commanText="Show me"
          commanTextstyle={styles.birthdayText}
        />
        <CommanBtn
          onBtnPress={() => setShowGender('Women')}
          btnText="Women"
          commanBtnTextStyle={
            showGender === 'Women' ? styles.commanBtnTextStyle : ''
          }
          commanBtnStyle={showGender === 'Women' ? styles.selectedBtnStyle : ''}
          btnIcon={
            showGender === 'Women' ? Images.CheckWhite : Images.CheckBlack
          }
        />
        <CommanBtn
          onBtnPress={() => setShowGender('Men')}
          btnText="Men"
          commanBtnTextStyle={
            showGender === 'Men' ? styles.commanBtnTextStyle : ''
          }
          commanBtnStyle={showGender === 'Men' ? styles.selectedBtnStyle : ''}
          btnIcon={showGender === 'Men' ? Images.CheckWhite : Images.CheckBlack}
        />
        <CommanBtn
          onBtnPress={() => setShowGender('Both')}
          btnText="Both"
          commanBtnTextStyle={
            showGender === 'Both' ? styles.commanBtnTextStyle : ''
          }
          commanBtnStyle={showGender === 'Both' ? styles.selectedBtnStyle : ''}
          btnIcon={
            showGender === 'Both' ? Images.CheckWhite : Images.CheckBlack
          }
        />
        <SelectDropdown
          data={data}
          label="I am"
          placeholder="Select your gender"
          searchPlaceholder="Search gender"
        />
        <CommanBtn
          btnText="Continue"
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.btnStyle}
        />
      </Content>
    </Container>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
});

export default GenderShowScreen;
