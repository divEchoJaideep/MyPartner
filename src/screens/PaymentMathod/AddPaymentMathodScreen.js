import * as React from 'react';
import {Container, Content, Header} from '../../components';
import {paymentOptionData} from '../../assets/data';
import CommanHeading from '../../components/CommanHeading';
import PaymentList from '../../components/PaymentList';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/PaymentMathodStyle';

function AddPaymentMathodScreen({navigation}) {
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
          heading="Pay with"
          commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
          navigation={navigate}
        />
        <PaymentList data={paymentOptionData.slice(0, 1)} />
      </Content>
    </Container>
  );
}

export default AddPaymentMathodScreen;
