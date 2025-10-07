import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { Dimensions, LogBox } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Styles from './theme/AppStyles';
import store from './redux/store';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppContent from './AppContent'; 


// LogBox.ignoreAllLogs(true)

const { width } = Dimensions.get('window');
EStyleSheet.build({ $rem: width / 375 });
const Root = () => {
  return (
    <GestureHandlerRootView style={Styles.rootContainer}>
      <Provider store={store}>
        <AuthProvider>
          <SafeAreaProvider>
            <AppContent /> 
          </SafeAreaProvider>
        </AuthProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default Root;
