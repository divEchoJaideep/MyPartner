// import * as React from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   ImageBackground,
//   Text,
//   Animated,
//   PanResponder,
//   Dimensions,
//   StyleSheet,
// } from 'react-native';
// import {Container, Content, Header} from '../../components';
// import SearchInput from '../../components/SearchInput/Index';
// import {Images, Colors} from '../../theme';
// import styles from './Styles/HomeStyle';
// import {navigate} from '../../navigation/ReduxNavigation';
// import data from './data';
// import {useNavigation} from '@react-navigation/native';

// const {width} = Dimensions.get('window');
// const cardWidth = width * 0.9;
// const cardHeight = cardWidth * 1.68;
// function HomeScreen() {
//   const navigation = useNavigation();
//   const [currentIndex, setCurrentIndex] = React.useState(0);
//   const pan = React.useRef(new Animated.ValueXY()).current;

//   const panResponder = React.useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event(
//         [
//           null,
//           {
//             dx: pan.x,
//             dy: pan.y,
//           },
//         ],
//         {useNativeDriver: false},
//       ),
//       onPanResponderRelease: (e, gesture) => {
//         // if (gesture.dx > 120) {
//         //   // Swipe right action
//         //   Animated.spring(pan, {
//         //     toValue: {x: cardWidth + 100, y: gesture.dy}, // Move card off-screen to the right
//         //     useNativeDriver: false,
//         //   }).start(() => {
//         //     setCurrentIndex(prevIndex =>
//         //       prevIndex === 0 ? data.length - 1 : prevIndex - 1,
//         //     );
//         //     pan.setValue({x: 0, y: 0});
//         //   });
//         // } else
//         if (gesture.dx < -120) {
//           // Swipe left action
//           Animated.spring(pan, {
//             toValue: {x: -cardWidth - 100, y: gesture.dy}, // Move card off-screen to the left
//             useNativeDriver: false,
//           }).start(() => {
//             setCurrentIndex(prevIndex =>
//               prevIndex === data.length - 1 ? 0 : prevIndex + 1,
//             );
//             pan.setValue({x: 0, y: 0});
//           });
//         } else {
//           // Reset position if not swiped enough
//           Animated.spring(pan, {
//             toValue: {x: 0, y: 0},
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     }),
//   ).current;
//   const nextScreen = () => {
//     navigation.navigate('ProfileData');
//   };

//   const renderItem = ({item, index}) => {
//     return (
//       <View style={styles.cardsContainer}>
//         <Animated.View
//           key={item.id}
//           style={[
//             styles.cardContainer,
//             {
//               transform: [{translateX: pan.x}, {translateY: pan.y}],
//               zIndex: index === currentIndex ? 1 : 0,
//             },
//             index > currentIndex && {display: 'none'},
//           ]}
//           {...panResponder.panHandlers}>
//           <TouchableOpacity onPress={nextScreen}>
//             <ImageBackground
//               resizeMode="cover"
//               style={[
//                 styles.card,
//                 {zIndex: -index},
//                 {
//                   width: cardWidth,
//                   height: cardHeight,
//                 },
//               ]}
//               source={item.image}>
//               <View
//                 style={{
//                   ...StyleSheet.absoluteFillObject,
//                   backgroundColor: 'rgba(0,0,0,0.5)',
//                 }}
//               />
//               <View style={styles.verifiedTextView}>
//                 <Text style={styles.verifiedText}>
//                   Socialy Verified Account
//                 </Text>
//                 <Image
//                   source={Images.CalenderRightArrow}
//                   resizeMode="contain"
//                   style={styles.checkIcon}
//                 />
//               </View>
//               <View style={styles.verifiedTextView}>
//                 <Text style={styles.verifiedText}>Aadhar Uploaded Profile</Text>
//                 <Image
//                   source={Images.CalenderRightArrow}
//                   resizeMode="contain"
//                   style={styles.checkIcon}
//                 />
//               </View>
//               <View style={styles.detailsView}>
//                 <View>
//                   <Text style={styles.detailsText}>
//                     {item.name}, {item.age}, 5"9
//                   </Text>
//                   <Text style={styles.detailsText}>{item.caste}, Doctor</Text>
//                   <Text style={styles.detailsText}>Jaipur, Rajasthan</Text>
//                 </View>
//                 {/* <View>
//                 <Text style={styles.detailsText}>Caste: {item.caste}</Text>
//                 <Text style={styles.detailsText}>Age: {item.age}</Text>
//                 <Text style={styles.detailsText}>Caste: {item.caste}</Text>
//                 <Text style={styles.detailsText}>Age: {item.age}</Text>
//                 <Text style={styles.detailsText}>Caste: {item.caste}</Text>
//                 </View> */}
//               </View>
//             </ImageBackground>
//           </TouchableOpacity>
//         </Animated.View>
//       </View>
//     );
//   };

//   // }
//   return (
//     <Container>
//       {/* <Header
//         transparent
//         children
//         hasLocation
//         onLocationPress={() => navigation.navigate('CurrentLocation')}
//         onProfilePress={() => navigation.navigate('Profile')}
//       /> */}
//       <Content hasHeader contentContainerStyle={styles.container}>
//         <View style={styles.searchNotifyContent}>
//           <SearchInput
//             searchInputStyle={styles.searchInputStyle}
//             placeholder="Search"
//           />
//           <TouchableOpacity
//             style={styles.notificationBtn}
//             onPress={() => navigation.navigate('Notification')}>
//             <Image
//               source={Images.NotificationImage}
//               resizeMode="contain"
//               style={styles.notificationIcon}
//             />
//             <View style={styles.penddingNotification} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.flatListView}>
//           <FlatList
//             data={data}
//             renderItem={renderItem}
//             keyExtractor={item => item.id}
//             horizontal
//             pagingEnabled
//             scrollEnabled={false}
//             contentContainerStyle={styles.flatListStyle}
//           />
//         </View>

//         <View style={styles.bottomBtnView}>
//           <TouchableOpacity style={styles.bottomBtnTouch}>
//             <Image
//               source={Images.PowerOff}
//               resizeMode="contain"
//               style={styles.bottomBtnImg}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.bottomCenterBtnTouch}>
//             <Image
//               source={Images.StarActive}
//               resizeMode="contain"
//               style={styles.bottomBtnImg}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.bottomBtnTouch}>
//             <Image
//               source={Images.AddedWishlist}
//               resizeMode="contain"
//               style={styles.bottomBtnImg}
//             />
//           </TouchableOpacity>
//         </View>
//       </Content>
//     </Container>
//   );
// }

// export default HomeScreen;