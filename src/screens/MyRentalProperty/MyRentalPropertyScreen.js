import * as React from 'react';
import {View} from 'react-native';
import {Container, Content, Header} from '../../components';
import CategoryList from '../../components/CategoryList';
import {navigate} from '../../navigation/ReduxNavigation';
import {Colors} from '../../theme';
import {myRentalPropertyListData} from '../../assets/data';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styles from './Styles/MyRentalPropertyStyle';

const MyRentalPropertyScreen = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'active', title: 'Active'},
    {key: 'history', title: 'History'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
      labelStyle={styles.labelStyle}
      tabStyle={styles.tabStyle}
      activeColor={Colors.pink}
      pressColor={Colors.transparent}
    />
  );

  const HouseRoute = () => (
    <>
      <Content hasHeader contentContainerStyle={styles.container}>
        <CategoryList
          categoryWishListText
          categoryCollectionList
          categoryList={myRentalPropertyListData.slice(0, 2)}
          categoryPropartyImgStyle={styles.categoryPropartyImgStyle}
          categoryRightContentStyle={styles.categoryRightContentStyle}
          navigation={navigate}
          onCategoryClick={() => navigation.navigate('ActiveProperty')}
        />
      </Content>
    </>
  );

  const FlatsRoute = () => (
    <>
      <Content hasHeader contentContainerStyle={styles.container}>
        <CategoryList
          categoryWishListText
          categoryCollectionList
          categoryList={myRentalPropertyListData.slice(2, 4)}
          categoryPropartyImgStyle={styles.categoryPropartyImgStyle}
          categoryRightContentStyle={styles.categoryRightContentStyle}
          navigation={navigate}
          onCategoryClick={() => navigation.navigate('HistoryProperty')}
        />
      </Content>
    </>
  );

  const renderScene = SceneMap({
    active: HouseRoute,
    history: FlatsRoute,
  });
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="My Rental Property"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.tabViewStyle}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          swipeEnabled={false}
          onIndexChange={setIndex}
        />
      </View>
    </Container>
  );
};
export default MyRentalPropertyScreen;
