import { Link } from "expo-router";
import { View } from "react-native";

const Explore = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Booking</Link>
      <Link href={"/listing/123"}>Listing</Link>
    </View>
  );
};

export default Explore;
