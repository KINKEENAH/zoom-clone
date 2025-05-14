import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo';

export default function CallRoutesLayout() {
const {isSignedIn} =useAuth();
if (!isSignedIn){
    return <Redirect href ={"/(auth)/signIn"}/>
  }

  return (
   <View style={{flex: 1}}>
    <Tabs
      screenOptions={({ route }) => ({
        header: () => null,
        tabBarActiveTintColor:"#5F5DEC",
        tabBarStyle: {
          display: route.name === "[id]" ? "none" : "flex"
        }
      })}>
        <Tabs.Screen 
        name="index"
        options={{
        title:"All Calls",
        tabBarIcon: ({color}) => (
          <Ionicons name="call-outline" size={24} color={color}/>
        )
        }}/>

<Tabs.Screen 
        name="join"
        options={{
        title:"Join Call",
        headerTitle:"Enter the meeting ID",
        tabBarIcon: ({color}) => (
          <Ionicons name="enter-outline" size={24} color={color}/>
        )
        }}/>
    </Tabs>
   </View>
  )
}