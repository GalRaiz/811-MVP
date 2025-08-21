import { FC } from 'react';
import './Card.scss';
import { Icons } from '../icons/EmojiIcons';
import Button from '../Button/Button';

interface ICardProps {
  // imageUrl?: string;
  distance?: string; // לדוגמה: "1.5 ק״מ מאזורך"
  title: string;
  date?: string; // לדוגמה: "22.07"
  category?: {
    name?: string;
    icon?: string;
  }; // לדוגמה: "לוגיסטיקה ושינוע"
  description?: string;
  buttns?: {
    btnTextSecondary?: string;
    btnTextPrimary?: string;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
  };
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const Card: FC<ICardProps> = ({
  
  distance,
  title,
  date,
  category,
  description,
  onPrimaryClick,
  onSecondaryClick,
  buttns,
}) => {
  return (
    <div className="card">
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

      {buttns && (
        <div className="card__footer">
          <Button type="secondary" size="small" btnText={buttns?.btnTextSecondary} onClick={onSecondaryClick} />
          <Button type="primary" size="small" btnText={buttns?.btnTextPrimary} onClick={onPrimaryClick} />
        </div>
      )}
    </div>
  );
};

export default Card;
