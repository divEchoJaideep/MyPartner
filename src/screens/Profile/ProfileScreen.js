import * as React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Container, Header, Content } from '../../components';
import { Images } from '../../theme';
import { profileList } from '../../assets/data';
import styles from './Styles/ProfileStyle';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../../redux/actions/authActions';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { profiledropdownUrl } from '../../api/const';
import commonrequest from '../../api/commonrequest';
import { setPreDefineState } from '../../redux/reducers/perDefineListReducer';
import { getUserInfo } from '../../redux/actions/userDetailsActions';

function ProfileScreen({ navigation }) {
  const { logout } = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const userBasicInfo = useSelector((state) => state.userDetails.userBasicInfo);
  const token = useSelector((state) => state.auth.token);
  const [storedUser, setStoredUser] = React.useState(null);

 useFocusEffect(
  React.useCallback(() => {
   if (token) {
      dispatch(getUserInfo(token));
    }
  }, [token])
);
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await dispatch(logoutAction());
          logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "AuthStack" }],
          });
        },
      },
    ]);
  };

  // const profilePhoto = storedUser?.photo || Images.UserImage;
  const profilePhoto =
  userBasicInfo?.photo
    ? (typeof userBasicInfo.photo === 'string'
        ? { uri: userBasicInfo.photo }
        : userBasicInfo.photo)
    : storedUser?.photo || Images.UserImage;


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.profileLinkList}
      onPress={() =>
        item.pageName === "Login"
          ? handleLogout()
          : navigation.navigate(item.pageName)
      }
    >
      <Text style={styles.profileLinkText}>{item.text}</Text>
      <Image
        source={item.image ? item.image : Images.UserImage}
        resizeMode="contain"
        style={styles.profileLinkImg}
      />
    </TouchableOpacity>
  );

  return (
    <Container 
    // transparentStatusBar={true}
    >
      <Header
        transparent
        hasBackBtn
        title="Profile"
        onBackPress={() => navigation.goBack()}
      />
        <TouchableOpacity
          style={[styles.profileEditContent,{marginHorizontal:20}]}
          onPress={() => navigation.navigate("ProfileEdit")}
        >
          <View style={styles.profileImageContent}>
            <Image
              source={profilePhoto}
              resizeMode="cover"
              style={styles.profileImage}
            />
          </View>
          <View style={styles.userNameEmailText}>
            <View>
            <Text style={styles.userNameText}>
              {userBasicInfo?.first_name
                ? userBasicInfo?.first_name
                : "User"}
            </Text>
            <Text style={styles.userEmailText}>
              {userBasicInfo?.phone ? `+91-${userBasicInfo?.phone}` : "+91-0123456789"}
            </Text>
            </View>
            <View style={styles.userEditImageContent}>
            <TouchableOpacity onPress={() => navigation.navigate("UserPRofileShow")} style={styles.userShowProfile}>
              <Image
                source={Images.OpenEye}
                resizeMode="contain"
                style={styles.userEditImage}
                tintColor={'#fff'}
              />
              </TouchableOpacity>
              {/* <Image
                source={Images.EditIcon}
                resizeMode="contain"
                style={styles.userEditImage}
              /> */}
              </View>
          </View>
        </TouchableOpacity>
              <Content hasHeader contentContainerStyle={styles.container}>

        <View style={styles.profileLinkListContent}>
          <FlatList data={profileList} renderItem={renderItem} bounces={false} />
        </View>
      </Content>
    </Container>
  );
}

export default ProfileScreen;
