import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    height: 45,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    fontFamily: "mon-sb",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.grey,
    paddingLeft: 16,
  },

  errorContent: {
    borderColor: Colors.errorDark,
  },

  disabledContent: {
    borderColor: Colors.lightGrey,
  },

  focusContent: {
    borderColor: Colors.primary,
  },

  input: {
    flex: 1,
    color: Colors.black,
    fontSize: Sizes.sm,
    fontFamily: "mon-sb",
    backgroundColor: "transparent",
  },

  errorInput: {
    color: Colors.errorDark,
  },

  disabledInput: {
    color: Colors.lightGrey,
  },

  errorMessage: {
    fontFamily: "mon-sb",
    color: Colors.errorDark,
  },
});
