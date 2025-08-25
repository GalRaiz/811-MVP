import { FC } from 'react';
import './Card.scss';
import { Icons } from '../icons/EmojiIcons';
import Button from '../Button/Button';
import { ButtonProps } from '../Button/Button';

interface ICardProps {
  // imageUrl?: string;
  onClick?: () => void;
  distance?: string; // לדוגמה: "1.5 ק״מ מאזורך"
  title: string;
  date?: string; // לדוגמה: "22.07"
  category?: {
    name?: string;
    icon?: string;
  }; // לדוגמה: "לוגיסטיקה ושינוע"
  description?: string;
  buttons?: ButtonProps[];
}

const Card: FC<ICardProps> = ({
  distance,
  title,
  date,
  category,
  description,
  buttons,
  onClick,
}) => {
  return (
    <div className="card" onClick={onClick}>
      {/* {imageUrl && <img src={imageUrl} alt={title} className="card__image" />} */}

      <div className="card__content">
        {distance && (
          <div className="card__meta">
            <span>{distance}</span>
            <span>{Icons.location}</span>
          </div>
        )}

        <h3 className="card__title">{title}</h3>

        {description && <p className="card__description">{description}</p>}

        <div className="card__tags">
          {date && (
            <span className="card__tag">
              <span>{Icons.calendar}</span> {date}
            </span>
          )}
          {category && (
            <div className="card__tag">
              <span>{Icons.box}</span> {category.name}
            </div>
          )}
        </div>
      </div>

      {buttons && (
        <div className="card__footer">
          {buttons.map((button: ButtonProps, index: number) => (
            <Button
              key={index}
              type={button.type}
              size="small"
              btnText={button.btnText}
              icon={button.icon}
              onClick={button.onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
