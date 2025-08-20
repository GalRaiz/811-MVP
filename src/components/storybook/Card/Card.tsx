import { FC } from 'react';
import './Card.scss';

interface ICardProps {
  imageUrl?: string;
  title: string;
  description?: string;
  clickHandler?: () => void;
  type?: string;
}

const Card: FC<ICardProps> = ({
  imageUrl,
  title,
  description,
  clickHandler,
}) => {
  return (
    <div className='card' onClick={clickHandler}>
      <div className='card-content'>
        <header className='card-title'>{title}</header>
        {imageUrl && <img src={imageUrl} alt={title} className='card-image' />}
        {description && <p className='card-description'>{description}</p>}
      </div>
    </div>
  );
};

export default Card;
