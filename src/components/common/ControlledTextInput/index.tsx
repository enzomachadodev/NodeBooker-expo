import {
  Controller,
  FieldValues,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
import { useEffect } from "react";
import { Input, InputProps } from "../Input";

export const ControlledTextInput = <FormType extends FieldValues>({
  name,
  defaultValue,
  mask,
  ...textInputProps
}: UseControllerProps<FormType> & InputProps) => {
  const { control, watch, setValue } = useFormContext();

  const value = watch(name);

  useEffect(() => {
    if (defaultValue) {
      const newValue = mask
        ? mask({ oldValue: value, newValue: defaultValue })
        : defaultValue;
      setValue(name, newValue as any);
    }
  }, [defaultValue, name, setValue]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={value}
      render={({ field, fieldState }) => (
        <Input
          value={field.value}
          onBlur={field.onBlur}
          onChangeText={(text) => {
            const newValue = mask
              ? mask({ oldValue: value, newValue: text })
              : text;
            field.onChange(newValue);
          }}
          error={!!fieldState.error}
          errorMessage={fieldState.error?.message}
          {...textInputProps}
        />
      )}
    />
  );
};
