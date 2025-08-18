import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './RequestSentFinalStep.scss';
import successForm from '../../assets/successFormSent.png'; 
import { resetAll } from '../../store/assistanceFormSlice';

const RequestSentFinalStep: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoHome = () => {
    dispatch(resetAll());
    navigate('/');
  };

  return (
    <div className="final-step">
      <img src={successForm} alt="successForm" className="final-step__image" />
      <h2 className="final-step__title">בקשתך התקבלה במטה החמ"לים הארצי! ממש בקרוב
      אחד מנציגנו ייצור איתך קשר ויעביר את הבקשה הלאה.</h2>
      <button className="final-step__button" onClick={handleGoHome}>חזור לדף הבית</button>
    </div>
  );
};

export default RequestSentFinalStep;
