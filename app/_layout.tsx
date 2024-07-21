import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import "react-native-reanimated";

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";
import { ModalHeaderText } from "@/components/modal-header-text";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (err) {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (err) {
			return;
		}
	},
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		mon: require("../assets/fonts/Montserrat-Regular.ttf"),
		"mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
		"mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ClerkProvider
			publishableKey={CLERK_PUBLISHABLE_KEY!}
			tokenCache={tokenCache}
		>
			<RootLayoutNav />
		</ClerkProvider>
	);
}

const RootLayoutNav = () => {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();

	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			router.push("/(modals)/login");
		}
	}, [isLoaded]);

	return (
		<Stack>
			<Stack.Screen
				name="(tabs)"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="(modals)/login"
				options={{
					title: "Log in or sign up",
					presentation: "modal",
					headerTitleStyle: {
						fontFamily: "mon-sb",
					},
					headerTitleAlign: "center",

					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons
								name="close-outline"
								size={32}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name="listing/[id]"
				options={{ headerTitle: "", headerTransparent: true }}
			/>
			<Stack.Screen
				name="(modals)/booking"
				options={{
					presentation: "transparentModal",
					animation: "fade",
					headerTransparent: true,
					headerTitle: () => <ModalHeaderText />,
					headerBackVisible: false,
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => router.back()}
							style={{
								backgroundColor: "#fff",
								borderColor: Colors.grey,
								borderRadius: 20,
								borderWidth: 1,
								padding: 4,
								marginRight: 15,
							}}
						>
							<Ionicons
								name="close-outline"
								size={22}
							/>
						</TouchableOpacity>
					),
				}}
			/>
		</Stack>
	);
};

