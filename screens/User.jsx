import { useFocusEffect } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { authService } from "../firebase";

export default function User({ navigation: { navigate, setOptions, reset } }) {
  const isDark = useColorScheme() === "dark";

  const logout = () => {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공");
        navigate("Home");
      })
      .catch((error) => console.log(error));
  };

  useFocusEffect(
    useCallback(() => {
      if (!authService.currentUser) {
        // 로그인 X
        reset({
          index: 1,
          routes: [
            {
              name: "Tabs",
              params: {
                screen: "Home",
              },
            },
            {
              name: "Stacks",
              params: {
                screen: "Login",
              },
            },
          ],
        });
        return;
      }

      // login O
      setOptions({
        headerRight: () => {
          return (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={logout}>
              <Text>로그아웃</Text>
            </TouchableOpacity>
          );
        },
      });
    })
  );

  return (
    <Text style={{ color: isDark ? "white" : "black" }}>
      this is user's page
    </Text>
  );
}
