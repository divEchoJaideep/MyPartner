import * as React from 'react';
import {Text, View, Image} from 'react-native';
import {Container, Content, Header} from '../../components';
import {paymentOptionData} from '../../assets/data';
import PaymentList from '../../components/PaymentList';
import CommanHeading from '../../components/CommanHeading';
import {navigate} from '../../navigation/ReduxNavigation';
import {Images} from '../../theme';
import styles from './Styles/MyRentalPropertyStyle';

const ChoosPaymentOptionScreen = ({navigation}) => {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Choose a payment Option"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <View style={styles.amountTransactionIdRow}>
          <Text style={styles.amountText}>Total Payble Amount $2430</Text>
          <Text style={styles.transactionIdText}>
            Transaction ID: 0917412589633214
          </Text>
        </View>
        <View style={styles.paymentOptionList}>
          <CommanHeading
            headingText
            heading="Payment Options"
            commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
            navigation={navigate}
          />
          <PaymentList data={paymentOptionData} paymentOptionSubText={1} />
          <View style={styles.paymentCardTypeImgs}>
            <Image
              source={Images.VisaIcon}
              resizeMode="contain"
              style={[styles.paymentCardTypeImg, styles.paymentCardVisaImg]}
            />
            <Image
              source={Images.MasterCardIcon}
              resizeMode="contain"
              style={[styles.paymentCardTypeImg, styles.paymentCardMasterImg]}
            />
            <Image
              source={Images.ReadyRentalGrayLogo}
              resizeMode="contain"
              style={[styles.paymentCardTypeImg, styles.paymentCardRentalImg]}
            />
          </View>
          <Text style={styles.paymentPrivacyPolicyText}>
            By proceeding, you understand that your information will be
            processed as per Ready Rental’s{' '}
            <Text style={styles.paymentPrivacyPolicyLinkText}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </Content>
    </Container>
  );
};
export default ChoosPaymentOptionScreen;
