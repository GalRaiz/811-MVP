import React from 'react';
import './SummaryCards.scss';
import Button from './storybook/Button/Button';
import { useNavigate } from 'react-router-dom';

interface ISummaryCard {
  id: number;
  title: string;
  count?: number;
  type: 'open' | 'in-progress' | 'closed';
  icon?: string;
}

const SummaryCards: React.FC = () => {
  const navigate = useNavigate();
  const summaryCards: ISummaryCard[] = [
    {
      id: 1,
      title: 'בקשות פתוחות',
      count: 4,
      type: 'open',
      icon: '🟡',
    },
    {
      id: 3,
      title: 'בקשות בטיפול',
      count: 23,
      type: 'in-progress',
      icon: '🟢',
    },
    {
      id: 4,
      title: 'בקשות סגורות',
      count: 12,
      type: 'closed',
      icon: '⚫',
    },
  ];

  const getCardClass = (type: string) => {
    return `summary-card ${type}`;
  };

  const handleNewRequest = () => {
    navigate('/AssistanceFormRequest');
    console.log('Navigate to new request form');
  };

  return (
    <div className='summary-cards'>
    <Button size='medium' type='secondary' onClick={handleNewRequest} btnText={"פתיחת בקשה חדשה"} icon={"+"}/>
      {summaryCards.map(card => (
        <div key={card.id} className={getCardClass(card.type)}>
            <>
              <div className='card-header'>
                <div className='icon'>{card.icon}</div>
                <span className='count'>{card.count}</span>
              </div>
              <h3 className='title'>{card.title}</h3>
            </>
          
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
