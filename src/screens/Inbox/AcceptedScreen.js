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
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import GetUserReceivedRequest from '../../api/GetUserReceivedRequest';
import PostUserRequestAccepted from '../../api/PostUserRequestAccepted';
import { userBlock, userBlockRequest } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const AcceptedRequest = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.user.access_token);
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');
  const [receivedRequest, setReceivedRequest] = useState([]);
  console.log('receivedRequest :', receivedRequest);

  useFocusEffect(
    useCallback(() => {
      getUserReceivedRequest();
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
        request => request.status === 'Approved',
      );
      setReceivedRequest(pendingRequests);
      // setReceivedRequest(response.data);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };


  const handleBlock = async (id) => {
  const data = { interest_id: id };

  try {
    setLoading(true);
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
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response?.message || 'Failed to block user.',
      });
    }
  } catch (err) {
    console.error('Block error:', err);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Something went wrong while blocking user.',
    });
  } finally {
    setLoading(false);
  }
};


  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.flatlistView}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileData')}>
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
          <TouchableOpacity style={[styles.buttonName, styles.rightBtn]} onPress={() => handleBlock(item.id)}>
            <CommanText commanText="Block" commanTextstyle={styles.btnText} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Container statusBar={true}>
      <Content hasHeader contentContainerStyle={styles.container}>
        <Error error={error} />
        <Loading loading={loading} />
        {receivedRequest.length > 0 ? (
          <FlatList
            data={receivedRequest}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />

        ) : (
          !loading &&
          <View style={styles.innerView}>
            <CommanText
              commanText="No Accepted Requests"
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

// function mapStateToProps(state) {
//   return {
//     token: state.auth.user.access_token,
//     userId: state.userRequestAccepted.interest_id,
//   };
// }

export default AcceptedRequest;