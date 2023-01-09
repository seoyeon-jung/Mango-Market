import { useFocusEffect } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { authService } from "../firebase";

export default function Home({ navigation: { navigate, reset } }) {
  const isDark = useColorScheme() === "dark";

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
    })
  );

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigate("Stacks", { screen: "Detail" })}
      >
        <Text style={{ color: isDark ? "white" : "black" }}>
          this is home(if click, you can go to detail page)
        </Text>
      </TouchableOpacity>
    </View>
  );
}
