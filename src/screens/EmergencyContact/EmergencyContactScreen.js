import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Container, Content, Header} from '../../components';
import CommanHeading from '../../components/CommanHeading';
import CommanBtn from '../../components/CommanBtn';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/EmergencyContactStyle';

function EmergencyContactScreen({navigation}) {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Emergency Contact"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <View style={styles.emergencyContactContent}>
          <CommanHeading
            headingText
            heading="Add at least one emergency contact"
            navigation={navigate}
          />
          <Text style={styles.emergencyContactPeregraph}>
            An emergency contact gives us another possible way to help out if
            you’re ever in an urgent situation. We suggest you add at least one
            contact before you start a rental home. We’ll never share the info
            with other people who use Ready Rental.
          </Text>
          <CommanBtn
            btnText="Add now"
            commanBtnStyle={styles.addNowBtn}
            onBtnPress={() => navigation.navigate('EmergencyContactDetail')}
          />
        </View>
        <TouchableOpacity style={styles.learnMoreBtn}>
          <Text style={styles.learnMoreBtnText}>Learn more</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

export default EmergencyContactScreen;
