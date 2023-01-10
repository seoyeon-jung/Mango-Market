import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";

export default function Write() {
  const isDark = useColorScheme() === "dark";

  return (
    <Text style={{ color: isDark ? "white" : "black" }}>
      this is writing page
    </Text>
  );
}
