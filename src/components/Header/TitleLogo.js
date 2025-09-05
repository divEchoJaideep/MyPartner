import React from 'react';
import {View} from 'react-native';
import styles from './Styles';

class TitleLogo extends React.PureComponent {
  render() {
    const {children} = this.props;
    return (
      <>
        <View style={[styles.title]}>{children}</View>
      </>
    );
  }
}

export default TitleLogo;
