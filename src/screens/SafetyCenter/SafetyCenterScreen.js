import * as React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {Container, Content, Header} from '../../components';
import CommanHeading from '../../components/CommanHeading';
import CommanText from '../../components/CommanText';
import styles from './Styles';
import {Images} from '../../theme';
import {navigate} from '../../navigation/ReduxNavigation';

function SafetyCenterScreen({navigation}) {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Safety Center"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <CommanText
          commanText="Get the support, tools, and information you need to be safe."
          commanTextstyle={styles.safetyCenterTopText}
        />
        <TouchableOpacity
          style={styles.emergencyServicesBtn}
          onPress={() => navigation.navigate('CallEmergencyServices')}>
          <View style={styles.emergencyServicesTextRow}>
            <Image
              source={Images.CallMissed}
              resizeMode="contain"
              style={styles.callMissedIcon}
            />
            <View style={styles.emergencyServicesBtnText}>
              <Text style={styles.emergencyServicesBtnHeading}>
                Call local emergency services
              </Text>
              <Text style={styles.emergencyServicesBtnPeregraph}>
                Get the phone number you need if someone is in danger or
                injured.
              </Text>
            </View>
          </View>
          <Image
            source={Images.ViewAllArrow}
            resizeMode="contain"
            style={styles.rightArrowIcon}
          />
        </TouchableOpacity>
        <CommanHeading
          headingText
          heading="Learn about Ready Rental Trust & Safety"
          navigation={navigate}
        />
        <Text style={styles.safetyCenterBottomText}>
          Every year, millions of people stay in homes on Ready Rental in cities
          all over the world.
        </Text>
        <Text style={styles.safetyCenterBottomText}>
          What makes all of that possible? Trust.
        </Text>
        <TouchableOpacity style={styles.readMoreTextBtn}>
          <Text style={styles.readMoreTextBtnText}>Read more</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

export default SafetyCenterScreen;
