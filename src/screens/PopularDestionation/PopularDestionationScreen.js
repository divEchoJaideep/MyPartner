import * as React from 'react';
import {useRef, useMemo} from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import {popularDestionationData} from '../../assets/data';
import {Container, Header, Content} from '../../components';
import PopularDestionationProparty from '../../components/PopularDestionationProparty';
import DestionationSlider from '../../components/DestionationSlider';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/PopularDestionationStyle';
import {navigate} from '../../navigation/ReduxNavigation';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {Images} from '../../theme';
import MapView, {Marker} from 'react-native-maps';
// import { ScrollView } from 'react-native-gesture-handler';
// import { Images, Colors } from '../../theme';

function PopularDestionationScreen({navigation}) {
  const bottomSheetRef = useRef(null);
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const snapPoints = useMemo(() => ['18%', '50%', '100%']);
  const handleSheetChanges = React.useCallback(index => {
    if (index === 2) {
      setScrollEnabled(true);
    } else {
      setScrollEnabled(false);
    }
  }, []);

  return (
    <>
      <Container>
        <Header
          transparent
          hasBackBtn
          filterBtn
          title="Popular Destination"
          onBackPress={() => navigation.goBack()}
          onFilterBtnPress={() => navigation.navigate('Book')}
        />
        <Content>
          <View>
            <MapView
              style={styles.mapStyle}
              initialRegion={{
                latitude: 21.187090218083345,
                longitude: 72.79023272212653,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034,
              }}>
              <Marker
                draggable
                coordinate={{
                  latitude: 21.187090218083345,
                  longitude: 72.79023272212653,
                }}
                title={'Zluck Solutions'}
                description={'This is an IT Compnay'}
                image={Images.CurrentLocation}
                onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
              />
            </MapView>
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            handleStyle={styles.handleStyle}
            backgroundStyle={styles.backgroundStyle}
            handleIndicatorStyle={styles.handleIndicatorStyle}
            onChange={handleSheetChanges}>
            <Content
              isBottomSheet
              contentContainerStyle={styles.contentContainer}
              scrollEnabled={scrollEnabled}>
              <PopularDestionationProparty
                data={popularDestionationData.slice(0, 3)}
                onDestionationPress={() => {
                  navigation.navigate('PopularDetails');
                }}
                onLikePress={() => {
                  navigation.navigate('Wishlist');
                }}
                onSendMsgPress={() => {
                  navigation.navigate('chatDetails');
                }}
              />
              <CommanHeading
                headingBtn
                heading="Make Your First Booking"
                moreBtn="View all"
                commanHeadingContainerStyle={styles.firstBookingHeadingStyle}
                navigation={navigate}
              />
              <DestionationSlider
                itemWidthStyle
                fullSliderWidth
                sliderContainerStyle={styles.fullScreenSliderContainer}
                sliderBgImagestyle={styles.sliderBgImagestyle}
                carouselSliderContainerStyle={
                  styles.carouselSliderContainerStyle
                }
              />
              <PopularDestionationProparty
                data={popularDestionationData.slice(3, 6)}
                onDestionationPress={() => {
                  navigation.navigate('PopularDetails');
                }}
              />
            </Content>
          </BottomSheet>
        </Content>
        {scrollEnabled && (
          <TouchableOpacity
            style={styles.papperMapIconBtn}
            onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
            <Image
              source={Images.PapperMapIcon}
              resizeMode="contain"
              style={styles.papperMapIcon}
            />
            <Text style={styles.papperMapIconBtnText}>Map</Text>
          </TouchableOpacity>
        )}
      </Container>
    </>
  );
}

export default PopularDestionationScreen;
