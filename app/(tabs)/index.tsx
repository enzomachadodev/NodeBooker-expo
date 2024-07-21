import { useMemo, useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ExploreHeader } from "@/components/explore-header";
import { ListingsMap } from "@/components/listings-map";
import { Listing } from "@/interfaces/listing";
import { ListingGeo } from "@/interfaces/listing-geo";
import { ListingsBottomSheet } from "@/components/listing-bottom-sheet";
import listingsData from "@/assets/data/airbnb-listings.json";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Explore = () => {
	const listings = useMemo(() => listingsData as Listing[], []);
	const geoItems = useMemo(() => listingsDataGeo as ListingGeo, []);
	const [category, setCategory] = useState<string>("Tiny homes");

	const onCategoryChanged = (category: string) => {
		setCategory(category);
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar style="dark" />
			<Stack.Screen
				options={{
					header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />,
				}}
			/>
			<ListingsMap listings={geoItems} />
			<ListingsBottomSheet
				category={category}
				listings={listings}
			/>
		</GestureHandlerRootView>
	);
};

export default Explore;

