import { defaultStyles } from "@/constants/Styles";
import { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { ListingItemRow } from "./listing-item-row";
import { Listing } from "@/interfaces/listing";

interface ListingsProps {
  category: string;
  listings: Listing[];
}

export const Listings = ({ listings, category }: ListingsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        data={loading ? [] : listings}
        renderItem={ListingItemRow}
      />
    </View>
  );
};
