import { FC } from "react";
import "./Card.scss";
import { Icons } from "../icons/EmojiIcons";
import Button from "../Button/Button";
import { ButtonProps } from "../Button/Button";

// ==== Interfaces ====
interface BaseCardProps {
  title?: string;
  description?: string;
  buttons?: ButtonProps[];
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  cardType?: "default" | "marketplace";
}

interface MarketplaceCardProps extends BaseCardProps {
  imageUrl?: string;
  metaData?: Array<{
    label: string;
    icon: string;
  }>;
}

export type ICardProps = MarketplaceCardProps;

// ==== Main Component ====
const Card: FC<ICardProps> = (props) => {
  const isMarketplace = props.cardType === "marketplace";
  const cardClassName = `card card--${props.cardType || "default"} ${
    props.className || ""
  }`.trim();

  return (
    <div className={cardClassName} onClick={props.onClick} dir="rtl">
      {/* Image Section */}
      {isMarketplace && props.imageUrl && (
        <div className="card__image">
          <img src={props.imageUrl} alt={props.title || "card image"} />
        </div>
      )}

      {/* Content Section */}
      <div className="card__content">
        {props.title && <h5 className="card__title">{props.title}</h5>}

        {props.description && (
          <p className="card__description">{props.description}</p>
        )}

        {isMarketplace && props.metaData && (
          <div className="card__meta">
            {props.metaData.map((item, index) => (
              <span key={index} className="card__tag">
                {`${Icons[item.icon as keyof typeof Icons] ?? item.icon} ${
                  item.label
                }`}
              </span>
            ))}
          </div>
        )}

        {props.children && (
          <div className="card__children">{props.children}</div>
        )}
      </div>

      {/* Footer */}
      {props.buttons && props.buttons.length > 0 && (
        <div className="card__footer">
          {props.buttons.map((button, index) => (
            <Button
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
