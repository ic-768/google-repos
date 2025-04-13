import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface ToggleOption<T> {
  label: string;
  value: T;
}

interface ToggleOptionsProps<T> {
  value: T;
  setValue: (value: T) => void;
  options: ToggleOption<T>[];
}

/**
 * Generic component that allows users to toggle between multiple options.
 * @param value - The current value.
 * @param setValue - Function to update the value.
 * @param options - Options to display.
 */
export default function ToggleOptions<T extends string>({
  value,
  setValue,
  options,
}: ToggleOptionsProps<T>) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      size="small"
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
