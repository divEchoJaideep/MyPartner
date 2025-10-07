import { useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonrequest from './api/commonrequest';
import { AuthContext } from './context/AuthContext';
import { logout as logoutAction } from './redux/actions/authActions';
import { getUsFriendStory } from './api/api';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';


const useCheckProfile = () => {
    const dispatch = useDispatch();
    const { logout } = useContext(AuthContext);
    const token = useSelector(state => state.auth.token);

    const checkProfile = useCallback(
        async (navigation) => {
            try {
                const response = await getUsFriendStory(token);
                console.log('response :', response);

                if (!response?.success) {
                    // Alert.alert('Logged Out', 'Your account is logged into another device.');
                  Toast.show({
                              type: 'error',
                              text1: 'Logged Out',
                              text2: 'Your account is logged into another device.',
                            });
                    await dispatch(logoutAction());
                    await logout();

                }
            } catch (error) {
                console.error("Error in checkProfile:", error);
            }
        },
        [dispatch, logout, token]
    );

    return checkProfile;
};

export default useCheckProfile;
