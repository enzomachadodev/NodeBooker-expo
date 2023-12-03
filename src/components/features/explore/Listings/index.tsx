import { useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

interface ListingsProps {
  category: string;
  listings: any[];
}

export const Listings = ({ category, listings }: ListingsProps) => {
  useEffect(() => {
    console.log(category);
  }, [category]);
  return (
    <ScrollView
      style={[styles.container]}
      contentContainerStyle={[styles.content]}
      showsVerticalScrollIndicator={false}
    >
      <Text>teste</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 150,
  },
});
