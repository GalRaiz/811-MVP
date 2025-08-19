import React from 'react';
import './Loader.scss';
import mateLogoGreen from '../assets/mate-logo-green.png';

const sentences = [
  'מחפשים לך יד תומכת...',
  'ממלאים לך את הלב...',
  'בונים גשר לעזרה...',
  'מדליקים אור קטן...',
  'מחברים אותך לאנשים טובים...',
  'מארגנים חיבוק קהילתי...',
  'טוענים תקווה...',
  'מסדרים רגע של נשימה...',
  'מושיטים יד חמה...',
  'מתניעים מעגל של עזרה...',
];

const Loader: React.FC = () => {
  const randomSentence =
    sentences[Math.floor(Math.random() * sentences.length)];

  return (
    <div className='loader-container'>
      <p className='loader-text'>{randomSentence}</p>
      <img src={mateLogoGreen} className='loader-logo' alt='logo' />
    </div>
  );
};

export default Loader;
