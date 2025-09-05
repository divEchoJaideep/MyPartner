import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

// Custom Toast UI
const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#4CAF50' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}
      text2Style={{ fontSize: 14, color: '#666' }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#FF0000' }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}
      text2Style={{ fontSize: 14, color: '#666' }}
    />
  ),
};

export const ToastComponent = () => <Toast config={toastConfig} />;
export default Toast;
