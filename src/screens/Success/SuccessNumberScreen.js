import * as React from 'react';
import {Text, Image, View} from 'react-native';
import {Container, Content} from '../../components';
import {Images} from '../../theme';
import styles from './Styles/SuccessStyle';

function SuccessNumberScreen({navigation}) {
  setTimeout(() => {
    navigation.navigate('Login');
  }, 2000);
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
            Congratulations your number has been confirmed.
          </Text>
        </View>
      </Content>
    </Container>
  );
}

export default SuccessNumberScreen;
