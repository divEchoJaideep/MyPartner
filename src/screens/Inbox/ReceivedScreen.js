import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Container, Content, Header } from '../../components';
import CommanText from '../../components/CommanText';
import styles from './Style/InboxStyle';
import CommanBtn from '../../components/CommanBtn';
import { Images } from '../../theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import GetUserReceivedRequest from '../../api/GetUserReceivedRequest';
import PostUserRequestAccepted from '../../api/PostUserRequestAccepted';
import PostUserCancelRequest from '../../api/PostUserCancelRequest';
import PostUserBlock from '../../api/PostUserBlock';
import Toast from 'react-native-toast-message';
import { blockedUsers, blockedUsersUnblock, interestCancel, interestReject, userBlockRequest } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReceivedRequest = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');
  const [receivedRequest, setReceivedRequest] = useState([]);
  const [blockedUsersList, setBlockedUsersList] = useState([]);
  console.log('receivedRequest :', receivedRequest);
  console.log('blockedUsersList :', blockedUsersList);
  const data = [
    {
      id: 1,
    },
  ];
  useFocusEffect(
    useCallback(() => {
      getUserReceivedRequest();
      getBlockedUsers();
    }, []),
  );
  // useEffect(() => {
  //   getUserReceivedRequest();
  // }, []);

  const getUserReceivedRequest = async () => {
    setLoading(true);
    const response = await GetUserReceivedRequest({ token: token });
    console.log('received request : ', response.data);

    if (response && response.data) {
      const pendingRequests = response.data.filter(
        request => request.status === 'Pending',
      );
      setReceivedRequest(pendingRequests);
      // setReceivedRequest(response.data);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };
  const handleRequest = async (userId) => {
    const response = await PostUserRequestAccepted({
      token: token,
      userId,
    });

    if (response && response.success) {
      Toast.show({
        type: 'success',
        text1: 'Request Accepted',
        text2: response.message || 'Request accepted successfully.',
      });
      // navigation.navigate('Sent');
      getUserReceivedRequest();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response?.message || 'Failed to accept request.',
      });
    }
  };

  const handleCancelRequest = async (user_id) => {
    console.log('Cancelling request for user_id:', user_id);

    const data = { user_id };
    // setLoading(true);
    const token = await AsyncStorage.getItem('UserToken');
    const response = await interestCancel(data, token);
    console.log('response cancel : ', response);
    if (response?.success) {
      Toast.show({
        type: 'success',
        text1: 'Request Cancelled',
        text2: response.message || 'Request cancelled successfully.',
      });
      getUserReceivedRequest();
      // setLoading(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response?.message || 'Failed to cancel request. Please try again.',
      });
      // setLoading(false);

    }
  }

  const getBlockedUsers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('UserToken');
      const res = await blockedUsers(token);
      console.log('Blocked Users API:', res);

      if (res?.result) {
        setBlockedUsersList(res?.data || []);
      } else {
        setBlockedUsersList([]);
      }
    } catch (err) {
      console.log('API error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockRequest = async (
    user_id
  ) => {
    const data = { user_id };

    const token = await AsyncStorage.getItem('UserToken');
    const response = await userBlockRequest(data, token);
    console.log('response block:', response);


    if (response && response.success) {
      Toast.show({
        type: 'success',
        text1: 'User Blocked',
        text2: response.message || 'User blocked successfully.',
      });
      getUserReceivedRequest();
      getBlockedUsers();
      navigation.navigate('Topboard');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response?.message || 'Failed to block user.',
      });
    }
  };

  const handleUnblock = async user_id => {
    const data = { user_id };
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('UserToken');
      const res = await blockedUsersUnblock(data, token);
      console.log('Unblock response:', res);

      if (res?.success === true) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.message || 'User unblocked successfully.',
        });
        await Promise.all([getBlockedUsers(), getUserReceivedRequest()]);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res?.message || 'Failed to unblock user.',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong while unblocking user.',
      });
    } finally {
      setLoading(false);
    }
  };


  const renderItem = ({ item }) => {
    const isBlocked = blockedUsersList.some(
      (blockedUser) => blockedUser.user_id === item.user_id
    );
    console.log('item : ', item);
    return (
      <View style={styles.flatlistView}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileData', { userId: item.user_id })}>
          <View style={styles.viewStyle}>
            <Image
              source={item?.photo ? { uri: item?.photo } : Images.userRoundIcon}
              style={styles.imageStyle}
              resizeMode="cover"
            />
            <View>
              <View style={styles.detailsStyle}>
                <CommanText
                  commanText={item.name}
                  commanTextstyle={styles.nameStyle}
                />
              </View>

              <View style={styles.detailsStyle}>
                <CommanText
                  commanText={`${item.job_type}, `}
                  commanTextstyle={styles.textStyle}
                />
                <CommanText
                  commanText={item.caste}
                  commanTextstyle={styles.textStyle}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.controlNameRow}>
          <TouchableOpacity
            style={[styles.buttonName, styles.leftBtn]}
            onPress={() => handleRequest(item.id)}>
            <CommanText commanText="Accept" commanTextstyle={styles.btnText} />
          </TouchableOpacity>

          <View style={{ borderWidth: 1, borderColor: 'white', height: 50 }} />

          <TouchableOpacity
            style={[styles.buttonName, styles.midlBtn]}
            onPress={() => handleCancelRequest(item.user_id)}>
            <CommanText
              commanText="Cancel Request"
              commanTextstyle={styles.btnText}
            />
          </TouchableOpacity>

          <View style={{ borderWidth: 1, borderColor: 'white', height: 50 }} />

          <TouchableOpacity
            style={[styles.buttonName, styles.rightBtn]}
            onPress={() => isBlocked ? handleUnblock(item.user_id) : handleBlockRequest(item.user_id)}>
            <CommanText commanText={isBlocked ? "Unblock" : "Block"} commanTextstyle={styles.btnText} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Container statusBar={true} transparentStatusBar={true}>
      <Content hasHeader contentContainerStyle={styles.container}>
        <Loading loading={loading} />
        {receivedRequest.length > 0 ? (
          <FlatList
            data={receivedRequest}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            pagingEnabled
            scrollEnabled={false}
          />

        ) : (
          !loading &&
          <View style={styles.innerView}>
            <CommanText
              commanText="No Pending Requests"
              commanTextstyle={styles.birthdayText}
            />
            <CommanText commanText=" Check out more Profiles and continue your Partner search" />
          </View>
        )}
        <CommanBtn
          btnText="Search Partner"
          onBtnPress={() => navigation.navigate('Home')}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.btnStyle}
        />
      </Content>
    </Container>
  );
};

export default ReceivedRequest;