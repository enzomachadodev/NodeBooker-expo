import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Listings } from "@/components/listings";
import { ExploreHeader } from "@/components/explore-header";
import { categories } from "@/utils/mocks/categories";
import listingsData from "@/assets/data/airbnb-listings.json";

const Explore = () => {
  const listings = useMemo(() => listingsData as any, []);
  const [category, setCategory] = useState<string>(categories[0].name);

  const onCategoryChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onCategoryChanged} />,
        }}
      />
      <Listings category={category} listings={listings} />
    </View>
  );
};

export default Explore;
