import * as React from 'react';
import { Image, Text, TouchableOpacity, FlatList, View } from 'react-native';
import { Container, Header, Content } from '../../components';
import { navigate } from '../../navigation/ReduxNavigation';
import { notificationList } from '../../assets/data';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/NotificationStyle';
import { Images } from '../../theme';
import { GetMemberNotification } from '../../api/api';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

function NotificationScreen({ navigation }) {

      const token = useSelector(state => state.auth.token);

  const [notifcation, setNotification] = React.useState({});
console.log('notifcation :',notifcation);

  useFocusEffect(
    React.useCallback(() => {
      handleGetNotification()
    }, [])
  )

  const handleGetNotification = async () => {
    try {
      const response = await GetMemberNotification(token)
      console.log('response :', response);

      if (response?.result) {
        setNotification(response?.data)
      }
    } catch {

    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationLinks, { backgroundColor: item.notRead }]}>
      <Image
        source={{uri : item?.photo}}
        resizeMode="contain"
        style={[styles.notificationLinkIcon,{borderRadius:50,}]}
      />
      <View style={styles.notificationLinksHeadingPeregraph}>
        <View style={styles.notificationLinksHeading}>
          <Text style={styles.notificationLinksHeadingText}>
            {item.title || 'New Notification'}
          </Text>
          <Text style={styles.notificationLinksTimeText}>{item.time}</Text>
        </View>
        <Text style={styles.notificationLinksPeregraphText}>
          {item.message}
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
          // clearText
          title="Notification"
          onBackPress={() => navigation.goBack()}
        />
        <Content hasHeader contentContainerStyle={styles.container}>
          <FlatList
            data={notifcation}
            renderItem={renderItem}
          />
        </Content>
      </Container>
    </>
  );
}

export default NotificationScreen;
