import {View, Text} from 'react-native';
import React from 'react';
import {Container, Content, Header} from '../../components';
import TextInputScreen from '../../components/SignUpLogIn/TextInput';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import CommanText from '../../components/CommanText';
import {useNavigation} from '@react-navigation/native';

const PersonalAttitude = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Personal Attitude & Behavior"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <View>
          <CommanText
            commanText="Affection"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            placeholder="Affection"
            type="default"
            inputStyle={styles.inputStyle}
          />
          <CommanText
            commanText="Humor"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            placeholder="Humor"
            type="default"
            inputStyle={styles.inputStyle}
          />
          <CommanText
            commanText="Political Views"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            placeholder="Political Views"
            type="default"
            inputStyle={styles.inputStyle}
          />
          <CommanText
            commanText="Religious Service"
            commanTextstyle={styles.birthdayText}
          />
          <TextInputScreen
            defaultInput
            placeholder="Religious Service"
            type="default"
            inputStyle={styles.inputStyle}
          />
          <CommanBtnScreen
            btnText="Next"
            commanBtnTextStyle={styles.commanBtnTextStyle}
            commanBtnStyle={styles.btnStyle}
            onBtnPress={() => navigation.navigate('Residency')}
          />
        </View>
      </Content>
    </Container>
  );
};

export default PersonalAttitude;
