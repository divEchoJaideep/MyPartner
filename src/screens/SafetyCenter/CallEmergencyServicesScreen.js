import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Linking,
  Platform,
} from 'react-native';
import {Container, Content, Header} from '../../components';
import CommanHeading from '../../components/CommanHeading';
import CommanText from '../../components/SignUpLogIn/CommanText';
import styles from './Styles';
import {Images} from '../../theme';
import {navigate} from '../../navigation/ReduxNavigation';

function CallEmergencyServicesScreen({navigation}) {
  const dialCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Call local emergency services"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <CommanHeading
          headingBtn
          heading="India"
          moreBtn="Change"
          navigation={navigate}
          onMoreBtnPress={() => navigation.navigate('SelectCountry')}
        />
        <View
          style={[styles.emergenciesCallLink, styles.allEmergenciesCallLink]}>
          <Image
            source={Images.CallMissed}
            resizeMode="contain"
            style={styles.callMissedIcon}
          />
          <Text style={styles.allEmergenciesCallText}>All emergencies</Text>
          <TouchableOpacity
            style={styles.callLinkBtn}
            onPress={() => dialCall(100)}>
            <Text style={styles.callLinkBtnText}>Call 100</Text>
          </TouchableOpacity>
        </View>
        <CommanText
          commanText="Phone numbers for speciffic emergencies:"
          commanTextstyle={styles.safetyCenterTopText}
        />
        <View style={styles.emergenciesCallLink}>
          <Image
            source={Images.MedicalIcon}
            resizeMode="contain"
            style={styles.callMissedIcon}
          />
          <Text style={styles.emergenciesCallLinkText}>Medical</Text>
          <TouchableOpacity
            style={styles.callLinkBtn}
            onPress={() => dialCall(102)}>
            <Text style={styles.callLinkBtnText}>Call 102</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.emergenciesCallLink}>
          <Image
            source={Images.FireIcon}
            resizeMode="contain"
            style={styles.callMissedIcon}
          />
          <Text style={styles.emergenciesCallLinkText}>Fire</Text>
          <TouchableOpacity
            style={styles.callLinkBtn}
            onPress={() => dialCall(101)}>
            <Text style={styles.callLinkBtnText}>Call 101</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.emergenciesCallBottomText}>
          You’ll be taken outside of Ready Rental to call local emergency
          service. Use of this feature is subject to our policy. Read our policy{' '}
          <Text style={styles.readMoreTextBtnText}>Read our policy</Text>
        </Text>
      </Content>
    </Container>
  );
}

export default CallEmergencyServicesScreen;
