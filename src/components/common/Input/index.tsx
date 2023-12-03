import {
  DimensionValue,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { MaskFn } from "@/utils/masks";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { IconProps } from "@/types/icon";

export interface InputProps extends TextInputProps {
  type?: "number" | "email" | "password" | "text";
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  RightIcon?: React.FC<IconProps>;
  LeftIcon?: React.FC<IconProps>;
  mask?: MaskFn;
  width?: DimensionValue;
  style?: StyleProp<ViewStyle>;
  inputRef?: any;
}

export const Input = ({
  type = "text",
  error,
  errorMessage,
  RightIcon,
  LeftIcon,
  width = "100%",
  style,
  inputRef,
  disabled,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(
    type === "password"
  );

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={{ width }}>
      <View
        style={[
          styles.content,
          style,
          error
            ? styles.errorContent
            : disabled
              ? styles.disabledContent
              : null,
        ]}
      >
        {LeftIcon && (
          <LeftIcon
            color={error ? Colors.error : Colors.grey}
            size={24}
            style={{ marginHorizontal: 16 }}
          />
        )}
        <TextInput
          style={[
            styles.input,
            error ? styles.errorInput : disabled ? styles.disabledInput : null,
          ]}
          placeholderTextColor={Colors.lightGrey}
          cursorColor={Colors.grey}
          underlineColorAndroid="transparent"
          secureTextEntry={showPassword}
          keyboardType={
            type === "email"
              ? "email-address"
              : type === "number"
                ? "number-pad"
                : "default"
          }
          autoCapitalize={
            type === "email" || type === "password" ? "none" : undefined
          }
          ref={inputRef}
          editable={!disabled}
          {...rest}
        />
        {type === "password" && (
          <TouchableOpacity
            style={{
              height: "100%",
              justifyContent: "center",
              paddingHorizontal: 16,
            }}
            onPress={() => togglePassword()}
          >
            {showPassword ? (
              <Ionicons
                name="eye-outline"
                color={error ? Colors.error : Colors.grey}
                size={24}
              />
            ) : (
              <Ionicons
                name="eye-off-outline"
                color={error ? Colors.error : Colors.grey}
                size={24}
              />
            )}
          </TouchableOpacity>
        )}
        {RightIcon && type !== "password" && (
          <RightIcon
            color={error ? Colors.error : Colors.grey}
            size={24}
            style={{ marginHorizontal: 16 }}
          />
        )}
      </View>
      {error && errorMessage && (
        <Text style={styles.errorMessage}>
          {errorMessage === "Required" ? "Campo obrigatório" : errorMessage}
        </Text>
      )}
    </View>
  );
};
