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
} from 'react-native';

import { isIphoneX } from '../../libs/Utils';
import CommanText from '../CommanText';
import { Colors, Images } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import Container from '../Container';

const { height, width } = Dimensions.get('window');
const dynamicMargin = height <= 800 ? 10 : 0;
const dynamicHeight = height <= 800 ? height : height -80
const tabHeight = isIphoneX() ? 110 : -22;
const tabContainerHeight = height - - tabHeight;

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

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator style={{ marginVertical: 15 }} size="large" color={Colors.primary} />;
  };

  const renderItem = ({ item }) => {
    return (
      <ImageBackground
        source={{ uri: item.photo }}
        resizeMode="cover"
        style={[styles.videoContainer,]}>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProfileData', {
              userId: item?.user_id,
              userProfileData: item,
            })
          }
          style={styles.itemWrap}>

          <View>
            <View style={[styles.row, { width: width - 40, justifyContent: 'space-between', marginTop: 20 }]}>
              <CommanText commanText={'Searching For'} commanTextstyle={styles.textStyle} />
              <CommanText commanText={item?.searching_for} commanTextstyle={styles.textStyle} />
            </View>

            <View style={[styles.row, { width: width - 40, justifyContent: 'space-between' }]}>
              {/* <CommanText commanText={item.documents === true ? 'Govt Id Uploaded' : 'Govt Id Not Uploaded'} commanTextstyle={styles.textStyle} /> */}
              {/* <Image
                source={Images.VerifyIconDoc}
                resizeMode="contain"
                style={[
                  styles.cardInnerIcon,
                  { tintColor: item.documents ? Colors.green : Colors.black },
                ]}
              /> */}
            </View>
          </View>

          <View>
            <View>
              <View style={styles.row}>
                <CommanText
                  commanText={item.name}
                  commanTextstyle={styles.textStyle}
                />

                {item.documents === true && (
                  <Image
                    source={Images.VerifyIconDoc}
                    resizeMode="contain"
                    style={[
                      styles.cardInnerIcon,
                      // { tintColor: item.documents ? Colors.green : Colors.black },
                    ]}
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
                <CommanText commanText={`${item.city_name}`} commanTextstyle={styles.textStyle} />
              </View>
            </View>

            <View style={styles.buttonWrap}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: Colors.white,
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                    borderTopLeftRadius: 7,
                    borderBottomLeftRadius: 7
                  },
                ]}
                onPress={() =>
                  item.express_interest_status
                    ? handleCancelRequest(item.user_id)
                    : handleRequest(item.user_id)
                }>
                <CommanText
                  commanText={item.express_interest_status ? 'Remove' : 'Request'}
                  commanTextstyle={{ color: Colors.black, fontSize: 18 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  item.shortlist_status
                    ? handleCancelFavRequest(item.user_id)
                    : handleFavRequest(item.user_id)
                }>
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
  };

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
      pagingEnabled={true}
      snapToInterval={height}          
      decelerationRate='normal'
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={Colors.primary}
        />
      }
      showsVerticalScrollIndicator={false}
      onEndReached={loadMore}
      onEndReachedThreshold={0.2}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    height: dynamicHeight,
    width: width,
  },
  itemWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'baseline',
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
    // gap: 10,
  },
  cardInnerIcon: {
    width: 20,
    height: 20,
    // tintColor: Colors.white,
  },
  buttonWrap: {
    // marginTop: 10,
    height: 55,
    // // overflow: 'hidden',
    width: width - 40,
    flexDirection: 'row',
    // position:"absolute",
    marginBottom: dynamicMargin,
    alignItems: 'center',
    gap: 10,
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.black,
  },
  button: {
    width: (width - 40) / 2,
    paddingHorizontal: 20,
    paddingVertical: 14,
    // borderRadius:10,
    height: 55
  },
});

export default SnapScrolling;
