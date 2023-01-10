import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from "react-query";
import Root from "./navigation/Root";
import Login from "./screens/Login";
import My from "./screens/My";

const queryClient = new QueryClient();

export default function App() {
  const isDark = useColorScheme() === "dark";
  // console.log(authService);
  // console.log(isDark);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar />
        <Root />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
