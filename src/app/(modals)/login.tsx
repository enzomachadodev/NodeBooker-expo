import React from "react";
import { View, Text, StyleSheet, Platform, TextInput } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { Button } from "@/components/common/Button";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";

enum Strategy {
  Apple = "oauth_apple",
  Google = "oauth_google",
  Facebook = "oauth_facebook",
}

const Login = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Apple]: appleAuth,
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      console.log("onSelectAuth ~ createdSessionId:", createdSessionId);

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error: ", err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <Button title="Continue" />
      <View style={styles.separatorView}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.separatorLine} />
      </View>
      <View style={{ gap: 20 }}>
        <Button
          LeftIcon={(props) => <Ionicons name="call-outline" {...props} />}
          title="Continue with Phone"
          variant="outline"
        />
        {Platform.OS === "ios" && (
          <Button
            onPress={() => onSelectAuth(Strategy.Apple)}
            LeftIcon={(props) => <Ionicons name="md-logo-apple" {...props} />}
            title="Continue with Apple"
            variant="outline"
          />
        )}
        <Button
          onPress={() => onSelectAuth(Strategy.Google)}
          LeftIcon={(props) => <Ionicons name="md-logo-google" {...props} />}
          title="Continue with Google"
          variant="outline"
        />
        <Button
          onPress={() => onSelectAuth(Strategy.Facebook)}
          LeftIcon={(props) => <Ionicons name="md-logo-facebook" {...props} />}
          title="Continue with Facebook"
          variant="outline"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 26,
    gap: 24,
  },

  separatorView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  separatorLine: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.black,
  },

  separatorText: {
    fontFamily: "mon-sb",
    fontSize: Sizes.sm,
  },
});

export default Login;
