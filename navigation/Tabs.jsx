import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Write from "../screens/Write";
import User from "../screens/User";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
      }}
    >
      <Tab.Screen
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "HOME",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "글쓰기",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="create" size={size} color={color} />
          ),
        }}
        name="Write"
        component={Write}
      />
      <Tab.Screen
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "내 정보",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="User"
        component={User}
      />
    </Tab.Navigator>
  );
}
