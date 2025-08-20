import { Link, useNavigate } from 'react-router-dom';
import './HomePage.scss';
import mateLogoGreen from '../assets/mate-logo-green.png';

import Card from '../components/storybook/Card/Card.tsx';

const HomePage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'requesterHomePage',
      imageUrl: mateLogoGreen,
      description: 'מרכז בקרה - דשבורד בקשות',
    },
    {
      title: 'AssistanceFormRequest',
      imageUrl: mateLogoGreen,
      description: 'דוגמא',
    },
    {
      title: 'RequestsPage',
      imageUrl: mateLogoGreen,
      description: 'דוגמא',
    },
  ];
  const clickHandler = (title: string) => {
    navigate(`/${title}`);
  };

  return (
    <div className='main-container'>
      <div className='header'>
        <Link
          className='App-link'
          to='https://300.org.il/'
          target='_blank'
          rel='noopener noreferrer'
        >
          מטה החמ״לים הארצי עמוד תדמית
        </Link>
      </div>
      <div className='content'>
        <div className='content-title'>
          ברוכים הבאים למערכת 811 של מטה החמ״לים הארצי
        </div>
        <div className='content-subtitle'>איך נוכל לעזור היום?</div>
        <div className='card-container'>
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              imageUrl={card.imageUrl}
              description={card.description}
              clickHandler={() => clickHandler(card.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
