import React from 'react';
import './ProgressBar.scss';

// ==== Interfaces ====
interface ProgressBarProps {
  current: number;
  total: number;
  showLabels?: boolean;
  showPercentage?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// ==== Main Component ====
const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showLabels = false,
  showPercentage = false,
  size = 'medium',
  className = ''
}) => {
  const progressClassName = `progress-bar progress-bar--${size} ${className}`.trim();
  const percentage = Math.min((current / total) * 100, 100);

  const getProgressBarClass = (step: number) => {
    if (step < current) {
      return 'progress-bar__step--completed';
    } else if (step === current) {
      return 'progress-bar__step--active';
    } else {
      return '';
    }
  };

  return (
    <div className={progressClassName} dir="rtl">
      {/* Labels Section */}
      {showLabels && (
        <div className="progress-bar__labels">
          <span className="progress-bar__label">
            שלב {current} מתוך {total}
          </span>
          {showPercentage && (
            <span className="progress-bar__percentage">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Steps */}
      <div className="progress-bar__steps">
        {Array.from({ length: total }, (_, i) => i + 1).map(step => (
          <div
            key={step}
            className={`progress-bar__step ${getProgressBarClass(step)}`}
          />
        ))}
      </div>

      {/* Percentage Only (when no labels) */}
      {!showLabels && showPercentage && (
        <div className="progress-bar__percentage-only">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
