import {Image, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Container, Content, Header} from '../../components';
import CommanText from '../../components/CommanText';
import styles from './Styles';
import CommanBtn from '../../components/CommanBtn';
import {Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';

const GenderSelfScreen = () => {
  const navigation = useNavigation();
  const [gender, setGender] = useState('');
  console.log('gender: ', gender);
  return (
    <Container statusBar={true}>
      <Header transparent hasBackBtn onBackPress={() => navigation.goBack()} />
      <Content hasHeader contentContainerStyle={styles.container}>
        <CommanText commanText="I am a" commanTextstyle={styles.birthdayText} />
        <CommanBtn
          onBtnPress={() => setGender('Women')}
          btnText="Women"
          commanBtnTextStyle={
            gender === 'Women' ? styles.commanBtnTextStyle : ''
          }
          commanBtnStyle={gender === 'Women' ? styles.selectedBtnStyle : ''}
          btnIcon={gender === 'Women' ? Images.CheckWhite : Images.CheckBlack}
        />
        <CommanBtn
          onBtnPress={() => setGender('Men')}
          btnText="Men"
          commanBtnTextStyle={gender === 'Men' ? styles.commanBtnTextStyle : ''}
          commanBtnStyle={gender === 'Men' ? styles.selectedBtnStyle : ''}
          btnIcon={gender === 'Men' ? Images.CheckWhite : Images.CheckBlack}
        />
        <CommanBtn
          onBtnPress={() => setGender('Other')}
          btnText="Other"
          commanBtnTextStyle={
            gender === 'Other' ? styles.commanBtnTextStyle : ''
          }
          commanBtnStyle={gender === 'Other' ? styles.selectedBtnStyle : ''}
          btnIcon={gender === 'Other' ? Images.CheckWhite : Images.CheckBlack}
        />
        <CommanBtn
          btnText="Continue"
          onBtnPress={() => navigation.navigate('GenderShow')}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.btnStyle}
        />
      </Content>
    </Container>
  );
};

export default GenderSelfScreen;
