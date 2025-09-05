import * as React from 'react';
import {useState, useRef} from 'react';
import {Header, Container} from '../../components';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Colors, Images} from '../../theme';

import styles from './Styles/CameraStyle';

// const PendingView = () => (
//   <View style={styles.waitingText}>
//     <Text>Waiting</Text>
//   </View>
// );

function CameraScreen({navigation}) {
  const [flashModeOn, setFlashModeOn] = useState(true);
  // const [cameraFrontBack, setCameraFrontBack] = useState(true);
  // const takePicture = async function (camera: RNCamera) {
  //   const options = { quality: 0.5, base64: true };
  //   const data = await camera.takePictureAsync(options);
  //   console.log(data.uri);
  // };
  const cameraRef = useRef(null);
  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      // console.log(data.uri);
    }
  };
  return (
    <>
      <Container statusBarColor={Colors.lighterGray}>
        <Header hasBackBtn onBackPress={() => navigation.goBack()} />
        <View style={styles.cameraContent}>
          <RNCamera
            ref={cameraRef}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={
              flashModeOn
                ? RNCamera.Constants.FlashMode.on
                : RNCamera.Constants.FlashMode.off
            }
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <Image
            source={Images.photoScanRingIcon}
            resizeMode="contain"
            style={styles.photoScanRingIcon}
          />
          <View style={styles.frontIdContainer}>
            <Text style={styles.frontIdHeading}>Front of ID</Text>
            <Text style={styles.frontIdPeregraph}>
              Fit the front of your ID within the frame - check for good
              lighting.
            </Text>
            <View style={styles.clickPhotoBtnContent}>
              <TouchableOpacity
                style={styles.clickPhotoBtn}
                onPress={takePicture.bind(this)}
              />
            </View>
          </View>
        </View>
      </Container>
      <View style={styles.flashOnOfBtnContent}>
        <TouchableOpacity
          style={styles.flashOnOfBtn}
          onPress={() => setFlashModeOn(!flashModeOn)}>
          <Image
            source={flashModeOn ? Images.FlashOn : Images.FlashOff}
            resizeMode="contain"
            style={styles.flashOnOffImg}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
export default CameraScreen;
