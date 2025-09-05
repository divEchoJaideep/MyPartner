import * as React from 'react';
import {Image, Text, TouchableOpacity, FlatList, View} from 'react-native';
import {Container, Header, Content} from '../../components';
import {navigate} from '../../navigation/ReduxNavigation';
import {notificationList} from '../../assets/data';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/NotificationStyle';
import {Images} from '../../theme';

function NotificationScreen({navigation}) {
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.notificationLinks, {backgroundColor: item.notRead}]}>
      <Image
        source={item.image}
        resizeMode="contain"
        style={styles.notificationLinkIcon}
      />
      <View style={styles.notificationLinksHeadingPeregraph}>
        <View style={styles.notificationLinksHeading}>
          <Text style={styles.notificationLinksHeadingText}>
            {item.heading}
          </Text>
          <Text style={styles.notificationLinksTimeText}>{item.time}</Text>
        </View>
        <Text style={styles.notificationLinksPeregraphText}>
          {item.peregraph}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <>
      <Container>
        <Header
          transparent
          hasBackBtn
          clearText
          title="Notification"
          onBackPress={() => navigation.goBack()}
        />
        <Content hasHeader contentContainerStyle={styles.container}>
          <FlatList data={notificationList} renderItem={renderItem} />
        </Content>
      </Container>
    </>
  );
}

export default NotificationScreen;
