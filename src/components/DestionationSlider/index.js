import * as React from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../theme';
import styles from './Styles/index';

const slides = [
  {
    id: 1,
    title: 'Nomaden Sekut',
    text: 'San Diego, California, USA',
    ratingText: '4.8',
    image: Images.SliderHomeHouseImageOne,
    locationImg: Images.LocationImage,
    ratingStarImg: Images.StarActive,
  },
  {
    id: 2,
    title: 'Real Bluesty',
    text: 'San Diego, California, USA',
    ratingText: '4.8',
    image: Images.SliderHouseImageTwo,
    locationImg: Images.LocationImage,
    ratingStarImg: Images.StarActive,
  },
  {
    id: 3,
    title: 'Nomaden Sekut',
    text: 'San Diego, California, USA',
    ratingText: '4.8',
    image: Images.SliderHomeHouseImageOne,
    locationImg: Images.LocationImage,
    ratingStarImg: Images.StarActive,
  },
  {
    id: 4,
    title: 'Real Bluesty',
    text: 'San Diego, California, USA',
    ratingText: '4.8',
    image: Images.SliderHouseImageTwo,
    locationImg: Images.LocationImage,
    ratingStarImg: Images.StarActive,
  },
];

function DestionationSlider(props) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  let renderItem = ({item}) => (
    <>
      <TouchableOpacity
        style={[styles.sliderContainer, props.sliderContainerStyle]}>
        <Image
          source={item.image}
          style={[styles.sliderMainImage, props.sliderBgImagestyle]}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['#0D0D0D', '#353232cc', '#35323200']}
          start={{x: 1, y: 1}}
          end={{x: 1, y: 0.5}}
          style={styles.sliderTextBackground}>
          <Text style={styles.sliderHeading}>{item.title}</Text>
          <View style={styles.sliderLoacationText}>
            <Image
              source={item.locationImg}
              resizeMode="contain"
              style={styles.sliderLocationImg}
            />
            <Text style={styles.sliderPeregraph}>{item.text}</Text>
          </View>
        </LinearGradient>
        <View style={styles.sliderRatingContainer}>
          <Image
            source={item.ratingStarImg}
            resizeMode="contain"
            style={styles.sliderRatingStarImg}
          />
          <Text style={styles.sliderRatingStarText}>{item.ratingText}</Text>
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <>
      <View
        style={[
          styles.carouselSliderContainer,
          props.carouselSliderContainerStyle,
        ]}>
        <Carousel
          data={slides}
          renderItem={renderItem}
          sliderWidth={props.fullSliderWidth ? windowWidth - 40 : windowWidth}
          itemWidth={
            props.itemWidthStyle ? windowWidth - 20 : windowWidth - 145
          }
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          sliderHeight={windowHeight}
          activeSlideAlignment={'start'}
          onSnapToItem={i => setIndex(i)}
        />
        <View style={styles.carouselSliderPagination}>
          <Pagination
            dotContainerStyle={[styles.dotContainerStyle]}
            carouselRef={isCarousel}
            dotsLength={slides.length}
            activeDotIndex={index}
            dotStyle={styles.paginationActiveDot}
            inactiveDotStyle={styles.paginationInActiveDot}
            inactiveDotOpacity={0.9}
            inactiveDotScale={1}
          />
        </View>
      </View>
    </>
  );
}

export default DestionationSlider;
