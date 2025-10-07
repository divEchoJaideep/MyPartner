import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { Images } from '../../theme';
import styles from './Styles';

function HeaderRight({
  onProfilePress,
  userImage,
  filterBtn,
  onFilterBtnPress,
  clearText,
  onclearTextPress,
  textRight,
  hasHomeBTN,
  onHomeBTN,
  onTextRightBtnPress,
  hasMoreBTN,
  onMoreBTN
}) {
  return (
    <>
      {userImage && (
        <TouchableOpacity
          style={styles.userRightImageBtn}
          onPress={onProfilePress}>
          <Image
            source={Images.UserImage}
            resizeMode="contain"
            style={styles.userRightImage}
          />
        </TouchableOpacity>
      )}

      {filterBtn && (
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={onFilterBtnPress}>
          <Image
            source={Images.FilterIcon}
            resizeMode="contain"
            style={styles.filterBtnIcon}
          />
        </TouchableOpacity>
      )}

      {hasHomeBTN && (
        <TouchableOpacity
          style={styles.Home}
          onPress={onHomeBTN}>
          <Image
            source={Images.Home} 
            resizeMode="contain"
            style={styles.homeBTN}
          />
        </TouchableOpacity>
      )}
 {hasMoreBTN && (
        <TouchableOpacity
          style={styles.Home}
          onPress={onMoreBTN}>
          <Image
            source={Images.More} 
            resizeMode="contain"
            style={styles.homeBTN}
          />
        </TouchableOpacity>
      )}
      {clearText && (
        <TouchableOpacity
          style={styles.clearTextBtn}
          onPress={onclearTextPress}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      )}

      {textRight && (
        <TouchableOpacity
          style={styles.textRightBtn}
          onPress={onTextRightBtnPress}>
          <Text style={styles.rightText}>Skip</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

export default HeaderRight;
