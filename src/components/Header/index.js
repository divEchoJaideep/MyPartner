import React from 'react';
import { View, Image, StatusBar, TouchableOpacity } from 'react-native';
import styles from './Styles';
import HeaderLeft from './Left';
import HeaderLeftLoaction from './LeftLocation';
import HeaderRight from './Right';
import HeaderTitle from './Title';
import TitleLogo from './TitleLogo';
import UserLeft from './UserLeft';
import { Images } from '../../theme';

export default class Header extends React.PureComponent {
  static TITLE = HeaderTitle;
  static LEFT = HeaderLeft;
  static LeftLocation = HeaderLeftLoaction;
  static RIGHT = HeaderRight;
  static Logo = TitleLogo;
  static User = UserLeft;

  render() {
    const {
      style,
      children,
      transparent,
      absolute,   // ✅ new prop
      hasBackBtn,
      hasLocation,
      navigation,
      title,
      titleStyle,
      onBackPress,
      onLocationPress,
      onProfilePress,
      clearText,
      onclearTextPress,
      filterBtn,
      onFilterBtnPress,
      textRight,
      onTextRightBtnPress,
    } = this.props;

    return (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <View
          style={[
            styles.header,
            style,
            transparent && styles.transparent,
            absolute && { 
              position: 'absolute', // ✅ overlap mode
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
            },
          ]}
        >
          {hasBackBtn && (
            <HeaderLeft>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => {
                  if (onBackPress) {
                    onBackPress();
                  } else if (navigation) {
                    navigation.goBack();
                  }
                }}
              >
                <Image
                  source={Images.LeftArrowBlack}
                  style={styles.leftArrow}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </HeaderLeft>
          )}

          {hasLocation && (
            <HeaderLeftLoaction
              onLocationPress={() => {
                if (onLocationPress) {
                  onLocationPress();
                }
              }}
            />
          )}

          {title && <HeaderTitle style={titleStyle}>{title}</HeaderTitle>}

          {children && (
            <HeaderRight
              userImage
              onProfilePress={() => {
                if (onProfilePress) {
                  onProfilePress();
                }
              }}
            />
          )}

          {clearText && (
            <HeaderRight
              clearText
              onFilterBtnPress={() => {
                if (onclearTextPress) {
                  onclearTextPress();
                }
              }}
            />
          )}

          {filterBtn && (
            <HeaderRight
              filterBtn
              onFilterBtnPress={() => {
                if (onFilterBtnPress) {
                  onFilterBtnPress();
                }
              }}
            />
          )}

          {textRight && (
            <HeaderRight
              textRight
              onTextRightBtnPress={() => {
                if (onTextRightBtnPress) {
                  onTextRightBtnPress();
                }
              }}
            />
          )}
        </View>
      </>
    );
  }
}
