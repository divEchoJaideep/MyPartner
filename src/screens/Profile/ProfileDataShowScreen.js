import React, { useState } from 'react';
import { View, Image, FlatList, Dimensions, ScrollView } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Container, Content, Header } from '../../components';
import CommanText from '../../components/CommanText';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/OtherProfileStyle';
import { fullDetailProfile } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProfileData = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userProfileData } = route.params;
console.log('userProfileData', userProfileData);

  const [profile, setProfile] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      handleFullDetail();
    }, [])
  );

  const handleFullDetail = async () => {
    const token = await AsyncStorage.getItem('UserToken');
    const response = await fullDetailProfile(userProfileData.user_id, token);
    if (response?.success) {
      setProfile(response.data);
    }
  };

  const renderPaginationDots = (imagesData) => (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
      {imagesData.map((_, i) => (
        <View
          key={i}
          style={{
            height: 8,
            width: activeIndex === i ? 20 : 8,
            borderRadius: 4,
            marginHorizontal: 4,
            backgroundColor: activeIndex === i ? '#333' : '#ccc',
          }}
        />
      ))}
    </View>
  );

  if (!profile) return null;

  // merge profile image + gallery images
  const imagesData = [
    { type: 'profile', image_path: profile.basic_info?.photo },
    ...profile.photo_gallery
  ];

  return (
    <Container statusBar={true} safeAreaViewHeader={false}>
      <Header
        transparent
        absolute
        hasBackBtn
        style={{ marginTop: 10 }}
        onBackPress={() => navigation.goBack()}
      />

      <Content contentContainerStyle={styles.container}>
        <FlatList
          data={imagesData}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: item.image_path }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
          )}
        />
        {renderPaginationDots(imagesData)}
        <View style={styles.bottomContainer}>
          <CommanHeading headingText heading="Basic Information" />
          <View style={styles.infoBox}>
            <CommanText commanText={`Searching For: ${userProfileData?.searching_for}`} commanTextstyle={styles.infoText} />
            <CommanText commanText={`Religion: ${userProfileData?.religion_caste}`} commanTextstyle={styles.infoText} />
            <CommanText commanText={`Caste: ${userProfileData?.caste} (${userProfileData?.sub_caste})`} commanTextstyle={styles.infoText} />
            <CommanText commanText={`City: ${profile.present_address?.city_name}`} commanTextstyle={styles.infoText} />
          </View>

          <CommanHeading headingText heading="Education & Career" />
          <View style={styles.infoBox}>
            {/* <CommanText commanText={`Qualification: ${profile.education?.education_type}`} commanTextstyle={styles.infoText} /> */}
            <CommanText commanText={`Job: ${profile.career?.occupation}`} commanTextstyle={styles.infoText} />
            <CommanText commanText={`Salary: ${profile.career?.Income || 'N/A'}`} commanTextstyle={styles.infoText} />
          </View>

          <CommanHeading headingText heading="Other Information" />
          <View style={styles.infoBox}>
            <CommanText commanText={`Member Code: ${profile.basic_info?.user_id}`} commanTextstyle={styles.infoText} />
            <CommanText commanText={`Phone: ${profile.basic_info?.phone}`} commanTextstyle={styles.infoText} />
            <CommanText commanText={`Languages: ${profile.known_languages?.map(l => l.name).join(', ')}`} commanTextstyle={styles.infoText} />
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default ProfileData;
