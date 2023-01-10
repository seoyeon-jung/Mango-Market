import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { authService } from "../firebase";
import Detail from "../screens/Detail";
import Login from "../screens/Login";

const NativeStack = createNativeStackNavigator();

export default function Stacks({
  navigation: { navigate, goBack, setOptions },
}) {
  const handleAuth = () => {
    if (!!authService.currentUser?.uid) {
      // logout 요청
      signOut(authService)
        .then(() => {
          setOptions({ headerRight: null });
          navigate("Login");
        })
        .catch((error) => console.log("error: ", error));
    } else {
      navigate("Login");
    }
  };

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: () => {
          <TouchableOpacity onPress={() => goBack()}>
            <Text>뒤로</Text>
          </TouchableOpacity>;
        },
        headerRight: () => {
          return (
            <TouchableOpacity onPress={handleAuth}>
              <Text>{authService.currentUser ? "로그아웃" : "로그인"}</Text>
            </TouchableOpacity>
          );
        },
      }}
    >
      <NativeStack.Screen name="Login" component={Login} />
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
}
