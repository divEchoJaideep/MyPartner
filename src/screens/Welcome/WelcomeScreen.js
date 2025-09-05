import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {Container, Content} from '../../components';
import CommanText from '../../components/CommanText';
import {Images} from '../../theme';
import styles from './Styles/WelcomeStyle';
import SplashScreen from 'react-native-splash-screen';

function WelcomeScreen({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const [Index, setIndex] = useState(0);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Container>
      <Content hasHeader contentContainerStyle={styles.container}>
        <ImageBackground source={Images.Welcome} style={styles.imageStyle}>
          <CommanText
            commanTextstyle={[styles.textColor, styles.largeText]}
            commanText={'Explore Profiles'}
          />
          <CommanText
            commanTextstyle={styles.textColor}
            commanText={'across communities'}
          />
          <View style={styles.welcomeBottomBtn}>
            <TouchableOpacity
              style={[styles.nextStartBtnView, styles.btnWithBG]}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.nextStartBtn}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.nextStartBtnView, styles.btnWithOnlyBorder]}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.nextStartBtn}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Content>
    </Container>
  );
}

export default WelcomeScreen;
