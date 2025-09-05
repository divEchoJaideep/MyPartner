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
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import GetUserBlockedList from '../../api/GetUserBlockedList';
import PostUserUnBlock from '../../api/PostUserUnBlock';

const DeleteRequest = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');
  const [blocked, setBlocked] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const data = [
    {
      id: 1,
    },
  ];
  useFocusEffect(
    useCallback(() => {
      getUserBlockedList();
    }, [refresh]),
  );
  // useEffect(() => {
  //   getUserBlockedList();
  // }, []);

  const getUserBlockedList = async () => {
    setLoading(true);
    const response = await GetUserBlockedList({ token: props.token });
    console.log('Blocked request : ', response.data);

    if (response && response.data) {
      setBlocked(response.data);
      setRefresh(true);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };
  const handleRequest = async userId => {
    const response = await PostUserUnBlock({
      token: props.token,
      userId,
    });

    if (response && response.success) {
      Alert.alert('Request Sent', 'Unblock successfully.');
      // navigation.navigate('Sent');
    } else {
      setError(response.message);
      Alert.alert('Error', 'Failed to unblock.');
    }
  };
  const renderItem = (item, index) => {
    // console.log('item : ', item);
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
          {/* <TouchableOpacity
            style={[styles.buttonName, styles.leftBtn]}
            onPress={() => {
              handleRequest(item.item.id);
            }}>
            <CommanText commanText="Accept" commanTextstyle={styles.btnText} />
          </TouchableOpacity>
          <View
            style={{borderWidth: 1, borderColor: 'white', height: 50}}></View>
          <TouchableOpacity style={[styles.buttonName, styles.midlBtn]}>
            <CommanText
              commanText="Cancel Request"
              commanTextstyle={styles.btnText}
            />
          </TouchableOpacity>
          <View
            style={{borderWidth: 1, borderColor: 'white', height: 50}}></View> */}
          <TouchableOpacity
            style={[styles.buttonName, styles.rightBtn]}
            onPress={() => {
              handleRequest(item.item.user_id);
            }}>
            <CommanText commanText="UnBlock" commanTextstyle={styles.btnText} />
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
        {blocked.length > 0 ? (
          <FlatList
            data={blocked}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            pagingEnabled
            scrollEnabled={false}
          />
        ) : (
          !loading &&
          <View style={styles.innerView}>
            <CommanText
              commanText="There are no Deleted Requests"
              commanTextstyle={styles.birthdayText}
            />
          </View>
        )}
        <CommanBtn
          btnText="Search Partner"
          onBtnPress={() => navigation.navigate('Dashboard')}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.btnStyle}
        />
      </Content>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    token: state.auth.user.access_token,
    userId: state.userUnBlock.user_id,
  };
}

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(DeleteRequest);

// export default DeleteRequest;