import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { StyleSheet } from "react-native";

type ButtonStyle = {
  button: {
    backgroundColor: string;
    borderWidth?: number;
    borderColor?: string;
  };
  title: {
    color: string;
  };
  icon: {
    color: string;
  };
};

export interface ButtonVariant {
  enabled: ButtonStyle;
  disabled: ButtonStyle;
}

const buttonPrimary: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: Colors.primary,
    },
    title: {
      color: Colors.white,
    },
    icon: {
      color: Colors.white,
    },
  },
  disabled: {
    button: {
      backgroundColor: Colors.grey,
    },
    title: {
      color: Colors.white,
    },
    icon: {
      color: Colors.white,
    },
  },
};

const buttonOutline: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: Colors.black,
    },
    title: {
      color: Colors.black,
    },
    icon: {
      color: Colors.black,
    },
  },
  disabled: {
    button: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: Colors.lightGrey,
    },
    title: {
      color: Colors.lightGrey,
    },
    icon: {
      color: Colors.lightGrey,
    },
  },
};

export const buttonDanger: ButtonVariant = {
  enabled: {
    button: {
      backgroundColor: "transparent",
    },
    title: { color: Colors.errorDark },
    icon: { color: Colors.errorDark },
  },
  disabled: {
    button: {
      backgroundColor: Colors.grey,
    },
    title: { color: Colors.white },
    icon: { color: Colors.white },
  },
};

export const variants = {
  primary: buttonPrimary,
  outline: buttonOutline,
  danger: buttonDanger,
};

export const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: 50,
  },
  content: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "mon-b",
    fontSize: Sizes.md,
    textAlign: "center",
  },
});
