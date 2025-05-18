import { CardProps } from "./Card.types";
import styles from "./Card.module.scss";
import classNames from "classnames";

export default function Card({
  children,
  title,
  subtitle,
  imageUrl,
  imageAlt = "",
  imagePosition = "top",
  variant = "elevated",
  size = "md",
  className,
  onClick,
  hover,
  footer,
  actions,
  padding = false,
  radius,
  elevation,
}: CardProps) {
  function handleClick() {
    if (onClick) onClick();
  }

  function renderImage() {
    if (!imageUrl) return null;

    return (
      <div className={styles.imageClasses}>
        <img src={imageUrl} alt={imageAlt} className={styles.image} />
      </div>
    );
  }

  const cardClassNames = classNames(
    styles.card,
    styles[variant],
    styles[size],
    {
      [styles.hover]: hover,
      [styles.clickable]: !!onClick,
      [styles.padding]: padding,
    },
    className
  );

  const customStyle = {
    ...(radius !== undefined ? { borderRadius: `${radius}px` } : {}),
    ...(variant === "elevated" && elevation !== undefined
      ? { "--elevation": elevation }
      : {}),
  };

  return (
    <div
      className={cardClassNames}
      onClick={handleClick}
      style={customStyle as React.CSSProperties}
    >
      {imagePosition === "top" && renderImage()}

      <div className="body">
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          </div>
        )}

        <div className={styles.content}>{children}</div>

        {actions && <div className={styles.actions}>{actions}</div>}

        {footer && <div className={styles.footer}>{footer}</div>}

        {imagePosition === "bottom" && renderImage()}
      </div>
    </div>
  );
}
