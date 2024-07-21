import { useRef, useState } from "react";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Platform,
	StatusBar,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import Colors from "@/constants/Colors";
import Shadows from "@/constants/Shadows";
import Sizes from "@/constants/Sizes";
import { categories } from "@/assets/data/categories";

interface ExploreHeaderProps {
	onCategoryChanged: (category: string) => void;
}

export const ExploreHeader = ({ onCategoryChanged }: ExploreHeaderProps) => {
	const scrollRef = useRef<ScrollView>(null);
	const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
	const androidStatusBar = StatusBar.currentHeight || 0;
	const [activeIndex, setActiveIndex] = useState(0);

	const selectCategory = (index: number) => {
		const selected = itemsRef.current[index];
		setActiveIndex(index);
		if (Platform.OS === "ios") {
			selected?.measure((x) => {
				scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
			});
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		}
		onCategoryChanged(categories[index].name);
	};

	return (
		<SafeAreaView
			style={{
				backgroundColor: Colors.white,
			}}
		>
			<View
				style={[
					styles.container,
					Platform.OS === "android"
						? {
								height: androidStatusBar + 135,
								paddingTop: androidStatusBar,
						  }
						: null,
				]}
			>
				<View style={styles.actionRow}>
					<Link
						href={"/(modals)/booking"}
						asChild
					>
						<TouchableOpacity>
							<View style={styles.searchBtn}>
								<Ionicons
									name="search"
									size={24}
								/>
								<View>
									<Text style={{ fontFamily: "mon-sb" }}>Where to?</Text>
									<Text style={{ fontFamily: "mon", color: Colors.grey }}>
										Anywhere • Any week
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					</Link>
					<TouchableOpacity style={styles.filterBtn}>
						<Ionicons
							name="options-outline"
							size={24}
						/>
					</TouchableOpacity>
				</View>

				<ScrollView
					horizontal={true}
					ref={scrollRef}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						alignItems: "center",
						gap: 30,
						paddingHorizontal: 16,
					}}
				>
					{categories.map((item, index) => (
						<TouchableOpacity
							ref={(el) => (itemsRef.current[index] = el)}
							key={index}
							style={[
								styles.categoriesBtn,
								activeIndex === index ? styles.categoriesBtnActive : null,
							]}
							onPress={() => selectCategory(index)}
						>
							<MaterialIcons
								name={item.icon as any}
								size={24}
								color={activeIndex === index ? Colors.black : Colors.grey}
							/>
							<Text
								style={[
									styles.categoryText,
									activeIndex === index ? styles.categoryTextActive : null,
								]}
							>
								{item.name}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 130,
		...Shadows.md,
	},

	actionRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 24,
		paddingBottom: 16,
		gap: 16,
	},

	filterBtn: {
		padding: 10,
		borderWidth: 1,
		borderColor: Colors.grey,
		borderRadius: 50,
	},

	searchBtn: {
		backgroundColor: "#fff",
		flexDirection: "row",
		gap: 10,
		padding: 14,
		alignItems: "center",
		width: 280,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "#c2c2c2",
		borderRadius: 30,
		...Shadows.sm,
	},

	categoryText: {
		fontSize: Sizes.sm,
		fontFamily: "mon-sb",
		color: Colors.grey,
	},
	categoryTextActive: {
		color: Colors.black,
	},
	categoriesBtn: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 8,
		borderBottomWidth: 2,
		borderBottomColor: Colors.white,
	},
	categoriesBtnActive: {
		borderBottomColor: Colors.black,
	},
});

