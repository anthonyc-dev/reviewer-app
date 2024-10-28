import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { auth } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      Alert.alert("Success", "Logged in successfully");
      router.push("/home");
      setLoading(false);
    } catch (error) {
      console.error("Login error:", error.message);

      // Handle Firebase error codes with more user-friendly messages
      let errorMessage;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage =
            "The email address is badly formatted. Please check your input.";
          break;
        case "auth/user-disabled":
          errorMessage =
            "This account has been disabled. Please contact support.";
          break;
        case "auth/user-not-found":
          errorMessage =
            "No user found with this email. Please check your credentials or sign up.";
          break;
        case "auth/wrong-password":
          errorMessage = "The password is incorrect. Please try again.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid credential.";
          break;
        default:
          errorMessage =
            "An unexpected error occurred. Please try again later.";
      }

      setError(errorMessage);
      Alert.alert("Error", errorMessage);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <ImageBackground
          source={require("../assets/images/bg-image2.jpg")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.innerContainer}>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.title}>Log In</Text>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#aaa"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#aaa"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#aaa"
                />
              </Pressable>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <Text style={styles.switchText}>
              Don't have an account?{" "}
              <Link href={"/signup"} style={styles.link}>
                Sign Up
              </Link>
            </Text>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.backgroundImage}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
    </View>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.secondary,
    marginTop: 50,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  icon: {
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    flex: 1,
    paddingHorizontal: 10,
    outlineStyle: "none",
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 50,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchText: {
    marginTop: 15,
    color: "#000",
  },
  link: {
    color: Colors.secondary,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
