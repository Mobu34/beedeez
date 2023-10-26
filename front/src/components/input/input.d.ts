export interface IInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  secureTextEntry?: boolean;
}
