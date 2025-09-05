import * as React from 'react';
import DestionationSlider from '../DestionationSlider';
import CommanHeading from '../CommanHeading';
import CategoryList from '../CategoryList';
import styles from './Styles/index';
import {navigate} from '../../navigation/ReduxNavigation';
import {categoryListData} from '../../assets/data';
import {Content} from '..';

function HomeHouse({onCategoryClick, onMoreBtnPress}) {
  return (
    <>
      <Content contentContainerStyle={styles.container}>
        <CommanHeading
          headingBtn
          heading="Popular Destination"
          moreBtn="View all"
          navigation={navigate}
          onMoreBtnPress={() => {
            if (onMoreBtnPress) {
              onMoreBtnPress();
            }
          }}
        />
        <DestionationSlider />
        <CommanHeading
          headingBtn
          heading="Best for you"
          moreBtn="View all"
          navigation={navigate}
          onMoreBtnPress={() => {
            if (onMoreBtnPress) {
              onMoreBtnPress();
            }
          }}
        />
        <CategoryList
          categoryNormalList
          categoryNormalListText
          categoryList={categoryListData.slice(0, 4)}
          navigation={navigate}
          onCategoryClick={() => {
            if (onCategoryClick) {
              onCategoryClick();
            }
          }}
        />
        <CommanHeading
          headingBtn
          commanHeadingContainerStyle={styles.firstBookingHeadingStyle}
          heading="Make your first booking"
          moreBtn="View all"
          navigation={navigate}
          onMoreBtnPress={() => {
            if (onMoreBtnPress) {
              onMoreBtnPress();
            }
          }}
        />
        <DestionationSlider
          itemWidthStyle
          fullSliderWidth
          sliderContainerStyle={styles.fullScreenSliderContainer}
          sliderBgImagestyle={styles.sliderBgImagestyle}
          carouselSliderContainerStyle={styles.carouselSliderContainerStyle}
        />
        <CommanHeading
          headingBtn
          heading="Our Collection"
          moreBtn="View all"
          navigation={navigate}
          onMoreBtnPress={() => {
            if (onMoreBtnPress) {
              onMoreBtnPress();
            }
          }}
        />
        <CategoryList
          categoryCollectionList
          categoryCollectionListText
          categoryList={categoryListData.slice(4, 8)}
          navigation={navigate}
          onCategoryClick={() => {
            if (onCategoryClick) {
              onCategoryClick();
            }
          }}
        />
      </Content>
    </>
  );
}

export default HomeHouse;
