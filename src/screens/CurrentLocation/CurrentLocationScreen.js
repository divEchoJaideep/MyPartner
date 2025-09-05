import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {Container, Header, Content} from '../../components';
import SearchInput from '../../components/SearchInput/Index';
import Geolocation from '@react-native-community/geolocation';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/CurrentLocationStyle';
import {navigate} from '../../navigation/ReduxNavigation';

const CurrentLocationScreen = ({navigation}) => {
  const [searchData, setSearchData] = useState([]);
  const [selectedPickupLocation, setSelectedPickupLocation] = useState({
    description: null,
  });
  const [selectedDropLocation, setSelectedDropLocation] = useState({
    description: null,
  });

  console.log('selectedPickupLocation :', selectedPickupLocation);

  const API_KEY = 'AIzaSyCp77n_8Z2QDcWMebzUwHK_z3Q1ibZifkA';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await requestCameraPermission();
    });
    return unsubscribe;
  }, []);

  const handleSearch = async (type, text) => {
    if (type == 'pickup') {
      setSelectedPickupLocation({description: text});
    }
    if (type == 'drop') {
      setSelectedDropLocation({description: text});
    }
    const handler = setTimeout(async () => {
      if (text.trim().length > 0) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${API_KEY}`,
          );
          const data = await response.json();
          if (data.predictions) {
            setSearchData({type: type, data: data.predictions});
          }
          console.log('handleSearch data : ', data.predictions);
          //return data.predictions[0];
        } catch (error) {
          console.error('Error fetching autocomplete suggestions: ', error);
        }
      } else {
        setSearchData([]); // If search text is empty, clear the search data
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  };

  // const handlePlaceSelect = async (place) => {
  //   try {
  //     const placeDetail = await fetchPlaceDetail(place.place_id);
  //     const selectedPlace = {
  //       description: place.description,
  //       latitude: placeDetail.geometry.location.lat,
  //       longitude: placeDetail.geometry.location.lng,
  //     };

  //     setSelectedPickupLocation(selectedPlace);
  //     setSelectedDropLocation(selectedPlace);
  //     setPickupLocation({
  //       latitude: placeDetail.geometry.location.lat,
  //       longitude: placeDetail.geometry.location.lng,
  //     });

  //     setInput(place.description);
  //     const coords = {
  //       latitude: placeDetail.geometry.location.lat,
  //       longitude: placeDetail.geometry.location.lng,
  //     };

  //     if (!pickupLocation) {
  //       setPickupLocation(coords);
  //     } else {
  //       setDropLocation(coords);
  //       await getDirections();
  //     }

  //     setSearchData([]);
  //     setInput('');
  //   } catch (error) {
  //     console.error('Error selecting place: ', error);
  //   }
  // };
  const fetchPlaceDetail = async placeId => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`,
      );
      const data = await response.json();
      return data.result;
    } catch (error) {
      throw new Error('Error fetching place details: ', error);
    }
  };

  const selectLocation = item => {
    try {
      if (searchData.type == 'pickup') {
        console.log('type pi: ', searchData.type);
        setSelectedPickupLocation({description: item.description, item: item});
        const response = fetchPlaceDetail(item.place_id);
        const selectedPickPlace = {
          description: item.description,
          latitude: response.geometry.location.lat,
          longitude: response.geometry.location.lng,
        };
      }
      if (searchData.type == 'drop') {
        setSelectedDropLocation({description: item.description, item: item});
        const response = fetchPlaceDetail(item.place_id);
        const selectedDropPlace = {
          description: item.description,
          latitude: response.geometry.location.lat,
          longitude: response.geometry.location.lng,
        };
      }
    } catch (error) {
      throw new Error('Error fetching place details: ', error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.suggestionsList} onPress={selectLocation}>
      <Image
        source={item.searchImg}
        resizeMode="contain"
        style={styles.suggestionsSearchIcon}
      />
      <Text style={styles.suggestionsSearchText}>{item.description}</Text>
    </TouchableOpacity>
  );
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Current Location"
        onBackPress={() => navigation.goBack()}
      />

      <SearchInput
        searchInputStyle={styles.searchInputStyle}
        placeholder="Search pickup location"
        value={selectedPickupLocation.description}
        onChangeText={value => handleSearch('pickup', value)}
      />
      <SearchInput
        searchInputStyle={styles.searchInputStyle}
        placeholder="Search drop location"
        value={selectedDropLocation.description}
        onChangeText={value => handleSearch('drop', value)}
      />
      <View style={styles.searchSuggestions}>
        <CommanHeading
          headingText
          heading="Recent Search"
          navigation={navigate}
        />
        <Content style={styles.suggestionsListContainer}>
          <FlatList
            data={searchData.data}
            renderItem={renderItem}
            bounces={false}
          />
        </Content>
      </View>
    </Container>
  );
};

export default CurrentLocationScreen;
