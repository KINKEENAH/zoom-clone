import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import { SafeAreaView, StyleSheet } from 'react-native';


import { Text, View } from 'react-native';

export default function TabOneScreen() {
  return (
    <View style={{padding:9}}>
      <Text>Hello world</Text>

      <SignedIn>
        <Text>
          You are signed in
        </Text>
      </SignedIn>

      <SignedOut>
        <Text>
          You are signed out
        </Text>
      </SignedOut>
      </View>
  );
}

