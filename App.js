import React from 'react' 
import { Ionicons } from '@expo/vector-icons'
import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {createAppContainer, createSwitchNavigator } from 'react-navigation'

import LoginScreen from './screens/LoginScreen'
import LoadingScreen from './screens/LoadingScreen'
import RegisterScreen from './screens/RegisterScreen'

import HomeScreen from './screens/HomeScreen'
import PostScreen from './screens/PostScreen'
import ProfileScreen from './screens/ProfileScreen'
import MessageScreen from './screens/MessageScreen'
import NotificationScreen from './screens/NotificationScreen'

// import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDDnjfJpajE7DaLC_whyf-kNz0AThvFGcs",
  authDomain: "socialapp-9590b.firebaseapp.com",
  databaseURL: "https://socialapp-9590b.firebaseio.com",
  projectId: "socialapp-9590b",
  storageBucket: "socialapp-9590b.appspot.com",
  messagingSenderId: "625245498825",
  appId: "1:625245498825:web:f10c6546a3074757b54c18"
}
// firebase.initializeApp(firebaseConfig)
// !firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore()

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-home' size={24} color={tintColor}/>
          }
        },
        Message: {
          screen: MessageScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-chatboxes' size={24} color={tintColor}/>
          }
        },
        Post: {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => 
              <Ionicons 
                size={48} 
                color='#E9446A' 
                name='ios-add-circle' 
                style={{
                  shadowRadius: 10, 
                  shadowOpacity: 0.3,
                  shadowColor: '#E9446A', 
                  shadowOffset: {width: 0, height: 0}, 
                }}
              />
          }
        },
        Notification: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-notifications' size={24} color={tintColor}/>
          }
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-person' size={24} color={tintColor}/>
          }
        }          
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({navigation, defaultHandler}) => {
            navigation.state.key === 'Post' ? navigation.navigate('postModal') :defaultHandler()
          }
        },
        tabBarOptions: {
          activeTintColor: '#161F3D',
          inactiveTintColor: '#B8BBC4',
          showLabel: false
        }
      }
    ),
    postModal: {
      screen: PostScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Loading'
    }
  )
)