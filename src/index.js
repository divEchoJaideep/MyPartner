import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar, Dimensions, LogBox } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';
import { navigationRef, isReadyRef } from './navigation/ReduxNavigation';
import Styles from './theme/AppStyles';
import store from './redux/store';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import Toast from 'react-native-toast-message';

// import KeyboardManager from 'react-native-keyboard-manager';
// if (Platform.OS === 'ios') {
//   KeyboardManager.setEnableAutoToolbar(true);
//   KeyboardManager.setToolbarDoneBarButtonItemText('Done');
//   KeyboardManager.setShouldShowToolbarPlaceholder(false);
//   KeyboardManager.setShouldToolbarUsesTextFieldTintColor(true);
// }

LogBox.ignoreAllLogs();

const { width } = Dimensions.get('window');

EStyleSheet.build({ $rem: width / 375 });

// Disable font scaling
// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;

// TextInput.defaultProps = TextInput.defaultProps || {};
// TextInput.defaultProps.allowFontScaling = false;

const Root = () => (
  <GestureHandlerRootView style={Styles.rootContainer}>
    {/* <StatusBar
      translucent
      barStyle="dark-content"
      backgroundColor="transparent"
    /> */}
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <AppNavigation />
           <Toast  />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  </GestureHandlerRootView>
);

export default Root;