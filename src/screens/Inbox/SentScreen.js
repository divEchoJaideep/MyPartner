import { Image, Text, View, TouchableOpacity, FlatList, Alert, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Container, Content, Header } from '../../components';
import CommanText from '../../components/CommanText';
import styles from './Style/InboxStyle';
import CommanBtn from '../../components/CommanBtn';
import { Images } from '../../theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import GetUserRequestSent from '../../api/GetUserRequestSent';
import PostUserCancelRequest from '../../api/PostUserCancelRequest';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { interestReject } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const screenWidht = Dimensions.get('window').width

const SentRequest = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');
  const [sentRequest, setSentRequest] = useState([]);
  const [cancelRequest, setCancelRequest] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getUserRequestSent();
    }, [navigation, cancelRequest]),
  );

  // const getUserRequestSent = async () => {
  //   setLoading(true);
  //   const response = await GetUserRequestSent({ token: token });
  //   console.log('response :',response)
  //   if (response && response.data) {
  //     setSentRequest(response.data);
  //   } else {
  //     setError(response.message);
  //   }

  //   setLoading(false);
  // };
  const getUserRequestSent = async () => {
  setLoading(true);
  const response = await GetUserRequestSent({ token: token });
  console.log('response :', response);
  
  if (response && response.data) {
    const filteredData = response.data.filter(item => item.status !== 'Approved');
    setSentRequest(filteredData);
  } else {
    setError(response.message);
  }

  setLoading(false);
};


  const handleCancelRequest = async (user_id) => {
    const data = { user_id };

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('UserToken');
      const response = await interestReject(data, token);

      if (response && response.success) {
        Toast.show({
          type: 'success',
          text1: 'Request Cancelled',
          text2: response.message || 'Request cancelled successfully.',
        });
        getUserRequestSent();
        setCancelRequest(!cancelRequest);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Failed to cancel request. Please try again.',
        });
      }
    } catch (err) {
      console.error('Cancel request error:', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong while cancelling request.',
      });
    } finally {
      setLoading(false);
    }
  };



  const renderItem = ({ item, index }) => {
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
                {/* <CommanText
                  commanText={item.age}
                  commanTextstyle={styles.textStyle}
                /> */}
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
          {/* <TouchableOpacity style={[styles.buttonName, styles.leftBtn]}>
            <CommanText commanText="Share" commanTextstyle={styles.btnText} />
          </TouchableOpacity> */}
          {/* <View style={{borderWidth: 1, borderColor: 'white', height: 50}} /> */}
          <TouchableOpacity
            onPress={() => handleCancelRequest(item.user_id)}
            style={[styles.buttonName, styles.midlBtn]}>
            <CommanText
              commanText="Cancel Request"
              commanTextstyle={styles.btnText}
            />
          </TouchableOpacity>
          <View style={{ borderWidth: 1, borderColor: 'white', height: 50 }} />
          <TouchableOpacity style={[styles.buttonName, styles.rightBtn,{width:screenWidht/2-50}]}>
            <CommanText
              commanText={item.status}
              commanTextstyle={styles.btnText}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <Container statusBar={true} transparentStatusBar={true}>
      <Content hasHeader contentContainerStyle={styles.container}>
        <Loading loading={loading} />
        {sentRequest.length > 0 ? (
          <FlatList
            data={sentRequest}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            pagingEnabled
            scrollEnabled={false}
          />
        ) : (
          !loading &&
          <>

            <View style={styles.innerView}>
              <CommanText
                commanText="No Sent Requests"
                commanTextstyle={styles.birthdayText}
              />
              <CommanText commanText=" Check out more Profiles and continue your Partner search" />
            </View>

            <CommanBtn
              btnText="Search Partner"
              onBtnPress={() => navigation.navigate('Home')}
              commanBtnTextStyle={styles.commanBtnTextStyle}
              commanBtnStyle={styles.btnStyle}
            />
          </>
        )}
      </Content>
    </Container>
  );
};

export default SentRequest;