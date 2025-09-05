import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import { Images } from '../../theme';
import { Container, Content, Header } from '../../components';
import styles from './Styles/ProfileStyle';
import CommanText from '../../components/CommanText';
import { useNavigation, useRoute } from '@react-navigation/native';
import GetUserInfoById from '../../api/GetUserInfoById';
import { useSelector } from 'react-redux';
import CommanHeading from '../../components/CommanHeading';

const { height } = Dimensions.get('window');

const DrawerState = {
  Closed: -(height / 2),
  Peek: height / 2,
  Open: height - 100,
};
const ProfileData = () => {
  const route = useRoute();
   const { userProfileData } = route.params;
   
  const userId = route?.params?.userId;
  const token = useSelector((state) => state.auth.user.access_token);
  const [openIndex, setOpenIndex] = useState(0);
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const getData = async () => {
      const response = await GetUserInfoById(userId, token);
      if (response.success) {
        setUserData(response.data)
      }
    }
    getData();
  }, [navigation, userId])

  function calculateAgeByYear(birthYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  }

  const data = [
    { id: 0, title: 'Button 1', content: ['Item 1', 'Item 2', 'Item 3'] },
    { id: 1, title: 'Button 2', content: ['Item A', 'Item B'] },
    { id: 2, title: 'Button 3', content: ['Info X', 'Info Y', 'Info Z'] },
    { id: 3, title: 'Button 4', content: ['Option A', 'Option B', 'Option C'] },
    { id: 4, title: 'Button 5', content: ['Detail 1', 'Detail 2'] },
  ];



  const navigation = useNavigation();
  const onDrawerStateChange = data => {
  };
  const renderItem = ({ item, index }) => {
    const isOpen = openIndex === index;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isOpen ? styles.openButton : styles.closedButton,
          ]}
          onPress={() => setOpenIndex(index === openIndex ? -1 : index)}>
          <Text style={styles.buttonText}>{item.title}</Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.verticalContent}>
            {item.content.map((itemContent, idx) => (
              <Text key={idx} style={styles.contentText}>
                {itemContent}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <Container statusBar={true}>
      <Header
        transparent
        hasBackBtn
        style={{ marginTop: 10 }}
        onBackPress={() => navigation.goBack()}
      />
      <Content contentContainerStyle={[styles.detailsViewContainer]}>
        <CommanText
          commanText={userData?.basic_details?.first_name}
          commanTextstyle={styles.detailBigText}
        />
        <CommanText
          commanText={`${calculateAgeByYear(userData?.basic_details?.birth_year)}yrs, ${userData?.address?.city_name}, ${userData?.address?.city_name}`}
          commanTextstyle={styles.detailBigText}
        />
        <CommanHeading
          headingText
          heading="Basic Information"
        />
        <View>
          <CommanText
            commanText="Senior Doctor"
            commanTextstyle={styles.detailsText}
          />
        </View>
        <CommanText
          commanText="Senior Doctor"
          commanTextstyle={styles.detailsText}
        />
        <CommanText
          commanText="Ummarried"
          commanTextstyle={styles.detailsText}
        />
        <View style={{ flexDirection: 'row' }}>
          <CommanText
            commanText="Jaipur, "
            commanTextstyle={styles.detailsText}
          />
          <CommanText
            commanText="Rajasthan"
            commanTextstyle={styles.detailsText}
          />
        </View>

        <CommanText commanText="India" commanTextstyle={styles.detailsText} />
        <CommanText
          commanText="About"
          commanTextstyle={styles.detailBigText}
        />
        {/* <View style={styles.detailsBigTextView}> */}
        {/* <View style={styles.detailsTextView}> */}
        <CommanText
          commanText="Hi, I am a kind-hearted and family-oriented person with a passion for cooking and traveling. I believe in mutual respect and open communication in a marriage. I am looking for an honest, caring partner with similar values. I value family traditions and am excited to start my family with someone special."
          commanTextstyle={styles.detailsText}
        />
        {/* </View> */}
        {/* <View style={styles.detailsTextView}>
              <CommanText
                commanText="Education"
                commanTextstyle={styles.detailsText}
              />
            </View> */}
        {/* </View> */}
        <CommanText
          commanText="Interests"
          commanTextstyle={styles.detailBigText}
        />
        <View style={styles.detailsBigTextView}>
          <View style={styles.detailsTextView}>
            <CommanText
              commanText="Dancing"
              commanTextstyle={styles.detailsText}
            />
          </View>
          <View style={styles.detailsTextView}>
            <CommanText
              commanText="Sports"
              commanTextstyle={styles.detailsText}
            />
          </View>
          <View style={styles.detailsTextView}>
            <CommanText
              commanText="Cars"
              commanTextstyle={styles.detailsText}
            />
          </View>
        </View>
        <View style={styles.detailsBigTextView}>
          <View style={styles.detailsTextView}>
            <CommanText
              commanText="Reading"
              commanTextstyle={styles.detailsText}
            />
          </View>
          <View style={styles.detailsTextView}>
            <CommanText
              commanText="Travelling"
              commanTextstyle={styles.detailsText}
            />
          </View>
        </View>
        <FlatList
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </Content>
      {/* </View> */}
      {/* <Animated.View
        style={[styles.bottomBtnView, {transform: [{translateY: translateY}]}]}>
        <TouchableOpacity style={styles.bottomBtnTouch}>
          <Image
            source={Images.PowerOff}
            resizeMode="contain"
            style={styles.bottomBtnImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtnCenterTouch}>
          <Image
            source={Images.StarActive}
            resizeMode="contain"
            style={styles.bottomBtnImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtnTouch}>
          <Image
            source={Images.AddedWishlist}
            resizeMode="contain"
            style={styles.bottomBtnImg}
          />
        </TouchableOpacity>
      </Animated.View> */}
    </Container>
  );
};

export const animateMove = (y, toValue, callback) => {
  Animated.spring(y, {
    toValue: -toValue,
    tension: 20,
    useNativeDriver: true,
  }).start(finished => {
    // Optional: Call the callback function if provided after animation finishes
    finished && callback && callback();
  });
};

const getNextState = (currentState, val, margin) => {
  // console.log('val: ', val, ' margin: ', margin);
  if (val >= DrawerState.Peek + margin) {
    return DrawerState.Open;
  } else if (val <= DrawerState.Peek - margin) {
    return DrawerState.Peek;
  } else {
    return DrawerState.Peek;
  }
};
// const getNextState = (currentState, val, margin) => {
//   switch (currentState) {
//     case DrawerState.Peek:
//       return val >= currentState + margin
//         ? DrawerState.Open
//         : val <= DrawerState.Peek - margin
//         ? DrawerState.Closed
//         : DrawerState.Peek;
//     case DrawerState.Open:
//       return val >= currentState
//         ? DrawerState.Open
//         : val <= DrawerState.Peek
//         ? DrawerState.Closed
//         : DrawerState.Peek;
//     case DrawerState.Closed:
//       return val >= currentState + margin
//         ? val <= DrawerState.Peek + margin
//           ? DrawerState.Peek
//           : DrawerState.Open
//         : DrawerState.Closed;
//     default:
//       return currentState;
//   }
// };

// Define DrawerState constants for JavaScript
// const DrawerState = {
//   Peek: 'Peek',
//   Open: 'Open',
//   Closed: 'Closed',
// };

// Example usage:

export default ProfileData;