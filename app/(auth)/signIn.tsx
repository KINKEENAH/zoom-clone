import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      //console.error(JSON.stringify(err, null, 2))
      Alert.alert("Please try again");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        flex: 1,
        backgroundColor: "#9370db",
        paddingHorizontal: 20,
        justifyContent: "center",
        gap: 10,
      }}
    >
      <MaterialIcons
        name="video-chat"
        size={168}
        color="white"
        style={{
          alignSelf: "center",
          paddingBottom: 20,
        }}
      />
      <TextInput
        autoCapitalize="none"
        style={{
          padding: 20,
          width: "100%",
          borderRadius: 10,
          backgroundColor: "white",
        }}
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="black"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        style={{
          padding: 20,
          width: "100%",
          borderRadius: 10,
          backgroundColor: "white",
        }}
        value={password}
        placeholder="Enter password"
        placeholderTextColor="black"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 20,
        }}
      ></View>
      <TouchableOpacity
        onPress={onSignInPress}
        style={{
          padding: 10,
          width: "100%",
          borderRadius: 10,
          backgroundColor: "white",
        }}
      >
        <Text style={{ textAlign: "center", color: "#9370db" }}>Sign in</Text>
      </TouchableOpacity>

      <Text
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        OR
      </Text>

      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 20,
        }}
      ></View>
<View style={{alignItems:"center"}}>
      <Text style={{color:"white"}}>Don't have an account?</Text>
      <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Link href="/(auth)/signUp">
          <Text style={{ textDecorationLine:"underline", color:"white"}}>Sign up</Text>
        </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
