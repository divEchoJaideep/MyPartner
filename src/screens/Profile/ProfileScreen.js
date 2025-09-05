import * as React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Container, Header, Content } from '../../components';
import { Images } from '../../theme';
import { profileList } from '../../assets/data';
import styles from './Styles/ProfileStyle';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function ProfileScreen({ navigation }) {
  const { logout } = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const userBasicInfo = useSelector((state) => state.userDetails.userBasicInfo);

  const [storedUser, setStoredUser] = React.useState(null);

  // Focus pe data reload karega
  useFocusEffect(
    React.useCallback(() => {
      const loadUserFromStorage = async () => {
        try {
          const stored = await AsyncStorage.getItem("UserInfo");
          if (stored) {
            const parsed = JSON.parse(stored);
            setStoredUser({
              ...parsed.basic_details,
              photo:
                typeof parsed?.basic_details?.photo === "string"
                  ? { uri: parsed.basic_details.photo }
                  : parsed?.basic_details?.photo || Images.UserImage,
            });
          }
        } catch (error) {
          console.log("Error loading stored user:", error);
        }
      };

      loadUserFromStorage();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await dispatch(logout());
          logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "AuthStack" }],
          });
        },
      },
    ]);
  };

  const profilePhoto = storedUser?.photo || Images.UserImage;

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
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Profile"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.profileEditContent}
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
                : "Example"}
            </Text>
            <Text style={styles.userEmailText}>
              {userBasicInfo?.phone ? userBasicInfo?.phone : "+91-0123456789"}
            </Text>
            </View>
              <Image
                source={Images.EditIcon}
                resizeMode="contain"
                style={styles.userEditImage}
              />
          </View>
        </TouchableOpacity>
        <View style={styles.profileLinkListContent}>
          <FlatList data={profileList} renderItem={renderItem} bounces={false} />
        </View>
      </Content>
    </Container>
  );
}

export default ProfileScreen;
