import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Container, Content, Header} from '../../components';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/SignUpLogIn/CommanText';
import styles from './Styles/IdentityVerificationStyle';

function IdentityVerificationScreen({navigation}) {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Identity Verification"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <View style={styles.successContent}>
          <Text style={styles.successPeregraph}>
            This helps us check that you’re really you. identity verification is
            one of the ways we keep Ready Rental secure.
          </Text>
          <CommanBtnScreen
            btnText="Add an ID"
            commanBtnStyle={styles.addIdBtn}
            onBtnPress={() => navigation.navigate('SelectProof')}
          />
        </View>
        <TouchableOpacity style={styles.howWorkLinkText}>
          <CommanText
            commanText="How this work"
            commanTextstyle={styles.howWorkText}
          />
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

export default IdentityVerificationScreen;
