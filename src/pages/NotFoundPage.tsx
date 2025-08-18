import React from 'react';
import './NotFoundPage.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>העמוד לא נמצא</h2>
        <p>העמוד שחיפשת לא קיים או הועבר לכתובת אחרת.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
