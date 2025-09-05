import * as React from 'react';
import {useState} from 'react';
import {Image, View, FlatList, Text, TouchableOpacity} from 'react-native';
import {Container, Header, Content} from '../../components';
import {navigate} from '../../navigation/ReduxNavigation';
import BookPropertyImgText from '../../components/BookPropertyImgText';
import FacilitiesRules from '../../components/FacilitiesRules';
import CommanHeading from '../../components/CommanHeading';
// import MapView, { Marker } from 'react-native-maps';
import {
  facilitiesList,
  bookPropertySubImgData,
  ratingStarImgData,
  ratingCategoryListData,
  reviewListData,
} from '../../assets/data';
import styles from './Styles/PopularDetailsStyle';
import {Images} from '../../theme';
import CommanBtn from '../../components/CommanBtn';

function PopularDetailsScreen({navigation}) {
  const [textShown, settextShown] = useState(-1);
  const toggleNumberOfLines = index => {
    settextShown(textShown === index ? -1 : index);
  };

  const renderItem = ({item, index}) => (
    <Image
      key={item.id}
      source={item.image}
      resizeMode="cover"
      style={
        index === 0
          ? [styles.propertyDetaileImgs, {marginLeft: 20}]
          : index === bookPropertySubImgData.length - 1
          ? [styles.propertyDetaileImgs, {marginRight: 20}]
          : [styles.propertyDetaileImgs]
      }
    />
  );
  const renderStarItem = ({item}) => (
    <Image
      key={item.id}
      source={item.image}
      resizeMode="contain"
      style={styles.propertyDetaileRatingStarImg}
    />
  );
  const renderRatingListItem = ({item}) => (
    <View style={styles.ratingCategoryListRow}>
      <Text style={styles.ratingCategoryListHeading}>{item.name}</Text>
      <View style={styles.ratingCategoryBgLine}>
        <View style={[styles.ratingCategoryFillLine, {width: item.width}]} />
      </View>
    </View>
  );
  const renderReviewsListItem = ({item, index}) => (
    <TouchableOpacity style={styles.reviewContent}>
      <View style={styles.reviewUserImgText}>
        <Image
          source={item.userImg}
          resizeMode="cover"
          style={styles.reviewsUserImage}
        />
        <View style={styles.reviewUserRightText}>
          <Text style={styles.reviewUserNameText}>
            {item.name}{' '}
            <Text style={styles.reviewUserDateText}>{item.date}</Text>
          </Text>
          <View style={styles.reviewRatingStarTextRow}>
            <Text style={styles.reviewRatingText}>{item.reviewNumber}</Text>
            <View style={styles.reviewRatingStarRow}>
              <FlatList
                bounces={false}
                data={ratingStarImgData}
                renderItem={renderStarItem}
                numColumns={5}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </View>
      <Text
        style={styles.reviewRatingStarParegraph}
        numberOfLines={textShown === index ? undefined : 3}>
        {item.paregraph}
      </Text>
      <Text
        style={styles.readMoreLessText}
        onPress={() => toggleNumberOfLines(index)}>
        {textShown === index ? 'Read Less' : 'Read More'}
      </Text>
    </TouchableOpacity>
  );
  return (
    <>
      <Container safeAreaView={false} statusBarColor="transparent">
        <Content contentContainerStyle={styles.container}>
          <Header
            transparent
            hasBackBtn
            style={styles.popularDetailsHeader}
            onBackPress={() => navigation.goBack()}
          />
          <BookPropertyImgText
            propertyDetaileImgContentStyle={
              styles.propertyDetaileImgContentStyle
            }
            propertyDetaileImgStyle={styles.propertyDetaileImgStyle}
            propertyDetaileContentStyle={styles.propertyDetaileContentStyle}
            sendMsgPress={() => navigation.navigate('chatDetails')}
            likeBtnPress={() => navigation.navigate('Wishlist')}
          />
          <View style={styles.propertyDetaileContainer}>
            <FacilitiesRules
              facilitiesListData={facilitiesList.slice(0, 9)}
              FacilitiesRulesHeading="Facilities"
              facilitiesHeadingStyle={styles.facilitiesHeadingStyle}
            />
            <CommanHeading
              headingBtn
              heading="Photos"
              moreBtn="View all"
              commanHeadingContainerStyle={styles.photoHeadingStyle}
              navigation={navigate}
            />
          </View>
          <View style={styles.propertyDetailePhotoRow}>
            <FlatList
              horizontal
              data={bookPropertySubImgData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.propertyDetaileContainer}>
            <CommanHeading
              headingBtn
              heading="Location"
              moreBtn="View on map"
              navigation={navigate}
            />
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
            {/* <View style={styles.propertyDetaileMap}>
              <MapView
                style={styles.mapStyle}
                initialRegion={{
                  latitude: 21.187090218083345,
                  longitude: 72.79023272212653,
                  latitudeDelta: 0.0043,
                  longitudeDelta: 0.0034
                }}>
                <Marker
                  draggable
                  coordinate={{
                    latitude: 21.187090218083345,
                    longitude: 72.79023272212653
                  }}
                  title={'Zluck Solutions'}
                  description={'This is an IT Compnay'}
                  image={Images.location}
                  onDragEnd={(e) =>
                    alert(JSON.stringify(e.nativeEvent.coordinate))
                  }
                />
              </MapView>
            </View> */}
            <CommanHeading
              headingText
              heading="Raiting"
              navigation={navigate}
            />
            <View style={styles.propertyDetaileRatingStarRow}>
              <Text style={styles.propertyDetaileRatingStarText}>9.6</Text>
              <View style={styles.propertyDetaileRatingStars}>
                <FlatList
                  bounces={false}
                  data={ratingStarImgData}
                  renderItem={renderStarItem}
                  numColumns={5}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
            <View style={styles.ratingCategoryList}>
              <FlatList
                bounces={false}
                data={ratingCategoryListData}
                renderItem={renderRatingListItem}
                keyExtractor={item => item.id}
              />
            </View>
            <CommanHeading
              headingBtn
              heading="Reviews (54)"
              moreBtn="View all"
              commanHeadingContainerStyle={styles.reviewsHeadingStyle}
              navigation={navigate}
            />
            <FlatList
              bounces={false}
              data={reviewListData}
              renderItem={renderReviewsListItem}
              keyExtractor={item => item.id}
            />
          </View>
        </Content>
        <View style={styles.bookNowBtnContent}>
          <CommanBtn
            btnText="Book Now"
            commanBtnStyle={styles.bookNowBtn}
            onBtnPress={() => navigation.navigate('ConfirmPayProperty')}
          />
          <View style={styles.bookNowBtnPriceTexts}>
            <Text style={styles.bookNowBtnPriceText}>$ 170</Text>
            <Text style={styles.bookNowBtnPricePerText}>/per month</Text>
          </View>
        </View>
      </Container>
    </>
  );
}

export default PopularDetailsScreen;
