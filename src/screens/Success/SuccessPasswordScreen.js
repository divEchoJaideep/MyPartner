import * as React from 'react';
import {Text, Image, View} from 'react-native';
import {Container, Content} from '../../components';
import CommanBtnScreen from '../../components/CommanBtn/index';
import {Images} from '../../theme';
import styles from './Styles/SuccessStyle';

function SuccessPasswordScreen({navigation}) {
  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        <View style={styles.successContent}>
          <Image
            source={Images.Success}
            style={styles.successImage}
            resizeMode="contain"
          />
          <Text style={styles.successHeading}>Success</Text>
          <Text style={styles.successPeregraph}>
            Congratulations your password has been changed.
          </Text>
        </View>
        <CommanBtnScreen
          btnText="Log in"
          commanBtnStyle={styles.successBtn}
          onBtnPress={() => navigation.navigate('Login')}
        />
      </Content>
    </Container>
  );
}

export default SuccessPasswordScreen;
