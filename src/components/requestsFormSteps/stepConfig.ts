import React from 'react';
import AssistanceForm from './AssistanceForm';
import LocationStep from './LocationStep';
import AssistanceTypeStep from './AssistanceTypeStep';
import StepSubTypeSelection from '../../pages/AssistanceForm/StepSubTypeSelection';
import FinalDetailsStep from './FinalDetailsStep';
import AssistanceFormFinalStep from './AssistanceFormFinalStep';
import FormSummaryStep from './FormSummaryStep';
import RequestSentFinalStep from './RequestSentFinalStep';

export interface IStepConfig {
  id: number;
  component: React.ComponentType;
  title?: string;
  subtitle?: string;
  instructions?: string[];
  className?: string;
  isFinalStep?: boolean;
}

/**
 * Step configuration array that defines all form steps
 * This makes it easy to reorder, add, or remove steps without changing core logic
 */
export const formSteps: IStepConfig[] = [
  {
    id: 1,
    component: AssistanceForm,
    title: 'מי צריך עזרה?',
    instructions: [
      'כתבו שם שמייצג את מי שצריך את העזרה. זה יכול להיות "ישראל ישראלי" או "קבוצת דיירי רח\' הארזים".',
      'אנחנו רק רוצים לדעת למי בדיוק להפנות את הסיוע.',
      'מספר הטלפון צריך להיות של מישהו שנמצא עם המקבלים ויכול לענות לשליח או למתנדב בשטח.',
    ],
  },
  {
    id: 2,
    component: LocationStep,
    title: 'לאיפה להגיע?',
    instructions: [
      'אנחנו עובדים עם מחוזות פיקוד העורף.',
      'מיקום מדויק מאפשר לנו לשייך את הבקשה לחמ"ל הקרוב.',
    ],
  },
  {
    id: 3,
    component: AssistanceTypeStep,
    title: 'איזה סוג סיוע נדרש?',
    instructions: [
      'בחירה של קטגוריה עוזרת לנו להפנות את הבקשה לגורמים הנכונים.',
    ],
  },
  {
    id: 4,
    component: StepSubTypeSelection,
    title: 'פירוט סוג הסיוע',
    instructions: [
      'יש לבחור את סוגי הסיוע הספציפיים הנדרשים',
      'יש לבחור לפחות סוג אחד',
    ],
  },
  {
    id: 5,
    component: FinalDetailsStep,
    title: 'כמה פרטים אחרונים...',
    className: 'step-wrapper--final-details',
  },
  {
    id: 6,
    component: AssistanceFormFinalStep,
    title: 'אישור פרטים',
    className: 'step-wrapper--confirmation',
  },
  {
    id: 7,
    title: 'נא לוודא שכל הפרטים נכונים',
    component: FormSummaryStep,
    className: 'step-wrapper--summary',
  },
  {
    id: 8,
    component: RequestSentFinalStep,
    title: 'הבקשה נשלחה בהצלחה!',
    instructions: ['תודה על פנייתכם, נציג יצור איתכם קשר בהקדם'],
    className: 'step-wrapper--final',
    isFinalStep: true,
  },
];

/**
 * Helper function to get step configuration by ID
 */
export const getStepConfig = (stepId: number): IStepConfig | undefined => {
  return formSteps.find(step => step.id === stepId);
};

/**
 * Helper function to get total number of steps
 */
export const getTotalSteps = (): number => {
  return formSteps.length;
};

/**
 * Helper function to check if step is final
 */
export const isFinalStep = (stepId: number): boolean => {
  const step = getStepConfig(stepId);
  return step?.isFinalStep || false;
};

/**
 * Helper function to get step title by ID
 */
export const getStepTitle = (stepId: number): string => {
  const step = getStepConfig(stepId);
  return step?.title || '';
};
