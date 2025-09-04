// Card.tsx - Simplified shell component following Modal pattern
import { FC, ReactNode } from "react";
import "./Card.scss";
import Button from "../Button/Button";
import { ButtonProps } from "../Button/Button";
import { Icons } from "../icons/EmojiIcons";

type CardType = 'default' | 'marketplace' | 'info' | 'compact';
type CardSize = 'small' | 'medium' | 'large';
type CardVariant = 'default' | 'elevated' | 'outlined';

interface CardProps {
  id: string;
  type?: CardType;
  size?: CardSize;
  variant?: CardVariant;
  title?: string;
  description?: string;
  children?: ReactNode;
  buttons?: ButtonProps[];
  onClick?: () => void;
  className?: string;
  // Type-specific props
  imageUrl?: string;
  metaData?: Array<{
    label: string;
    icon: string;
  }>;
  icon?: ReactNode;
  avatar?: ReactNode;
  actions?: ReactNode;
}

const Card: FC<CardProps> = ({
  id,
  type = 'default',
  size = 'medium',
  variant = 'default',
  title,
  description,
  children,
  buttons,
  onClick,
  className = "",
  imageUrl,
  metaData,
  icon,
  avatar,
  actions,
}) => {
  const cardClassName = `card card--${type} card--${size} card--${variant} ${className}`.trim();
  const cardId = `card-${id}`;

  const renderCardContent = () => {
    switch (type) {
      case 'marketplace':
        return (
          <>
            {imageUrl && (
              <div className="card__image">
                <img src={imageUrl} alt={title || "card image"} />
              </div>
            )}
            {metaData && metaData.length > 0 && (
              <div className="card__meta">
                {metaData.map((item, index) => (
                  <span key={index} className="card__tag">
                    {`${Icons[item.icon as keyof typeof Icons] ?? item.icon} ${
                      item.label
                    }`}
                  </span>
                ))}
              </div>
            )}
          </>
        );
      
      case 'info':
        return (
          <>
            {icon && (
              <div className="card__icon">
                {icon}
              </div>
            )}
            {children && (
              <div className="card__custom-content">
                {children}
              </div>
            )}
          </>
        );
      
      case 'compact':
        return (
          <>
            {(avatar || actions) && (
              <div className="card__row">
                {avatar && (
                  <div className="card__avatar">
                    {avatar}
                  </div>
                )}
                {actions && (
                  <div className="card__actions">
                    {actions}
                  </div>
                )}
              </div>
            )}
          </>
        );
      
      default:
        return children;
    }
  };

  return (
    <div className={cardClassName} onClick={onClick} dir="rtl" id={cardId}>
      {/* Header Section */}
      {(title || description) && (
        <div className="card__header">
          {title && <h5 className="card__title">{title}</h5>}
          {description && (
            <p className="card__description">{description}</p>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="card__content">
        {renderCardContent()}
      </div>

      {/* Footer Section */}
      {buttons && buttons.length > 0 && (
        <div className="card__footer">
          {buttons.map((button, index) => (
            <Button
              id={`card-button-${index}`}
              key={index}
              type={button.type}
              size="small"
              btnText={button.btnText}
              icon={button.icon}
              iconPosition="right"
              onClick={button.onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
