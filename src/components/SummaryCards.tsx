import React from 'react';
import './SummaryCards.scss';

interface ISummaryCard {
  id: number;
  title: string;
  count?: number;
  type: 'open' | 'new' | 'in-progress' | 'closed';
  icon?: string;
}

const SummaryCards: React.FC = () => {
  const summaryCards: ISummaryCard[] = [
    {
      id: 1,
      title: 'בקשות פתוחות',
      count: 4,
      type: 'open',
      icon: '🟡'
    },
    {
      id: 2,
      title: 'פתיחת בקשה חדשה',
      type: 'new',
      icon: '+'
    },
    {
      id: 3,
      title: 'בקשות בטיפול',
      count: 23,
      type: 'in-progress',
      icon: '🟢'
    },
    {
      id: 4,
      title: 'בקשות סגורות',
      count: 12,
      type: 'closed',
      icon: '⚫'
    }
  ];

  const getCardClass = (type: string) => {
    return `summary-card ${type}`;
  };

  const handleNewRequest = () => {
    // Navigate to new request form
    console.log('Navigate to new request form');
  };

  return (
    <div className="summary-cards">
      {summaryCards.map((card) => (
        <div key={card.id} className={getCardClass(card.type)}>
          {card.type === 'new' ? (
            <button className="new-request-btn" onClick={handleNewRequest}>
              <div className="icon">{card.icon}</div>
              <span className="title">{card.title}</span>
            </button>
          ) : (
            <>
              <div className="card-header">
                <div className="icon">{card.icon}</div>
                <span className="count">{card.count}</span>
              </div>
              <h3 className="title">{card.title}</h3>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
