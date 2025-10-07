import { Image, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Container, Content, Header } from '../../components';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileStyle';
import CommanText from '../../components/CommanText';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { GetPersonalImages, persnolImage, imageDelete } from '../../api/api';
import StatusModal from '../../components/StatusModal/StatusModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';
import ImagesUpload from '../../api/imagesUpload';

const AddPhotoScreen = () => {
  const navigation = useNavigation();

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [actionType, setActionType] = useState('');
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getMyPersonalImages();
    }, [])
  );

  const pickImage = async () => {
    const remainingSlots = 6 - uploadedPhotos.length;
    if (remainingSlots <= 0) {
      Toast.show({
        type: 'info',
        text1: 'Limit Reached',
        text2: 'You can only upload 6 images.',
      });
      return;
    }

    try {
      const images = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
        multiple: true,
      });

      const selectedImages = Array.isArray(images) ? images : [images];

      selectedImages.slice(0, remainingSlots).forEach(img =>
        addImage({
          uri: img.path,
          fileName: img.filename || `photo_${Date.now()}.jpg`,
        })
      );
    } catch (err) {
      console.log('ImagePicker Error:', err);
    }
  };

  const addImage = async (image) => {
    if (!image) return;

    const remainingSlots = 6 - uploadedPhotos.length;
    if (remainingSlots <= 0) {
      Toast.show({
        type: 'info',
        text1: 'Limit Reached',
        text2: 'You can only upload 6 images.',
      });
      return;
    }

    const uri = image.uri;
    const fileName = image.fileName || uri.split('/').pop();

    const newPhoto = {
      id: Date.now().toString() + Math.random().toString(),
      uri,
      fileName,
      isNew: true,
    };

    // Optimistically add
    setUploadedPhotos(prev => {
      const total = prev.length;
      if (total >= 6) return prev;
      return [...prev, newPhoto];
    });

    const token = await AsyncStorage.getItem('UserToken');

    const result = await ImagesUpload({
      token,
      uploadImage: {
        uri: newPhoto.uri,
        name: newPhoto.fileName,
        type: 'image/jpeg',
      },
    });

    if (result.success) {
      getMyPersonalImages();
      Toast.show({
        type: 'success',
        text1: 'Uploaded',
        text2: result?.message || 'Photo uploaded successfully!',
      });
      
    } else {
      Toast.show({
        type: 'error',
        text1: 'Upload Failed',
        text2: result?.message || 'Something went wrong',
      });
      setUploadedPhotos(prev => prev.filter(p => p.id !== newPhoto.id));
    }
  };

  const getMyPersonalImages = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('UserToken');
      const response = await GetPersonalImages(token);

      if (response.result) {
        const images = response.data.map((img) => ({
          id: img.id,
          uri: img.image_path,
        }));
        setUploadedPhotos(images);
      }
    } catch (error) {
      console.error('Error fetching personal images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const token = await AsyncStorage.getItem('UserToken');
      const response = await imageDelete(id, token);

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Image Deleted',
          text2: response.message || 'Image deleted successfully.',
        });
        getMyPersonalImages();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Delete Failed',
          text2: response?.message || 'Failed to delete image.',
        });
      }
    } catch (error) {
      console.log('Delete Error:', error);
    }
  };

  return (
    <Container paddingBottomContainer={true}>
      <Header
        transparent
        title="Add Photos"
        hasBackBtn
        hasHomeBTN
        onHomeBTN={() => navigation.navigate('Dashboard', { screen: 'Profile' })}
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <CommanText
          commanText="Add up to 6 photos"
          commanTextstyle={styles.commanTextstyle}
        />

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
              <View
                key={`loader-${index}`}
                style={{
                  width: 100,
                  height: 100,
                  marginBottom: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ActivityIndicator size="small" color="#000" />
              </View>
            ))
            : uploadedPhotos.map((photo) => (
              <View key={photo.id} style={{ position: 'relative', marginBottom: 10 }}>
                <Image
                  source={{ uri: photo.uri }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
                <TouchableOpacity
                  onPress={() => handleDeleteImage(photo.id)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: 12,
                    paddingVertical: 3,
                    paddingHorizontal: 7,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 12 }}>X</Text>
                </TouchableOpacity>
              </View>
            ))}

          {!loading &&
            Array.from({ length: 6 - uploadedPhotos.length }).map((_, index) => (
              <TouchableOpacity
                key={`empty-${index}`}
                style={{
                  width: 100,
                  height: 100,
                  marginBottom: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={pickImage}
              >
                <CommanText commanText="+" commanTextstyle={{ fontSize: 24 }} />
              </TouchableOpacity>
            ))}
        </View>
      </Content>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between',gap:10 }}>
        <CommanBtnScreen
          btnText="Save"
          onBtnPress={() => navigation.navigate('Dashboard', { screen: 'Profile' })}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.twoBtnStyle}
        />

        <CommanBtnScreen
          btnText="Next"
          onBtnPress={() => navigation.navigate('PresentAddress')}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={[styles.twoBtnStyle, styles.btnBg]}
        />
      </View>

      <StatusModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </Container>
  );
};

export default AddPhotoScreen;
