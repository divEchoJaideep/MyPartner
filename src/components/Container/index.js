import React from 'react';
import { SafeAreaView, StatusBar, View, Platform } from 'react-native';
import Colors from '../../theme/Colors';
import styles from './Styles';

export default class Container extends React.Component {
  render() {
    const {
      children,
      transparentStatusBar,
      statusBarColor,
      lightContent,
      safeAreaView,
      safeAreaViewHeader,
      conatinerStyle,
      statusBar,
    } = this.props;

    const style = {
      flex: 0,
      alignItems: 'center',
      backgroundColor: !transparentStatusBar
        ? statusBarColor || Colors.lighterGray
        : Colors.transparent,
    };

    return (
      <>
        {statusBar == 'undefined' && (
          <StatusBar
            backgroundColor={
              lightContent
                ? Colors.darkGray
                : statusBarColor || Colors.lighterGray
            }
            barStyle={lightContent ? 'light-content' : 'dark-content'}
          />
        )}

        {/* ✅ SafeAreaView with bottom padding */}
        {safeAreaView !== false && safeAreaViewHeader !== false && (
          <SafeAreaView
            style={[
              styles.safeViewcontainer,
              !statusBar ? styles.safeViewcontainerStatusBar : '',
              conatinerStyle,
              { paddingBottom: Platform.OS === 'ios' ? 20 : 40 }, // 👈 bottom safe padding
            ]}
          >
            {children}
          </SafeAreaView>
        )}

        {(safeAreaView === false || safeAreaViewHeader === false) && (
          <View
            style={[
              styles.container,
              safeAreaViewHeader === false && styles.statusBarMarginTop,
              { paddingBottom: Platform.OS === 'ios' ? 20 : 10 }, // 👈 bottom safe padding
            ]}
          >
            {children}
          </View>
        )}
      </>
    );
  }
}
