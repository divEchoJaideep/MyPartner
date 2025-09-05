import * as React from 'react';
import {useState} from 'react';
import {TextInput, Image, View, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';
import {Images, Colors} from '../../theme';
import styles from './Styles/index';

function TextInputScreen({
  defaultInput,
  passwordInput,
  datePickerInput,
  inputStyle,
  placeholder,
  type,
  passwordStyle,
  onPress,
  value,
  onChangeText,
  autoCapitalize,
  numberOfLines,
  maxLength,
}) {
  const [showPassword, setShowPassword] = useState(true);
  // console.log('balueeee----',value)
  return (
    <>
      {defaultInput && (
        <TextInput
          autoCapitalize={autoCapitalize}
          style={[styles.allInputStyle, inputStyle]}
          placeholder={placeholder}
          keyboardType={type}
          placeholderTextColor={Colors.darkGray}
          onChangeText={onChangeText}
          value={value}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
        />
      )}
      {passwordInput && (
        <View style={passwordStyle}>
          <TextInput
            style={[styles.allInputStyle, inputStyle]}
            placeholder={placeholder}
            keyboardType={type}
            secureTextEntry={showPassword}
            placeholderTextColor={Colors.darkGray}
            onChangeText={onChangeText}
            value={value}
          />
          <TouchableOpacity
            style={styles.passwordEyeImgBtn}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? Images.HideEye : Images.OpenEye}
              style={styles.passwordEyeImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}
      {datePickerInput && (
        <TextInput
          style={[styles.allInputStyle, inputStyle]}
          placeholder={placeholder}
          keyboardType={type}
          placeholderTextColor={Colors.darkGray}
          value={
            value
              ? dayjs(value).format('DD MMMM YYYY')
              : dayjs().format('DD MMMM YYYY')
          }
          onFocus={() => {
            if (onPress) {
              onPress();
            }
          }}
        />
      )}
    </>
  );
}

export default TextInputScreen;
