import * as React from 'react';
import {View} from 'react-native';
import {Container, Content, Header} from '../../components';
import {paymentOptionData} from '../../assets/data';
import CommanHeading from '../../components/CommanHeading';
import CommanBtn from '../../components/CommanBtn';
import PaymentList from '../../components/PaymentList';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/PaymentMathodStyle';

function PaymentMathodScreen({navigation}) {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Payment Mathod"
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.container}>
        <CommanHeading
          headingText
          heading="Edit your payment methods"
          commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
          navigation={navigate}
        />
        <View>
          <PaymentList data={paymentOptionData.slice(2, 6)} />
          <CommanBtn
            btnText="Add payment method"
            commanBtnStyle={styles.addPaymentBtn}
            onBtnPress={() => navigation.navigate('AddPaymentMathod')}
          />
        </View>
      </Content>
    </Container>
  );
}

export default PaymentMathodScreen;
