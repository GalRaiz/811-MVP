import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './RequestSentFinalStep.scss';
import successForm from '../../assets/successFormSent.png';
import { resetAll } from '../../store/assistanceFormSlice';
import Button from '../storybook/Button/Button';

const RequestSentFinalStep: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoHome = () => {
    dispatch(resetAll());
    navigate('/requesterHomePage');
  };

  return (
    <div className="final-step">
      <img src={successForm} alt="successForm" className="final-step__image" />
      <h2 className="final-step__title">
        בקשתך התקבלה במטה החמ"לים הארצי! ממש בקרוב אחד מנציגנו ייצור איתך קשר
        ויעביר את הבקשה הלאה.
      </h2>
      <Button
        type="tertiary"
        btnText="חזור לדף הבית"
        onClick={handleGoHome}
        icon={'←'}
      />
    </div>
  );
};

export default RequestSentFinalStep;
