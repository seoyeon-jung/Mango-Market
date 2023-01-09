import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import styled from "@emotion/css";
import My from "./screens/My";
import {
  NavigationContainer,
  ThemeProvider,
  DefaultTheme,
} from "@react-navigation/native";
import { darkTheme, lightTheme } from "./theme";
import Root from "./navigations/Root";


export default function App() {
  const isDark = useColorScheme() === "dark";
  // console.log(authService);
  // console.log(isDark);
  return (
    // <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? darkTheme : DefaultTheme}>
        <Root />
        <StatusBar style="auto" />
      </NavigationContainer>
    </ThemeProvider>
    // </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
