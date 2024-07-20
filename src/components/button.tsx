import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { IconProps } from "@/types/icon";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: "primary" | "outline" | "danger";
  LeftIcon?: React.FC<IconProps>;
  RightIcon?: React.FC<IconProps>;
  isLoading?: boolean;
  disabled?: boolean;
  style?: TouchableOpacityProps["style"];
  pathname?: any;
  params?: { [key: string]: string };
}

export const Button = ({
  title,
  onPress,
  variant = "primary",
  LeftIcon,
  RightIcon,
  isLoading,
  disabled,
  style,
}: ButtonProps) => {
  const buttonVariant = variants[variant];

  const buttonStyle = disabled ? buttonVariant.disabled : buttonVariant.enabled;

  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      onPress={onPress}
      style={[styles.container, buttonStyle.button, style]}
    >
      {isLoading ? (
        <ActivityIndicator color={buttonStyle.icon.color} />
      ) : (
        <View style={styles.content}>
          {LeftIcon && (
            <LeftIcon
              size={28}
              style={{ marginRight: 10, position: "absolute", left: 16 }}
              color={variant === "outline" ? Colors.black : Colors.white}
            />
          )}
          <Text style={[styles.title, { color: buttonStyle.title.color }]}>
            {title}
          </Text>
          {RightIcon && (
            <RightIcon
              size={28}
              style={{ marginLeft: 10, position: "absolute", right: 16 }}
              color={variant === "outline" ? Colors.black : Colors.white}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

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

interface ButtonVariant {
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

const buttonDanger: ButtonVariant = {
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

const variants = {
  primary: buttonPrimary,
  outline: buttonOutline,
  danger: buttonDanger,
};

const styles = StyleSheet.create({
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
