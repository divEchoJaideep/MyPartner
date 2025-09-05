import * as React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Share,
  FlatList,
} from 'react-native';
import styles from './Styles/index';

function PopularDestionationProparty(props) {
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
    <TouchableOpacity
      style={styles.popularDestionationContent}
      onPress={() => {
        if (props.onDestionationPress) {
          props.onDestionationPress();
        }
      }}>
      <Image
        source={item.proprtyImg}
        resizeMode="cover"
        style={styles.popularDestionationMainImg}
      />
      <View style={styles.popularDestionationHeadingPrice}>
        <Text style={styles.popularDestionationHeadingText}>
          {item.proprtyName}
        </Text>
        <Text style={styles.popularDestionationPriceText}>
          {item.proceMonthYear}
        </Text>
      </View>
      <View style={styles.popularDestionationLocationRatingStar}>
        <View style={styles.popularDestionationLocationRow}>
          <Image
            source={item.proprtyLocationImg}
            resizeMode="contain"
            style={styles.popularDestionationLocationImg}
          />
          <Text style={styles.popularDestionationLocationText}>
            {item.popularDestionationLocationText}
          </Text>
        </View>
        <View style={styles.popularDestionationRatingStarRow}>
          <Image
            source={item.proprtyRatingStarImg}
            resizeMode="contain"
            style={styles.popularDestionationRatingStarImg}
          />
          <Text style={styles.popularDestionationRatingStarText}>
            {item.proprtyRatingText}
          </Text>
        </View>
      </View>
      <View style={styles.categoryBottomRoomDetail}>
        <View style={styles.categoryBottomRoomDetailImgText}>
          <Image
            source={item.BedRoomIcon}
            resizeMode="contain"
            style={styles.categoryRoomDetailImg}
          />
          <Text style={styles.sliderRatingStarText}>{item.bedText}</Text>
        </View>
        <View style={styles.categoryBottomRoomDetailImgText}>
          <Image
            source={item.BathRoomIcon}
            resizeMode="contain"
            style={styles.categoryRoomDetailImg}
          />
          <Text style={styles.sliderRatingStarText}>{item.bathText}</Text>
        </View>
        <View style={styles.categoryBottomRoomDetailImgText}>
          <Image
            source={item.sqftIcon}
            resizeMode="contain"
            style={styles.categoryRoomDetailImg}
          />
          <Text style={styles.sliderRatingStarText}>{item.sqftText}</Text>
        </View>
        <View style={styles.propertyDetaileHeadingBtn}>
          <TouchableOpacity
            style={styles.propertyDetaileHeadingIconBtn}
            onPress={() => {
              if (props.onLikePress) {
                props.onLikePress();
              }
            }}>
            <Image
              source={item.likeBtnIcon}
              resizeMode="contain"
              style={styles.propertyDetaileHeadingIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.propertyDetaileHeadingIconBtn}
            onPress={() => {
              if (props.onSendMsgPress) {
                props.onSendMsgPress();
              }
            }}>
            <Image
              source={item.chatBtnIcon}
              resizeMode="contain"
              style={styles.propertyDetaileHeadingIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.propertyDetaileHeadingIconBtn}
            onPress={onShare}>
            <Image
              source={item.shareBtnIcon}
              resizeMode="contain"
              style={styles.propertyDetaileHeadingIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <>
      <View style={styles.popularDestionationPropartyContent}>
        <FlatList
          bounces={false}
          data={props.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
}

export default PopularDestionationProparty;
