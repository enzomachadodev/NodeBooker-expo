import { defaultStyles } from "@/constants/Styles";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Listing } from "@/interfaces/listing";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { ListingItemRow } from "./listing-item-row";

interface ListingsProps {
  category: string;
  refresh: number;
  listings: Listing[];
}

export const Listings = ({ category, listings, refresh }: ListingsProps) => {
  const listRef = useRef<BottomSheetFlatListMethods>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  return (
    <View style={defaultStyles.container}>
      <View style={defaultStyles.container}>
        <BottomSheetFlatList
          renderItem={ListingItemRow}
          data={loading ? [] : listings}
          ref={listRef}
          ListHeaderComponent={
            <Text style={styles.info}>{listings.length} homes</Text>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
});
