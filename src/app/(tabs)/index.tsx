import { ExploreHeader } from "@/components/features/explore/ExploreHeader";
import { Listings } from "@/components/features/explore/Listings";
import { categories } from "@/utils/mocks/categories";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
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
      <Text>teste</Text>
    </View>
  );
};

export default Explore;
