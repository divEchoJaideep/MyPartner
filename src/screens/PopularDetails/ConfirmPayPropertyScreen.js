import * as React from 'react';
import {Container, Content, Header} from '../../components';
import {Image, View, FlatList, Text, TouchableOpacity} from 'react-native';
import CommanBtn from '../../components/CommanBtn';
import PropertyDetailComponent from '../../components/PropertyDetailComponent';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/PopularDetailsStyle';

const ConfirmPayPropertyScreen = ({navigation}) => {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Confirm And Pay"
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
      <View style={styles.bookNowBtnContent}>
        <CommanBtn
          btnText="Confirm and pay"
          commanBtnStyle={styles.confirmPayBtn}
          onBtnPress={() => navigation.navigate('ChoosPaymentOption')}
        />
      </View>
    </Container>
  );
};
export default ConfirmPayPropertyScreen;
