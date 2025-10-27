import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../redux/store";
import { logout as logoutAction } from "../redux/actions/authActions";
import { CommonActions } from "@react-navigation/native";
import { navigationRef } from "../navigation/RootNavigation";
import { setAuthState } from "../context/AuthContext"; 

export const globalLogout = async () => {
  try {
    await AsyncStorage.multiRemove(["isAuthenticated", "UserToken", "userData"]);
    store.dispatch(logoutAction());
    setAuthState(false); 
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        // CommonActions.reset({
        //   index: 0,
        //   routes: [{ name: "Login" }],
        // })
      );
    }
  } catch (e) {
    // console.log("❌ Global logout error:", e);
  }
};
