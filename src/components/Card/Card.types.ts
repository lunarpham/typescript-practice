import { ReactNode } from "react";
import { Size, Radius } from "../../types/global.types";

export type CardVariant = "elevated" | "outlined" | "flat";

export interface CardProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;

  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: "top" | "bottom";

  variant?: CardVariant;
  size?: Size;
  className?: string;

  onClick?: () => void;
  hover?: boolean;

  footer?: ReactNode;
  actions?: ReactNode;

  padding?: boolean;
  radius?: Radius;
  elevation?: Size;
}
