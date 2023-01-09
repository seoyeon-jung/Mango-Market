import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { signOut } from "firebase/auth";
import { Text, TouchableOpacity } from "react-native";
// import { authService } from "../firebase";
import Detail from "../screens/Detail";
// import Login from "../screens/Login";

const NativeStack = createNativeStackNavigator();


export default function Stacks({
  navigation: { navigate, goBack, setOptions },
}) {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: () => {
          <TouchableOpacity>
            <Text>뒤로</Text>
          </TouchableOpacity>;
        },
        headerRight: () => {
          return <TouchableOpacity></TouchableOpacity>;
        },
      }}
    >
      {/* <NativeStack.Screen name="Login" component={Login} /> */}
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
}

// import { GREEN_COLOR, MANGO_COLOR } from "../colors";
