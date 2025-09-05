import * as React from 'react';
import {
  Image,
  View,
  Share,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CommanHeading from '../CommanHeading';
import {ratingStarImgData} from '../../assets/data';
import {Images} from '../../theme';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/Index';

function BookPropertyImgText(props) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
    } catch (error) {
      // alert(error.message);
    }
  };
  const renderItem = ({item}) => (
    <Image
      key={item.id}
      source={item.image}
      resizeMode="contain"
      style={styles.propertyDetaileRatingStarImg}
    />
  );
  return (
    <>
      <View
        style={[
          styles.propertyDetaileImageContent,
          props.propertyDetaileImgContentStyle,
        ]}>
        <Image
          source={Images.PropertyDetaileBgImg}
          resizeMode="cover"
          style={styles.propertyDetaileImage}
        />
        <LinearGradient
          colors={['rgba(33, 37, 41, 0)', 'rgba(33, 37, 41, 0.4)']}
          start={{x: 0.5, y: 0.5}}
          end={{x: 0.7, y: 1.3}}
          style={styles.propertyDetaileImageBackground}
        />
      </View>
      <View style={props.propertyDetaileContentStyle}>
        <View style={styles.propertyDetaileDescriptionContent}>
          <CommanHeading
            headingText
            heading="Orchad Row House"
            commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
            navigation={navigate}
          />
          <View style={styles.propertyDetaileHeadingBtn}>
            <TouchableOpacity
              style={styles.propertyDetaileHeadingIconBtn}
              onPress={() => {
                if (props.likeBtnPress) {
                  props.likeBtnPress();
                }
              }}>
              <Image
                source={Images.HeartLineIcon}
                resizeMode="contain"
                style={styles.propertyDetaileHeadingIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.propertyDetaileHeadingIconBtn}
              onPress={() => {
                if (props.sendMsgPress) {
                  props.sendMsgPress();
                }
              }}>
              <Image
                source={Images.SendGrayLineIcon}
                resizeMode="contain"
                style={styles.propertyDetaileHeadingIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.propertyDetaileHeadingIconBtn}
              onPress={onShare}>
              <Image
                source={Images.ShareLineIcon}
                resizeMode="contain"
                style={styles.propertyDetaileHeadingIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.propertyDetaileDescriptionPeregraph}>
          Standard and deluxe rooms are beautifully designed and tastefully
          designed with attention to detail, which will bring maximum comfort
          convenience to customers whether it's relaxing time or at work.
        </Text>
        {props.locationText && (
          <View style={styles.propertyDetaileLocationTextRow}>
            <Image
              source={Images.LocationLineIcon}
              resizeMode="contain"
              style={styles.propertyDetaileLocationImg}
            />
            <Text style={styles.propertyDetaileLocationText}>
              A-6 Om sai row house, Vip road, Vesu, Surat
            </Text>
          </View>
        )}
        <View style={styles.propertyDetaileRatingStarRow}>
          {props.ratingStarText && (
            <Text style={styles.propertyDetaileRatingStarText}>4.6</Text>
          )}
          <View style={styles.propertyDetaileRatingStars}>
            <FlatList
              bounces={false}
              data={ratingStarImgData}
              renderItem={renderItem}
              numColumns={5}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    </>
  );
}

export default BookPropertyImgText;
