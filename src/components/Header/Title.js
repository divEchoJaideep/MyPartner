import React from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';

class HeaderTitle extends React.PureComponent {
  render() {
    const {style, textstyle, children} = this.props;
    return (
      <View style={[styles.title, style]}>
        <Text numberOfLines={1} style={[styles.titleTxt, textstyle]}>
          {children}
        </Text>
      </View>
    );
  }
}

export default HeaderTitle;
