import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyStoryUpload from '../../components/MyStoryUpload/MyStoryUpload'; 
import styles from './Styles/Styles';
import { Container, Header } from '../../components';
import { useNavigation } from '@react-navigation/native';

const MyStory = () => {
  const navigation = useNavigation();
  const [storyMedia, setStoryMedia] = useState(null);

  const handleStoryChange = media => {
    // console.log('Selected media:', media);
    setStoryMedia(media); 
  };

  return (
    <Container style={styles.container}>
     
      <Header
              transparent
              hasBackBtn
              title="My Story"
              onBackPress={() => navigation.goBack()}
            />
      <MyStoryUpload source={storyMedia} onChange={handleStoryChange} />
    </Container>
  );
};

export default MyStory;
