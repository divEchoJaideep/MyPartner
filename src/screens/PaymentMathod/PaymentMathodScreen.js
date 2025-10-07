import React, { useCallback, useState } from 'react';
import { View, Alert } from 'react-native';
import { Container, Content, Header } from '../../components';
import CommanHeading from '../../components/CommanHeading';
import CommanBtn from '../../components/CommanBtn';
import { navigate } from '../../navigation/ReduxNavigation';
import styles from './Styles/PaymentMathodStyle';
import RazorpayCheckout from 'react-native-razorpay';
import { Colors } from '../../theme';
import { useFocusEffect } from '@react-navigation/native';

function PaymentMathodScreen({ navigation, route }) {
  const { packageData } = route.params || {};
  const [loading, setLoading] = useState(false);

  const RAZORPAY_TEST_KEY = 'rzp_test_ROBbgX7aCZ2Tjo';

useFocusEffect(
  useCallback(() => {
    handleRazorpayPayment();
  },[])
)

  const handleRazorpayPayment = () => {
    if (!RAZORPAY_TEST_KEY) {
      Alert.alert('Error', 'Razorpay Test Key is missing!');
      return;
    }

    setLoading(true);

    const options = {
      description: 'Credits towards consultation',
      image: 'https://clients.divecho.com/matrimony/public/uploa…/all/obNS7BPrK6BT00OCcc236Mep0NuvDT4ieUesjQ1O.png',
      currency: 'INR',
      key: RAZORPAY_TEST_KEY,
      amount: '5000',
      name: 'Acme Corp',
      order_id: '',//Replace this with an order_id created using Orders API.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar'
      },
      one_click_checkout: true, // magic checkout
      show_coupons: true, // magic checkout
      theme: { color: Colors.pink }
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });

RazorpayCheckout.open(options)
  .then((data) => {
    setLoading(false);
    Alert.alert(
      'Payment Success ✅',
      `Payment ID: ${data.razorpay_payment_id}\n(This is frontend test only)`
    );
    // You can send metadata to your backend here
    // e.g., verify payment, save user_id / auth_token
  })
  .catch((error) => {
    setLoading(false);
    console.log('Razorpay error raw:', error);
    let errMsg = 'Transaction cancelled or failed';
    try {
      const parsed = JSON.parse(error.description || '{}');
      errMsg = parsed.error?.description || errMsg;
    } catch (e) {
      errMsg = error.description || errMsg;
    }
    Alert.alert(
      'Payment Failed ❌',
      errMsg,
      [
        { text: 'Retry', onPress: handleRazorpayPayment },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  });
};

const handleCashOnDelivery = () => {
  Alert.alert('COD Selected 💵', 'This is frontend test only');
};

return (
  <Container>
    <Header
      transparent
      hasBackBtn
      title="Payment Method"
      onBackPress={() => navigation.goBack()}
    />
    <Content contentContainerStyle={styles.container}>
      {/* <CommanHeading
        headingText
        heading="Choose your payment option"
        commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
        navigation={navigate}
      />

      <View style={{ marginTop: 30 }}>
        <CommanBtn
          btnText={`Pay ₹${packageData?.price || 50} with Razorpay (Test)`}
          commanBtnStyle={styles.addPaymentBtn}
          onBtnPress={handleRazorpayPayment}
          disabled={loading}
        />

        <CommanBtn
          btnText="Cash on Delivery (Test)"
          commanBtnStyle={styles.addPaymentBtn}
          onBtnPress={handleCashOnDelivery}
          disabled={loading}
        />
      </View> */}
    </Content>
  </Container>
);
}

export default PaymentMathodScreen;
