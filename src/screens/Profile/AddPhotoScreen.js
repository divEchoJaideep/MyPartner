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

const AddPhotoScreen = () => {
  const navigation = useNavigation();

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [actionType, setActionType] = useState('');
  const [loading, setLoading] = useState(true); // <-- add loading state

  useFocusEffect(
    useCallback(() => {
      getMyPersonalImages();
    }, [])
  );

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    })
      .then((image) => {
        addImage({
          uri: image.path,
          fileName: image.filename || `photo_${Date.now()}.jpg`,
        });
      })
      .catch((err) => console.log('ImagePicker Error:', err));
  };

  const addImage = (image) => {
    if (!image) return;

    const uri = image.uri;
    const fileName = image.fileName || uri.split('/').pop();

    setUploadedPhotos((prev) => {
      if (prev.some((img) => img.uri === uri)) {
        return prev;
      }
      if (prev.length >= 6) {
        Toast.show({
          type: 'info',
          text1: 'Limit Reached',
          text2: 'You can only upload 6 images.',
        });
        return prev;
      }

      return [
        ...prev,
        {
          id: Date.now().toString() + Math.random().toString(),
          uri,
          fileName,
          isNew: true,
        },
      ];
    });
  };

  const getMyPersonalImages = async () => {
    try {
      setLoading(true); // start loader
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
      setLoading(false); // stop loader
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
    <Container>
      <Header
        transparent
        title="Add Photos"
        hasBackBtn
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
                      top: 5,
                      right: 5,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      borderRadius: 12,
                      padding: 4,
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

      {/* Save & Next Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CommanBtnScreen
          btnText="Save"
          onBtnPress={() => console.log('Save pressed')}
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.twoBtnStyle}
        />

        <CommanBtnScreen
          btnText="Next"
          onBtnPress={() => console.log('Next pressed')}
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
