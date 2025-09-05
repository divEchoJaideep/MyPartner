import * as React from 'react';
import {useCallback, useState} from 'react';
import {View, Image} from 'react-native';
import Label from './Label';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';
import Slider from 'rn-range-slider';
import CommanHeading from '../CommanHeading';
import {navigate} from '../../navigation/ReduxNavigation';
import styles from './Styles/Index';
import {Images} from '../../theme';

function RangeSlider() {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const [sliderOpenClose, setSliderOpenClose] = useState(true);
  return (
    <>
      <CommanHeading
        headingCollapseBtn
        heading="Price per Month"
        commanHeadingContainerStyle={styles.priceMonthHeadingStyle}
        arrowIcon={sliderOpenClose ? Images.BottomArrow : Images.ViewAllArrow}
        arrowIconStyle={
          sliderOpenClose
            ? styles.arrowBottomIconStyle
            : styles.arrowRightIconStyle
        }
        navigation={navigate}
        onMoreBtnPress={() => setSliderOpenClose(!sliderOpenClose)}
      />
      {sliderOpenClose && (
        <Slider
          // floatingLabel
          // notchView
          // highThumb={renderThumbRight}
          style={styles.rangeSlider}
          min={0}
          renderThumb={renderThumb}
          max={1000}
          step={1}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          // lowThumb={renderThumbLeft}
        />
      )}
    </>
  );
}

export default RangeSlider;
