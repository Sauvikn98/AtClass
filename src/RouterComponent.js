import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Scene, Router, Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconss from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import Icons from 'react-native-vector-icons/AntDesign';
import * as Screens from './screens';
import { displayModal } from './redux/actions';


import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Tab = createBottomTabNavigator();

const AuthStack = createNativeStackNavigator()

const ProfileStack = createNativeStackNavigator()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff'
  },
};

const tabScreenOptions = {
    headerTitle: 'AtClass',
    headerTitleAlign:'left', 
    headerStyle:{
        backgroundColor:'#fff',
    },
    headerTitleStyle:{
        fontSize:26,
        fontFamily: 'Poppins-SemiBold',
		marginLeft: 6,
		borderBottomColor: "#333",
    },
    headerTintColor:'#333',
    tabBarShowLabel: false,
    tabBarActiveTintColor: '#333',
    tabBarInactiveTintColor: 'gray',
    tabBarHideOnKeyboard: true
    
}

const authScreenOptions = {
  
  headerShown: false
}

function HomeTabs() {
	return (
		<Tab.Navigator 
        screenOptions={tabScreenOptions}>
        <Tab.Screen 
            name="Subject List" 
            component={Screens.SubjectList} 
            options={{
              tabBarIcon: ({focused }) => (
                <Icon name="home" color={ focused? '#5350d2': '#4c5561'} size={26} />
                ),
              }}
        />
        <Tab.Screen 
            name="Add Subject" 
            component={Screens.AddSubject} 
            options={{
                tabBarIcon: ({focused }) => (
                  <Icon name="plus" color={ focused? '#5350d2': '#4c5561'} size={26} />
                ),
              }}
        />
      </Tab.Navigator>
	);
  }
  

const RouterComponent = (props) => {

  console.log(props.auth.loggedIn)

  if(props.auth.loggedIn == false) {
    return (

        <NavigationContainer theme={MyTheme}>
          <AuthStack.Navigator screenOptions={authScreenOptions}>
            <AuthStack.Screen name="Auth" component={Screens.SignInForm} />
          </AuthStack.Navigator>
        </NavigationContainer>
      )
  } else {

    
    return (
		<NavigationContainer theme={MyTheme}>

        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Home" component={HomeTabs} />
          <AuthStack.Screen name="Subject Main" component={Screens.SubjectMain} options={tabScreenOptions} />
        </AuthStack.Navigator>
      </NavigationContainer>
  )
}
}

const mapStateToProps = (state) => {
  return {
      auth: state.auth
    }
};


export default connect(mapStateToProps)(RouterComponent);