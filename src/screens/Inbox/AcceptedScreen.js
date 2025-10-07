import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Container, Content } from '../../components';
import CommanText from '../../components/CommanText';
import styles from './Style/InboxStyle';
import CommanBtn from '../../components/CommanBtn';
import { Images } from '../../theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import GetUserReceivedRequest from '../../api/GetUserReceivedRequest';
import {
  blockedUsers,
  blockedUsersUnblock,
  userBlockRequest,
} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const AcceptedRequest = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [receivedRequest, setReceivedRequest] = useState([]);
  const [blockedUsersList, setBlockedUsersList] = useState([]);

  console.log('receivedRequest :', receivedRequest);
  console.log('blockedUsersList :', blockedUsersList);

  // Fetch requests + blocked users whenever screen focuses
  useFocusEffect(
    useCallback(() => {
      getUserReceivedRequest();
      getBlockedUsers();
    }, []),
  );

  // ✅ Get Accepted Requests
  const getUserReceivedRequest = async () => {
    try {
      setLoading(true);
      const response = await GetUserReceivedRequest({ token });
      if (response && response.data) {
        const approved = response.data.filter(req => req.status === 'Approved');
        setReceivedRequest(approved);
      } else {
        setError(response?.message || 'Failed to fetch requests.');
      }
    } catch (err) {
      console.log('Error fetching received requests:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get Blocked Users
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

  // ✅ Block User
  const handleBlock = async user_id => {
    const data = { user_id };
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('UserToken');
      const response = await userBlockRequest(data, token);
      console.log('response block:', response);

      if (response?.success) {
        Toast.show({
          type: 'success',
          text1: 'User Blocked',
          text2: response?.message || 'User blocked successfully.',
        });
        await Promise.all([getUserReceivedRequest(), getBlockedUsers()]);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Failed to block user.',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong while blocking user.',
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Unblock User
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

  // ✅ Render Each User
  const renderItem = ({ item }) => {
    const isBlocked = blockedUsersList.some(
      user => user.user_id === item.user_id,
    );

    return (
      <View style={styles.flatlistView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProfileData', { userId: item.user_id })
          }>
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
                  commanText={`${item.job_type || ''}, `}
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
          {isBlocked ? (
            <TouchableOpacity
              style={[styles.buttonName, styles.rightBtn]}
              onPress={() => handleUnblock(item.user_id)}>
              <CommanText
                commanText="Unblock"
                commanTextstyle={styles.btnText}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.buttonName, styles.rightBtn]}
              onPress={() => handleBlock(item.user_id)}>
              <CommanText commanText="Block" commanTextstyle={styles.btnText} />
            </TouchableOpacity>
          )}

          <View style={{ borderWidth: 1, borderColor: 'white', height: 50 }} />

          <TouchableOpacity
            style={[styles.buttonName, styles.rightBtn]}
            onPress={() => {
              const friend = {
                id: item?.user_id,
                interestID: item?.id,
                friendId: `${item?.user_id}_friend`,
                name: item?.name,
                photo: item?.photo,
                role: 'friend',
              };
              navigation.navigate('chatDetails', {
                friend,
                conversationId: null,
              });
            }}>
            <CommanText commanText="Chat" commanTextstyle={styles.btnText} />
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
          />
        ) : (
          !loading && (
            <View style={styles.innerView}>
              <CommanText
                commanText="No Accepted Requests"
                commanTextstyle={styles.birthdayText}
              />
              <CommanText commanText="Check out more profiles and continue your Partner search" />
            </View>
          )
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

export default AcceptedRequest;
