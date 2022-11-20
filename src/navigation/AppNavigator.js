import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../provider/AuthProvider";

// Main
import Home from "../screens/Home";
import SecondScreen from "../screens/SecondScreen";
import DoctorMeetingNotes from "../screens/DoctorMeetingNotes";
import Meetings from "../screens/meetings";
import dashboard from "../screens/profile";
import chart from "../screens/chart";

// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";

import Loading from "../screens/utils/Loading";

// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: "AIzaSyC8MkmGzu8SEHkd6CJ7svgaCoitREilu-o",
  authDomain: "healthhack-365503.firebaseapp.com",
  projectId: "healthhack-365503",
  storageBucket: "healthhack-365503.appspot.com",
  messagingSenderId: "94663064700",
  appId: "1:94663064700:web:5dd02528f8b04088d51df9",
  measurementId: "G-HKMV3R983R"
};
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const AuthStack = createNativeStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
      <MainStack.Screen name="DoctorMeetingNotes" component={DoctorMeetingNotes} />
      <MainStack.Screen name="Meetings" component={Meetings} />
      <MainStack.Screen name="dashboard" component={dashboard} />
      <MainStack.Screen name="chart" component={chart} />
    </MainStack.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
