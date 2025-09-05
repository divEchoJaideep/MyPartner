import * as React from 'react';
import {useState} from 'react';
import {Text, Image, View, TouchableOpacity, FlatList} from 'react-native';
import {Images} from '../../theme';
import styles from './Styles/index';

function CategoryList({
  categoryNormalList,
  categoryCollectionList,
  categoryNormalListText,
  categoryCollectionListText,
  categoryPropartyImgStyle,
  categoryWishListText,
  categoryRightContentStyle,
  categoryList,
  onCategoryClick,
}) {
  const [wishList, setWishList] = useState(categoryList);
  const [likeItem, setLikeItem] = useState({});
  const [bestForYouKey, setBestForYouKey] = useState(new Date().getTime());
  const handleWish = (item = {}, ArrIdx) => {
    const updatedWish = [...wishList];
    updatedWish[ArrIdx].isWish = !item.isWish;
    setWishList(updatedWish);
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.categoryContainer}
      key={item.id}
      onPress={() => {
        if (onCategoryClick) {
          onCategoryClick();
        }
      }}>
      <TouchableOpacity disabled style={styles.categoryPropartyImgContent}>
        <Image
          source={item.categoryListImg}
          style={[styles.categoryPropartyImg, categoryPropartyImgStyle]}
        />
      </TouchableOpacity>
      <View style={[styles.categoryRightContent, categoryRightContentStyle]}>
        <View style={styles.categoryHeadingLikeBtn}>
          <Text style={styles.categoryHeading} numberOfLines={1}>
            {item.heading}
          </Text>
          <TouchableOpacity
            style={styles.categoryLikeBtn}
            onPress={() => handleWish(item, index)}>
            <Image
              source={item.isWish ? item.activeIikeImg : item.likeImg}
              resizeMode="contain"
              style={styles.categoryLikeImg}
            />
          </TouchableOpacity>
        </View>
        {categoryCollectionListText && (
          <>
            <View style={styles.categoryLocationImgText}>
              <Image
                source={Images.grayLocationIcon}
                resizeMode="contain"
                style={styles.categoryLocationImg}
              />
              <Text style={styles.categoryLocationText}>
                {item.locationAddress}
              </Text>
            </View>
            <View
              style={[
                styles.categoryPriceRatingText,
                styles.categoryCollectionPriceRatingTex,
              ]}>
              <Text style={styles.categoryPriceText}>{item.priceText}</Text>
              <View style={styles.sliderRatingContainer}>
                <Image
                  source={item.ratingStarImg}
                  resizeMode="contain"
                  style={styles.categoryRatingStarImg}
                />
                <Text style={styles.sliderRatingStarText}>
                  {item.ratingText}
                </Text>
              </View>
            </View>
          </>
        )}
        {categoryWishListText && (
          <>
            <View style={styles.categoryLocationImgText}>
              <Image
                source={Images.grayLocationIcon}
                resizeMode="contain"
                style={styles.categoryLocationImg}
              />
              <Text style={styles.categoryLocationText}>
                {item.locationAddress}
              </Text>
            </View>
            <View style={styles.categoryLocationImgText}>
              <Image
                source={Images.BookOutlineGray}
                resizeMode="contain"
                style={styles.categoryLocationImg}
              />
              <Text style={styles.categoryLocationText}>01 Jul 2021</Text>
            </View>
            <View
              style={[
                styles.categoryPriceRatingText,
                styles.categoryCollectionPriceRatingTex,
              ]}>
              <Text style={styles.categoryPriceText}>{item.priceText}</Text>
              <View style={styles.sliderRatingContainer}>
                <Image
                  source={item.ratingStarImg}
                  resizeMode="contain"
                  style={styles.categoryRatingStarImg}
                />
                <Text style={styles.sliderRatingStarText}>
                  {item.ratingText}
                </Text>
              </View>
            </View>
          </>
        )}
        {categoryNormalListText && (
          <>
            <View style={styles.categoryPriceRatingText}>
              <Text style={styles.categoryPriceText}>{item.priceText}</Text>
              <View style={styles.sliderRatingContainer}>
                <Image
                  source={item.ratingStarImg}
                  resizeMode="contain"
                  style={styles.categoryRatingStarImg}
                />
                <Text style={styles.sliderRatingStarText}>
                  {item.ratingText}
                </Text>
              </View>
            </View>
            <View style={styles.categoryBottomRoomDetail}>
              <View style={styles.categoryBottomRoomDetailImgText}>
                <Image
                  source={item.badImg}
                  resizeMode="contain"
                  style={styles.categoryRoomDetailImg}
                />
                <Text style={styles.sliderRatingStarText}>{item.bed}</Text>
              </View>
              <View style={styles.categoryBottomRoomDetailImgText}>
                <Image
                  source={item.bathsImg}
                  resizeMode="contain"
                  style={styles.categoryRoomDetailImg}
                />
                <Text style={styles.sliderRatingStarText}>{item.baths}</Text>
              </View>
              <View style={styles.categoryBottomRoomDetailImgText}>
                <Image
                  source={item.sqftImg}
                  resizeMode="contain"
                  style={styles.categoryRoomDetailImg}
                />
                <Text style={styles.sliderRatingStarText}>{item.sqft}</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
  return (
    <>
      {categoryNormalList && (
        <FlatList
          key={bestForYouKey}
          data={wishList}
          extraData={wishList}
          renderItem={renderItem}
          bounces={false}
        />
      )}
      {categoryCollectionList && (
        <FlatList data={wishList} renderItem={renderItem} bounces={false} />
      )}
    </>
  );
}

export default CategoryList;
