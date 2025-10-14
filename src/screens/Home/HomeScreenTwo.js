import React, { useEffect, useState, useCallback } from 'react';
import {
  Dimensions,
  Alert,
} from 'react-native';
import SnapScrolling from '../../components/SnapScrolling/SnapScrolling';
import { Container, Content } from '../../components';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import GetUserDashboard from '../../api/GetUserDashboard';
import { useDispatch, useSelector } from 'react-redux';
import PostFavRequest from '../../api/PostFavRequest';
import PostUserCancelLike from '../../api/PostUserCancelLike';
import { isIphoneX } from '../../libs/Utils';
import { cancelRequest, expressinterest, getUserAllDetails, getUserBasicInformation } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { getUserInfo } from '../../redux/actions/userDetailsActions';
import commonrequest from '../../api/commonrequest';
import { setPreDefineState } from '../../redux/reducers/perDefineListReducer';
import { profiledropdownUrl } from '../../api/const';

const { height } = Dimensions.get('window');

const HomeScreenTwo = () => {
  const tabHeight = isIphoneX() ? 110 : 92;
  const tabContainerHeight = height - tabHeight;
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  useEffect(() => {
    getProfile()
  }, []);

  const getProfile = async () => {
    const token = await AsyncStorage.getItem('UserToken');
    const response = await commonrequest("GET", profiledropdownUrl, "", token,)
    dispatch(setPreDefineState(response?.data))
  };
  const [initialLoader, setInitialLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      if (token) {
        getUserDashboard(1);
        getProfile()
      }
      return () => {
      };
    }, [token,])
  )
  useEffect(() => {
    if (token) {
      dispatch(getUserInfo(token));
    }
  }, [token]);


  const getUserDashboard = async (page, perPage = 5) => {
    setLoading(true);
    try {
      const response = await GetUserDashboard({
        token,
        page,
        perPage,
      });

      if (response?.success) {
        setDashboardData((prev) =>
          page === 1
            ? response.data.matched_profiles
            : [...prev, ...response.data.matched_profiles]
        );
        setTotalPages(response.data.total_pages);
        setPageNo(page);
      } else {
        // allertMessage('Error', response?.message || 'Something went wrong');
      }
    } catch (err) {
      // allertMessage('Error', 'Failed to load data');
    } finally {
      setLoading(false);
      setInitialLoader(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPageNo(1);
    getUserDashboard(1); 
  }, [token]);

  const loadMore = () => {
    if (!loading && pageNo < totalPages) {
      getUserDashboard(pageNo + 1);
    }
  };

  const allertMessage = (heading, message) => {
    // Alert.alert(heading, message);
  };


  const sendInterest = async (userId) => {
    const data = { user_id: userId };

    try {
      const token = await AsyncStorage.getItem('UserToken');
      const response = await expressinterest(data, token);

      if (response && response.success) {
        updateStatus(userId, 'express_interest_status');
        Toast.show({
          type: 'success',
          text1: 'Follow',
          text2: response.message || 'Follow successfully.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Something went wrong',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Connect to help center',
      });
    }
  };


  const handleFavRequest = async (userId) => {
    try {
      const response = await PostFavRequest({ token, userId });
      console.log('response Like :',response);
      if (response && response.success) {
        updateStatus(userId, 'shortlist_status');
        Toast.show({
          type: 'success',
          text1: 'Like',
          text2: response.message || 'Like successfully.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Something went wrong',
        });
      }

    } catch (err) {
      // allertMessage('Error', 'Failed to send Like');
    }
  };

  const handleCancelRequest = async (userId) => {
    const data = { user_id: userId };

    try {
      const token = await AsyncStorage.getItem('UserToken');
      const response = await cancelRequest(data, token);
      if (response && response.success) {
        updateStatus(userId, 'express_interest_status');
        Toast.show({
          type: 'success',
          text1: 'UnFollow',
          text2: response.message || 'UnFollow successfully.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Something went wrong',
        });
      }

    } catch (err) {
      // allertMessage('Error', 'Connect to help center');
    }
  };

  const handleCancelFavRequest = async (userId) => {
    try {
      const response = await PostUserCancelLike({ token, userId });
      if (response && response.success) {
        updateStatus(userId, 'shortlist_status');
        Toast.show({
          type: 'success',
          text1: 'UnLike',
          text2: response.message || 'UnLike successfully.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Something went wrong',
        });
      }

    } catch (err) {
      // allertMessage('Error', 'Failed to send Dislike');
    }
  };


  const updateStatus = (userId, field) => {
    setDashboardData((prevUsers) =>
      prevUsers.map((user) =>
        user.user_id === userId
          ? { ...user, [field]: user[field] ? 0 : 1 }
          : user
      )
    );
  };

  return (
    <Container transparentStatusBar={true} lightContent  >
      {/* <Content
        isBottomSheet
        scrollEventThrottle={16}
        // snapToInterval={tabContainerHeight}
        > */}
        <SnapScrolling
          data={dashboardData}
          loadMore={loadMore}
          loadingMore={loading}
          handleRefresh={handleRefresh}
          initialLoader={initialLoader}
          refreshing={refreshing}
          handleFavRequest={(id) => handleFavRequest(id)}
          handleRequest={(id) => sendInterest(id)}
          handleCancelRequest={(id) => handleCancelRequest(id)}
          handleCancelFavRequest={(id) => handleCancelFavRequest(id)}
        />
      {/* </Content> */}
    </Container>
  );
};

export default HomeScreenTwo;
