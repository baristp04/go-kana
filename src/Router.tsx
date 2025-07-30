import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/Home/HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dictionary from "./pages/Home/DictionaryScreen";
import QuizHome from "./pages/Quiz/QuizHome";
import QuizPage from "./pages/Quiz/QuizPage";
import Login from "./pages/Authentication/Login"
import Registeration from "./pages/Authentication/Registration"
import { getAuth } from "@react-native-firebase/auth";
import { onAuthStateChanged } from "@react-native-firebase/auth";
import { useDispatch, useSelector, } from "react-redux";
import { setUser, setUserName, setLoading, setIsRegistering } from './state/auth/authSlice';
import { RootState } from "./state/store";
import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LoginScreen"
        component={Login}
      />
      <Stack.Screen
        name="RegisterationScreen"
        component={Registeration} />
    </Stack.Navigator>
  )
}
function HomeStack() {
  const userUid = auth().currentUser?.uid
  const userName = useSelector((state: RootState) => state.auth.userName);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async () => {
      if (userUid) {
        try {
          const snapshot = await database().ref(`users/${userUid}/userName`).once("value")
          const savedUserName = snapshot.val() || "";
          dispatch(setUserName(savedUserName))
        } catch (error) {
          console.log("Couldn't fetch userName:", error)
        }
      }
    })
    return () => unsubscribe()
  }, [userUid])

  return (
    <Stack.Navigator screenOptions={{
      title: userName,
      headerTitleStyle: {
        color: "#e3e2df"
      },
      headerStyle: {
        backgroundColor: "#9a1750"
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => auth().signOut()}>
          <Ionicons name="log-out-outline" size={32} color={"#e3e2df"} />
        </TouchableOpacity>
      )

    }}>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
      />
      <Stack.Screen
        name="DictionaryScreen"
        component={Dictionary} />
    </Stack.Navigator>
  );
}

function QuizStack() {

  const userUid = auth().currentUser?.uid
  const userName = useSelector((state: RootState) => state.auth.userName);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async () => {
      if (userUid) {
        try {
          const snapshot = await database().ref(`users/${userUid}/userName`).once("value")
          const savedUserName = snapshot.val() || "";
          dispatch(setUserName(savedUserName))
        } catch (error) {
          console.log("Couldn't fetch userName:", error)
        }
      }
    })
    return () => unsubscribe()
  }, [userUid])

  return (
    <Stack.Navigator screenOptions={{
      title: userName,
      headerTitleStyle: {
        color: "#e3e2df"
      },
      headerStyle: {
        backgroundColor: "#9a1750"
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => auth().signOut()}>
          <Ionicons name="log-out-outline" size={32} color={"#e3e2df"} />
        </TouchableOpacity>
      )
    }}>
      <Stack.Screen
        name="QuizHome"
        component={QuizHome}
      />
      <Stack.Screen
        name="QuizScreen"
        component={QuizPage}
      />
    </Stack.Navigator>
  );
}

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#9a1750',
        }, tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Quiz") {
            iconName = focused ? "book" : "book-outline";
          } 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#e3e2df",
        unmountOnBlur: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Quiz" component={QuizStack} />
    </Tab.Navigator>
  );
}

const App = () => {

  const dispatch = useDispatch();
  const { user, isLoading, isRegistering } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user: any) => {

      if (isRegistering && user) { return; }

      dispatch(setUser(user))
      dispatch(setLoading(isLoading))

      if (!user) {
        dispatch(setIsRegistering(false))
      }
    })
    return unsubscribe
  }, [dispatch, setIsRegistering])

  //Splash screen soon
  //if(isLoading) return null; 

  return (
    <NavigationContainer>
      {user && !isRegistering ? <Main /> : <AuthStack />}
    </NavigationContainer>
  )

}

export default App;


