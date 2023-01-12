import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Write from "../screens/Write";
import User from "../screens/User";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import My from "../screens/My";
import { MANGO_COLOR } from "../colors";

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
          tabBarActiveTintColor: `${MANGO_COLOR}`,
          headerShown: false,
          headerTitleAlign: "center",
          tabBarLabel: "홈",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarActiveTintColor: `${MANGO_COLOR}`,
          headerTitleAlign: "center",
          tabBarLabel: "글쓰기",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="create" size={size} color={color} />
          ),
        }}
        name="글 작성"
        component={Write}
      />
      <Tab.Screen
        options={{
          headerTitleAlign: "center",
          tabBarActiveTintColor: `${MANGO_COLOR}`,
          tabBarLabel: "내 정보",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="마이 페이지"
        component={My}
      />
    </Tab.Navigator>
  );
}
