import * as React from 'react';
import {Image, View, TextInput} from 'react-native';
import {Images, Colors} from '../../theme';
import styles from './Styles/index';

function SearchInputScreen({
  inputStyle,
  placeholder,
  type,
  searchInputStyle,
  onChangeText,
  value,
}) {
  return (
    <>
      <View style={searchInputStyle}>
        <TextInput
          style={[styles.allInputStyle, inputStyle]}
          placeholder={placeholder}
          keyboardType={type}
          placeholderTextColor={Colors.darkGray}
          value={value}
          onChangeText={text => {
            if (onChangeText) {
              onChangeText(text);
            }
          }}
        />
        <Image
          source={Images.SearchIcon}
          style={styles.searchIcon}
          resizeMode="contain"
        />
      </View>
    </>
  );
}

export default SearchInputScreen;
