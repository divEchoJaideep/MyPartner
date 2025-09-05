import * as React from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import {Container, Header, Content} from '../../components';
import {Images} from '../../theme';
import {profileInputList} from '../../assets/data';
import styles from './Styles/ProfileEditStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function ProfileEditScreen({navigation}) {
  const [storedUser, setStoredUser] = React.useState(null);

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

    const profilePhoto = storedUser?.photo || Images.UserImage;
  

  const renderItem = ({item}) => (
    <View>
      <TouchableOpacity
        style={styles.govermentIdContactList}
        onPress={() => navigation.navigate(item.pageName)}>
        <Text style={styles.govermentIdContactText}>{item.text}</Text>
        <Image
          source={Images.ViewAllArrow}
          resizeMode="contain"
          style={styles.rightArrowImg}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Container>
        <Header
          transparent
          hasBackBtn
          title="Profile Edit"
          onBackPress={() => navigation.goBack()}
        />
        <Content hasHeader contentContainerStyle={styles.container}>
          <Image
              source={profilePhoto}
              resizeMode="cover"
              style={styles.profileEditImg}
            />
          <View>
            <FlatList
              data={profileInputList.slice(0, 15)}
              renderItem={renderItem}
              bounces={false}
            />
          </View>
        </Content>
      </Container>
    </>
  );
}

export default ProfileEditScreen;
