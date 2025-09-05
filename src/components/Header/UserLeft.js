import React from 'react';
import {View} from 'react-native';
import styles from './Styles';

class UserLeft extends React.PureComponent {
  render() {
    const {style, children} = this.props;
    return <View style={[styles.left, style]}>{children}</View>;
  }
}

export default UserLeft;
