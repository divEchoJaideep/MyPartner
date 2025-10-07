import React, { useCallback, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Share, Alert, Linking } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Images } from '../../theme';
import styles from './Style/Style';
import { Container, Header } from '../../components';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { getShare, postShar } from '../../api/api';
import { useSelector } from 'react-redux';

export default function Walletscreen() {
  const navigation = useNavigation();
    const token = useSelector(state => state.auth.token);
  
    const [data , setData ] = useState([]);
console.log('data : ', data);

const referralLink = `mypartner://connect/register?ref=Chris`;
const playStoreLink = 'https://play.google.com/store/apps/details?id=com.mypartner';

const onShare = async () => {
  const createdAt = new Date(data?.member_created_at);
  const today = new Date();

  const threeMonthsLater = new Date(createdAt);
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

  if (today > threeMonthsLater) {
    Toast.show({
      type: 'info',
      text1: 'Share Disabled',
      text2: 'You can no longer earn points for sharing after 3 months.',
    });
    return;
  }
  handlePostShareDetails();
  await Share.share({
    message: `Join me on MyPartner App! App link: ${referralLink} OR install: ${playStoreLink}`,
  });
};

useFocusEffect(
   useCallback(() => {
    handlegetShareDetails()
  },[])
)

const handlegetShareDetails = async() => {
  const result = await getShare(token);
  if(result?.success){
    setData(result?.data)
  }else {

  }
}

const handlePostShareDetails = async () => {
  const result = await postShar(token);
  console.log('result :', result)
  if(result?.success){
    handlegetShareDetails();
  }else {
}
}


  const onCopy = () => {
    Clipboard.setString("Chris/connect/register"); 
    // Alert.alert("Copied!", "Referral link copied to clipboard ✅");
   Toast.show({
         type: 'success',
         text1: 'Link copied',
         text2: 'Referral link copied to clipboard ',
         // position: 'bottom',
         // visibilityTime: 2000,
       });
  };

  return (
    <Container  paddingBottomContainer={true}>
      <View  style={styles.container}>
      <Header
        transparent
        hasBackBtn
        title="Invite & Earn"
        onBackPress={() => navigation.goBack()}
      />
      
      <View style={styles.walletBox}>
        <Image
          source={Images.Gift}
          style={styles.giftImage}
          resizeMode="contain"
        />

        <Text style={styles.infoText}>Refer your friends and earn points</Text>
        <Text style={styles.rewardText}>{data?.per_share_points} Points</Text>

       

        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <Text style={styles.shareText}>Share & Earn Now</Text>
        </TouchableOpacity>

        <View style={styles.earnBox}>
          <Text style={styles.earnLabel}>Remaining Points</Text>
          <Text style={styles.earnValue}>{data?.share_points || 0 }</Text>
        </View>

        <View style={styles.referralBox}>
          <Text style={styles.referralLabel}>Referrals</Text>
          <Text style={styles.referralValue}>{data?.last_30_days} of 15</Text>
        </View>
      </View>
       <View style={styles.linkBox}>
          <Text style={styles.linkText}>{playStoreLink}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={onCopy}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
        </View>
    </Container>
  );
}
