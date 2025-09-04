import React from 'react';
import './Progress.scss';

// ==== Interfaces ====
export interface ProgressProps {
  current: number;
  total: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// ==== Progress Component ====
const Progress: React.FC<ProgressProps> = ({
  current,
  total,
  size = 'medium',
  className = ''
}) => {
  const progressClassName = `progress progress--${size} ${className}`.trim();

  const getProgressStepClass = (step: number) => {
    if (step < current) {
      return 'progress__step--completed';
    } else if (step === current) {
      return 'progress__step--active';
    } else {
      return '';
    }
  };

  return (
    <div className={progressClassName} dir="rtl">
      <div className="progress__steps">
        {Array.from({ length: total }, (_, i) => i + 1).map(step => (
          <div
            key={step}
            className={`progress__step ${getProgressStepClass(step)}`}
            aria-label={`Step ${step} ${step < current ? 'completed' : step === current ? 'active' : 'pending'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Progress;
