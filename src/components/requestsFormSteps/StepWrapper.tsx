import React from 'react';
import './StepWrapper.scss';

export interface StepWrapperProps {
  /** The title of the step */
  title: string;
  /** The main content of the step */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the step number */
  showStepNumber?: boolean;
  /** The current step number */
  stepNumber?: number;
  /** Whether the step is in a loading state */
  isLoading?: boolean;
  /** Optional instructions or help text - can be string or ReactNode */
  instructions?: string[];
}

/**
 * StepWrapper component that provides consistent layout and styling for all form steps
 *
 * @example
 * ```tsx
 * <StepWrapper
 *   title="Personal Information"
 *   subtitle="Tell us about yourself"
 *   stepNumber={1}
 *   instructions="Please provide accurate information"
 * >
 *   <FormField label="Name" />
 * </StepWrapper>
 * ```
 */
export const StepWrapper: React.FC<StepWrapperProps> = ({
  title,
  children,
  className = '',
  instructions,
}) => {
  const wrapperClasses = ['step-wrapper', className].join(' ');

  return (
    <div className={wrapperClasses}>
      {/* Step Header */}
      <div className="step-wrapper__header">
        <div className="step-wrapper__title-section">
          <h2 className="step-wrapper__title">{title}</h2>
        </div>
      </div>

      {/* Step Content */}
      <div className="step-wrapper__content">{children}</div>

      {/* Step Instructions */}
      {instructions && instructions.length > 0 && (
        <div className="step-wrapper__instructions">
          {instructions.map(instruction => (
            <p key={instruction}>{instruction}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepWrapper;
