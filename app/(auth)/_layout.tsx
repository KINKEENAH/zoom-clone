import { View, Text } from 'react-native'
import { Redirect, Stack } from 'expo-router'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo';

export default function AuthRouteLayout() {
  const {isSignedIn} =useAuth();
  if (isSignedIn){
    return <Redirect href ={"/(call)"}/>
  }
  return (
    <View style={{flex:1}}>
      <Stack>

        <Stack.Screen
        name="signIn"
        options={{
          title: " Signin to get started",
          headerShown : false,
        }}
        />

<Stack.Screen
        name="signUp"
        options={{
          title: " Create a new account",
          headerBackTitle : "Sign up",
          headerStyle:{backgroundColor:"#5F5DEC"},
          headerTintColor:"white",
        }}/>
      </Stack>
    </View>
  )
}


