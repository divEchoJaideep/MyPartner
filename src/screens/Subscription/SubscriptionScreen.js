import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Linking,
  Alert,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Content, Header } from '../../components';
import CommanText from '../../components/CommanText';
import CommanBtn from '../../components/CommanBtn';
import { Images } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles/SubscriptionStyle';
import data from './data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subscription } from '../../api/api';

const { width, height } = Dimensions.get('window');

const SubscriptionScreen = props => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log('subscriptionData:', subscriptionData);

  const openDialer = phoneNumber => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone dialer is not supported');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => {
        console.error('An error occurred', err);
      });
  };

  useEffect(() => {
    getSubscriptionPackage();
  }, []);

  const getSubscriptionPackage = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('UserToken');
      const response = await Subscription(token);
      console.log('response :', response);
      
      if (response && response.result) {
        setSubscriptionData(response.data);
      } else {
        setError(response?.message || 'No subscription data found');
      }
    } catch (err) {
      setError('Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.flatlistView, { width: width * 0.85 }]}>
        <View>
          <View style={styles.viewStyle}>
            {/* Package Image */}
            <Image 
              source={{ uri: item.image }} 
              style={styles.packageImage}
              resizeMode="contain"
            />
            
            <View style={styles.innerView}>
              <CommanText
                commanText={item.name}
                commanTextstyle={styles.textStyle}
              />
              <CommanText
                commanText={`Valid for ${item.validity} days`}
                commanTextstyle={styles.randomText}
              />
            </View>
            
            <View style={styles.lineStyle} />
            
            <View>
              <CommanText
                commanText={`₹${item.price}`}
                commanTextstyle={styles.bigTextStyle}
              />
              <CommanText
                commanText={`₹${(item.price / (item.validity / 30)).toFixed(2)}/month`}
                commanTextstyle={styles.randomText}
              />
            </View>
            
            <View style={{ alignItems: 'flex-start', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={styles.featurePoint} />
                <CommanText
                  commanText={`${item.contact} Contacts`}
                  commanTextstyle={styles.featureText}
                />
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={styles.featurePoint} />
                <CommanText
                  commanText={`${item.express_interest} Express Interests`}
                  commanTextstyle={styles.featureText}
                />
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={styles.featurePoint} />
                <CommanText
                  commanText={`${item.photo_gallery} Photo Gallery ${item.photo_gallery > 1 ? 'Images' : 'Image'}`}
                  commanTextstyle={styles.featureText}
                />
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={styles.featurePoint} />
                <CommanText
                  commanText={item.auto_profile_match ? 'Auto Profile Matching' : 'No Auto Matching'}
                  commanTextstyle={styles.featureText}
                />
              </View>
            </View>
          </View>
        </View>
        
        <CommanBtn
          btnText="Continue"
          commanBtnTextStyle={styles.commanBtnTextStyle}
          commanBtnStyle={styles.btnStyle}
          onBtnPress={() => handleSubscriptionSelect(item)}
        />
      </View>
    );
  };

  const handleSubscriptionSelect = (packageItem) => {
    // Handle subscription selection
    console.log('Selected package:', packageItem);
    // You can navigate to payment screen or process subscription
    Alert.alert(
      'Select Package',
      `Are you sure you want to select the ${packageItem.name} package for ₹${packageItem.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => proceedToPayment(packageItem) }
      ]
    );
  };

  const proceedToPayment = (packageItem) => {
    // Implement payment logic here
    console.log('Proceeding to payment for:', packageItem);
    // navigation.navigate('Payment', { package: packageItem });
  };

  if (loading) {
    return (
      <Container>
        <Header
          transparent
          hasBackBtn
          title="Subscription"
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading subscription packages...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Subscription"
        onBackPress={() => navigation.goBack()}
      />

      <Content hasHeader contentContainerStyle={styles.container}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        
        <View>
          <FlatList
            data={subscriptionData}
            renderItem={renderItem}
            keyExtractor={item => item.package_id.toString()}
            horizontal
            // style={{paddingRight:20}}
            pagingEnabled
            onScroll={e => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentIndex(Math.round(x / width));
            }}
            showsHorizontalScrollIndicator={false}
          />
          
          {subscriptionData.length > 0 && (
            <View style={[styles.pointedStyleView, { width: width }]}>
              {subscriptionData.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      alignSelf: 'center',
                      width: currentIndex === index ? 30 : 8,
                      height: currentIndex === index ? 10 : 8,
                      borderRadius: currentIndex === index ? 5 : 4,
                      backgroundColor: currentIndex === index ? '#F15F5F' : 'grey',
                      marginLeft: 5,
                    }}
                  />
                );
              })}
            </View>
          )}
          
          <CommanText
            commanText="The safest, smoothest, & the most secure matchmaking service in India"
            commanTextstyle={styles.randomtextStyle}
          />
          
          {/* <View style={[styles.moneyBackView, { width: width * 0.85 }]}>
            <Image source={Images.moneyBack} style={styles.moneyBackImage} />
            <CommanText
              commanText="Money Back Guarantee"
              commanTextstyle={styles.textStyle}
            />
            <CommanText
              commanText="If you do not find a match within 30 days, get a full refund without any questions asked"
              commanTextstyle={styles.randomText2}
            />
            <View style={styles.line2Style} />
          </View> */}
          
          <CommanText
            commanText="Still Need Help?"
            commanTextstyle={styles.randomtextStyle}
          />
          <CommanText
            commanText="We are right here to help you. Give us a call anytime between 10am to 7pm"
            commanTextstyle={styles.randomText}
          />
          
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <CommanText
              commanText="India - "
              commanTextstyle={styles.randomText}
            />
            <TouchableOpacity onPress={() => openDialer('1234567890')}>
              <CommanText
                commanText="+91-1234567890"
                commanTextstyle={styles.callnumberStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  );
};

// Add these styles to your SubscriptionStyle file
const additionalStyles = {
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    margin: 16,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  packageImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  featurePoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F15F5F',
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
  },
};

export default SubscriptionScreen;