import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Linking,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Content, Header } from '../../components';
import CommanText from '../../components/CommanText';
import CommanBtn from '../../components/CommanBtn';
import { Colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles/SubscriptionStyle';
import { Subscription } from '../../api/api';
import { useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-toast-message';
import { initPhonePeSDK, phonePeStartTransaction } from '../../utils/phonepePayment';

const { width } = Dimensions.get('window');

const SubscriptionScreen = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    getSubscriptionPackage();
  }, []);

  // Hardware back handling
  useEffect(() => {
    const backAction = () => {
      if (isPaymentOpen) {
        Toast.show({
          type: 'info',
          text1: 'Payment in progress',
          text2: 'Cannot go back while payment is active',
        });
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [isPaymentOpen]);

  const openDialer = phoneNumber => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Toast.show({
            type: 'error',
            text1: 'Phone dialer not supported',
          });
        } else {
          Linking.openURL(url);
        }
      })
      .catch(() => { });
  };

  const getSubscriptionPackage = async () => {
    try {
      setLoading(true);
      const response = await Subscription(token);
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

  const FeatureRow = ({ label }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <View style={styles.featurePoint} />
      <CommanText commanText={label} commanTextstyle={styles.featureText} />
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={[styles.flatlistView, { width: width * 0.85 }]}>
      <View style={styles.viewStyle}>
        <Image source={{ uri: item.image }} style={styles.packageImage} resizeMode="contain" />
        <View style={styles.innerView}>
          <CommanText commanText={item.name} commanTextstyle={styles.textStyle} />
          <CommanText
            commanText={`Valid for ${item.validity} days`}
            commanTextstyle={styles.randomText}
          />
        </View>
        <View style={styles.lineStyle} />
        <View>
          <CommanText commanText={`₹${item.price}`} commanTextstyle={styles.bigTextStyle} />
          <CommanText
            commanText={`₹${(item.price / (item.validity / 30)).toFixed(2)}/month`}
            commanTextstyle={styles.randomText}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <FeatureRow label={`${item.contact} Contacts`} />
          <FeatureRow label={`${item.express_interest} Express Interests`} />
          <FeatureRow
            label={`${item.photo_gallery} Photo Gallery ${item.photo_gallery > 1 ? 'Images' : 'Image'
              }`}
          />
          <FeatureRow
            label={item.auto_profile_match ? 'Auto Profile Matching' : 'No Auto Matching'}
          />
        </View>
      </View>

      <CommanBtn
        btnText="Continue"
        commanBtnTextStyle={styles.commanBtnTextStyle}
        commanBtnStyle={styles.btnStyle}
        onBtnPress={() => handleRazorpayPayment(item)}
      />
    </View>
  );

  const RAZORPAY_TEST_KEY = 'rzp_test_ROBbgX7aCZ2Tjo';

 const handleRazorpayPayment = async (selectedProduct) => {
  console.log('selectedProduct :',selectedProduct);
  
    const boostAmount = selectedProduct.price; // Assuming price is used
    const boostExpiry = selectedProduct.validity; // Or whatever field defines expiry
    const generateTransactionId = () => {
        const timePart = Date.now();
        const randomPart = Math.floor(1000 + Math.random() * 9000);
        return `T${timePart}${randomPart}`;
    };
    const transactionId = generateTransactionId();
    const amount = Number(boostAmount);
    const mobileNumber = "9999999999";

    console.log("🔄 Initializing PhonePe SDK...");
    const sdkInit = await initPhonePeSDK();

    const paymentResult = await phonePeStartTransaction({
        amount,
        mobileNumber,
        transactionId,
    });

    if (paymentResult?.data?.status === "SUCCESS") {
        const token = await AsyncStorage.getItem('userToken');
        const header = `Bearer ${token}`;
        const data = {
            listing_id: selectedProduct.id,
            amount: Number(boostAmount),
            expire_date: boostExpiry,
        };
        // const result = await boostOrder(data, header);
        // Handle success
    }
};

  if (loading) {
    return (
      <Container>
        <Header transparent hasBackBtn title="Subscription" onBackPress={() => navigation.goBack()} />
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
        onBackPress={() => {
          if (isPaymentOpen) {
            Toast.show({
              type: 'info',
              text1: 'Payment in progress',
              text2: 'Cannot go back while payment is active',
            });
          } else {
            navigation.goBack();
          }
        }}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        {/* {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null} */}

        <FlatList
          data={subscriptionData}
          renderItem={renderItem}
          keyExtractor={item => item.package_id.toString()}
          horizontal
          pagingEnabled
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex(Math.round(x / width));
          }}
          showsHorizontalScrollIndicator={false}
        />

        {subscriptionData.length > 0 && (
          <View style={[styles.pointedStyleView, { width: width }]}>
            {subscriptionData.map((item, index) => (
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
            ))}
          </View>
        )}

        <CommanText
          commanText="The safest, smoothest, & the most secure matchmaking service in India"
          commanTextstyle={styles.randomtextStyle}
        />

        <CommanText commanText="Still Need Help?" commanTextstyle={styles.randomtextStyle} />
        <CommanText
          commanText="We are right here to help you. Give us a call anytime between 10am to 7pm"
          commanTextstyle={styles.randomText}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
          <CommanText commanText="India - " commanTextstyle={styles.randomText} />
          <TouchableOpacity onPress={() => openDialer('1234567890')}>
            <CommanText commanText="+91-1234567890" commanTextstyle={styles.callnumberStyle} />
          </TouchableOpacity>
        </View>
      </Content>
      <Toast />
    </Container>
  );
};

export default SubscriptionScreen;
