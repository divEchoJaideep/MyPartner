import React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isIphoneX } from '../../libs/Utils';
import CommanText from '../CommanText';
import { Colors, Images } from '../../theme';

const { height, width } = Dimensions.get('window');

const ITEM_HEIGHT =
  height <= 740 ? height - 22 :
  height <= 820 ? height - 90 :
  height <= 900 ? height - 30 :
  height - 50;

const BOTTOM_PADDING = isIphoneX() ? 100 : Platform.OS === 'ios' ? 70 : 20;

const SnapScrolling = ({
  data,
  loadMore,
  loadingMore,
  handleRefresh,
  refreshing,
  initialLoader,
  handleRequest,
  handleFavRequest,
  handleCancelRequest,
  handleCancelFavRequest,
}) => {
  const navigation = useNavigation();

  /** Footer Loader when fetching more data */
  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <ActivityIndicator
        style={{ marginVertical: 15 }}
        size="large"
        color={Colors.primary}
      />
    );
  };

  /** Single Item Renderer */
  const renderItem = ({ item }) => (
    <ImageBackground
      source={{ uri: item.photo }}
      resizeMode="cover"
      style={[styles.videoContainer, { height: ITEM_HEIGHT }]}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProfileData', {
            userId: item?.user_id,
            userProfileData: item,
          })
        }
        style={styles.itemWrap}
        activeOpacity={0.9}
      >
        {/* Top Section */}
        <View>
          <View
            style={[
              styles.row,
              {
                width: width - 40,
                justifyContent: 'space-between',
                marginTop: 20,
              },
            ]}
          >
            <CommanText
              commanText={'Searching For'}
              commanTextstyle={styles.textStyle}
            />
            <CommanText
              commanText={item?.searching_for}
              commanTextstyle={styles.textStyle}
            />
          </View>
        </View>

        <View style={[styles.cardInnerWrap, { bottom: BOTTOM_PADDING }]}>
          <View>
            <View style={styles.row}>
              <CommanText
                commanText={item.name}
                commanTextstyle={styles.textStyle}
              />

              {item.documents && (
                <Image
                  source={Images.VerifyIconDoc}
                  resizeMode="contain"
                  style={styles.cardInnerIcon}
                />
              )}

              <CommanText
                commanText={` ${item.age}, ${item.marital_status}`}
                commanTextstyle={styles.textStyle}
              />
            </View>

            <View style={styles.row}>
              <CommanText
                commanText={`${item.caste}, ${item.job_type}`}
                commanTextstyle={styles.textStyle}
              />
            </View>

            <View style={styles.row}>
              <CommanText
                commanText={`${item.city_name}`}
                commanTextstyle={styles.textStyle}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonWrap}>
            {/* Request / Remove */}
            <TouchableOpacity
              style={[styles.button, styles.requestButton]}
              onPress={() =>
                item.express_interest_status
                  ? handleCancelRequest(item.user_id)
                  : handleRequest(item.user_id)
              }
            >
              <CommanText
                commanText={
                  item.express_interest_status ? 'Remove' : 'Request'
                }
                commanTextstyle={{ color: Colors.black, fontSize: 18 }}
              />
            </TouchableOpacity>

            {/* Fav / Undo */}
            <TouchableOpacity
              style={[styles.button, styles.favButton]}
              onPress={() =>
                item.shortlist_status
                  ? handleCancelFavRequest(item.user_id)
                  : handleFavRequest(item.user_id)
              }
            >
              <CommanText
                commanText={item.shortlist_status ? 'Undo Fav' : 'Fav'}
                commanTextstyle={{ color: Colors.white, fontSize: 18 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );

  if (initialLoader) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.user_id.toString()}
      renderItem={renderItem}
      pagingEnabled
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={Colors.primary}
        />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.2}
      ListFooterComponent={renderFooter}
      snapToAlignment="start"
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: width,
    backgroundColor: Colors.black,
  },
  itemWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
  textStyle: {
    color: Colors.white,
    textShadowColor: Colors.black,
    textShadowOffset: { width: -0.5, height: 1 },
    textShadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInnerIcon: {
    width: 20,
    height: 20,
    marginLeft: 6,
  },
  cardInnerWrap: {
    position: 'absolute',
    marginHorizontal: 20,
  },
  buttonWrap: {
    height: 55,
    width: width - 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.black,
    marginTop: 10,
  },
  button: {
    width: (width - 40) / 2,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestButton: {
    backgroundColor: Colors.white,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  favButton: {
    backgroundColor: Colors.primary,
  },
});

export default SnapScrolling;
