import React from 'react';
import './SummaryCards.scss';
import Button, { ButtonProps } from '../Button/Button';
import { useNavigate } from 'react-router-dom';

interface ISummaryCard {
  id: number;
  title: string;
  count: number;
  icon?: string ;
  button?: ButtonProps;
}

interface SummaryCardsProps {
  data: ISummaryCard[];
  button?: {
    btnText: string;
    onClick: () => void;
    icon: string;
  };
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data, button }) => {
  const navigate = useNavigate();

  const handleNewRequest = () => {
    navigate('/AssistanceFormRequest');
  };

  return (
    <div className="summary-cards">
      {button && (
        <Button
          size="medium"
          type="secondary"
          onClick={button?.onClick ? button.onClick : handleNewRequest}
          btnText={button?.btnText ?? 'פתיחת בקשה חדשה'}
          icon={button?.icon ?? '+'}
        />
      )}
      {data.map((card: ISummaryCard) => (
        <div key={card.id} className="summary-cards__card">
          <>
            <div className="summary-cards__card__card-header">
              <div className="summary-cards__card__icon">{card.icon}</div>
              <span className="summary-cards__card__count">{card.count}</span>
            </div>
            <h3 className="summary-cards__card__title">{card.title}</h3>
          </>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
