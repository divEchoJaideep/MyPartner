import {View, Text} from 'react-native';
import React from 'react';
import DatePickerInput from '../../components/DatePickerInput';
import {Container, Content, Header} from '../../components';
import styles from './Styles';
import CommanBtnScreen from '../../components/CommanBtn';
import CommanText from '../../components/CommanText';

const BirthdayScreen = props => {
  return (
    <Container>
      <Header transparent hasBackBtn onBackPress={() => navigation.goBack()} />
      <Content hasHeader contentContainerStyle={{flex: 1}}>
        <CommanText
          commanText="My Birthday Is"
          commanTextstyle={styles.birthdayText}
        />
        <View style={styles.dateView}>
          <DatePickerInput datePickerInputStyle={{borderBottomWidth: 0}} />
        </View>
        <CommanText commanText="Your Age Will be Public" />
        <CommanBtnScreen btnText="Continue" commanBtnStyle={styles.btnStyle} />
      </Content>
    </Container>
  );
};

export default BirthdayScreen;
