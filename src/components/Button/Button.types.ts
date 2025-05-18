import { ReactNode } from "react";
import { Size, Radius } from "../../types/global.types";

export type ButtonColor = "gray" | "blue" | "green" | "red" | "yellow";
export type ButtonVariant = "solid" | "outline" | "soft" | "shadow";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  size?: Size;
  radius?: Radius;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
}
