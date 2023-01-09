import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { authService } from "../firebase";

export default function Write({ navigation }) {
  const isDark = useColorScheme() === "dark";

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: null,
  //     headerRight: () => {
  //       if (authService.currentUser) {
  //         return <TouchableOpacity></TouchableOpacity>;
  //       }
  //     },
  //   });
  // });

  return (
    <Text style={{ color: isDark ? "white" : "black" }}>
      this is writing page
    </Text>
  );
}
