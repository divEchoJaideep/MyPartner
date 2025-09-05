import * as React from 'react';
import {Container, Content, Header} from '../../components';
import BookNowBtnComponent from '../../components/BookNowBtnComponent';
import PropertyDetailComponent from '../../components/PropertyDetailComponent';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/MyRentalPropertyStyle';

const HistoryPropertyScreen = ({navigation}) => {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="History"
        onBackPress={() => navigation.goBack()}
      />
      <Content
        hasHeader
        contentContainerStyle={[styles.container, styles.bookHistoryContainer]}>
        <PropertyDetailComponent
          sendMsgPress={() => navigation.navigate('chatDetails')}
          likeBtnPress={() => navigation.navigate('Wishlist')}
        />
      </Content>
      <BookNowBtnComponent
        navigation={navigate}
        onConfirmPayClick={() => navigation.navigate('ChoosPaymentOption')}
      />
    </Container>
  );
};
export default HistoryPropertyScreen;
