📁 -g12-market-hub
   ├── App.js
   ├── app.json
   ├── eas.json
   └── package.json
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy5yweojW5DeIBdyz5wuE_XCOwaFrd-Sc",
  authDomain: "g12-market-hub.firebaseapp.com",
  projectId: "g12-market-hub",
  storageBucket: "g12-market-hub.firebasestorage.app",
  messagingSenderId: "94474885644",
  appId: "1:94474885644:web:3f16be0c8bf4b28986ac29",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("G12 Market Hub", "Please enter your email and password.");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      }
    } catch (error) {
      Alert.alert("G12 Market Hub", error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading G12 Market Hub...</Text>
      </View>
    );
  }

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>G12</Text>
        <Text style={styles.title}>Welcome to G12 Market Hub</Text>
        <Text style={styles.subtitle}>Buy • Sell • Build • Connect</Text>

        <View style={styles.card}>
          <Text style={styles.welcome}>You're signed in.</Text>
          <Text style={styles.email}>{user.email}</Text>

          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>G12</Text>

      <Text style={styles.title}>G12 Market Hub</Text>
      <Text style={styles.subtitle}>Buy • Sell • Build • Connect</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isLogin ? "Login" : "Create Account"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },

  logo: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 8,
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 25,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    padding: 22,
    borderRadius: 16,
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  email: {
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#d0d5dd",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 14,
    fontSize: 16,
  },

  button: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "#111827",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  switchText: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 15,
    fontWeight: "600",
  },
});
"web": {
  "output": "static"
}