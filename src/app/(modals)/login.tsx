import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import Colors from "@/constants/Colors";

const Login = () => {
  useWarmUpBrowser();
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 26,
  },
});

export default Login;
