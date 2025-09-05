import React, {useEffect, useState} from 'react';
import {Container, Content, Header} from '../../components';
import styles from './Styles/WishlistStyle';
import {FlatList, Image, Text, TouchableOpacity} from 'react-native';
import GetUserLike from '../../api/GetUserLike';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const WishlistScreen = () => {
  const navigation = useNavigation()
  const token = useSelector( (state) => state.auth.user.access_token);
  const [data, setData] = useState([]);
  useEffect(() => {
    getMyLike();
    }, [navigation]);

  const getMyLike = async () => {
    const response = await GetUserLike({token: token});
    console.log('response :',response);
    
    if (response && response.result) {
      setData(response.data)
    }
  }

  const updateStatus = (userId, field) => {
    setDashboardData((prevUsers) =>
      prevUsers.map((dashboardData) =>
        dashboardData.user_id === userId ? { ...dashboardData, [field]: dashboardData[field] ? 0 : 1 } : dashboardData
      )
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.profile}>
        <Image source={{uri:item.photo}} style={styles.profileImage} />
        <Text style={styles.profileName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Favourity"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          pagingEnabled
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      </Content>
    </Container>
  );
};
export default WishlistScreen;