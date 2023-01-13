import { ThemeProvider } from "@emotion/react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./theme";

const queryClient = new QueryClient();

export default function App() {
  const isDark = useColorScheme() === "dark";
  // console.log(authService);
  console.log(isDark);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <StatusBar />
          <Root />
        </NavigationContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
