import { ButtonProps } from "./Button.types";
import styles from "./Button.module.scss";

export default function Button({
  children,
  onClick,
  size = "md",
  variant = "solid",
  color = "gray",
  radius = "md",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[size]} ${styles[variant]} ${
        styles[color]
      } ${styles[`radius-${radius}`]}`}
    >
      {children}
    </button>
  );
}
