import {
  ActivityIndicator,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { styles, variants } from "./styles";
import { IconProps } from "@/types/icon";
import Colors from "@/constants/Colors";

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
