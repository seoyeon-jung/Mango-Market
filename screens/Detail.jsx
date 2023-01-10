import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, useColorScheme } from "react-native";
import { authService } from "../firebase";

export default function Detail({ navigation: { reset } }) {
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
    }, [])
  );

  return (
    <View>
      <Text style={{ color: isDark ? "white" : "black" }}>Detail</Text>
    </View>
  );
}
