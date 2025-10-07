import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Colors from '../../theme/Colors';
import styles from './Styles';

export default class Container extends React.Component {
  static defaultProps = {
    transparentStatusBar: false,
    safeAreaView: true,
    safeAreaViewHeader: true,
    lightContent: false,
    paddingBottomContainer: false, 
    disablePaddingTop: true,       
    statusBar: true,
  };

  render() {
    const {
      children,
      transparentStatusBar,
      statusBarColor,
      lightContent,
      safeAreaView,
      safeAreaViewHeader,
      conatinerStyle,
      style,
      statusBar,
      paddingBottomContainer,
      disablePaddingTop,
    } = this.props;

    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => {
          const statusBarHeight = insets?.top || 0;
          const bottomInset = insets?.bottom || 0;

          return (
            <>
              {/* StatusBar */}
              {statusBar !== false && (
                <StatusBar
                  translucent={!!transparentStatusBar}
                  backgroundColor={
                    transparentStatusBar
                      ? 'transparent'
                      : statusBarColor || Colors.lighterGray
                  }
                  barStyle={lightContent ? 'light-content' : 'dark-content'}
                />
              )}

              {/* SafeAreaView enabled */}
              {safeAreaView !== false && safeAreaViewHeader !== false ? (
                <SafeAreaView
                  style={[
                    styles.safeViewcontainer,
                    conatinerStyle,
                    style,
                    {
                      paddingTop: disablePaddingTop ? 0 : statusBarHeight,
                      paddingBottom: paddingBottomContainer ? bottomInset : 0,
                    },
                  ]}
                >
                  {children}
                </SafeAreaView>
              ) : (
                // Fallback with View
                <View
                  style={[
                    styles.container,
                    conatinerStyle,
                    style,
                    !transparentStatusBar && {
                      marginTop: disablePaddingTop ? 0 : statusBarHeight,
                    },
                    {
                      paddingBottom: paddingBottomContainer ? bottomInset : 0,
                    },
                  ]}
                >
                  {children}
                </View>
              )}
            </>
          );
        }}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}
