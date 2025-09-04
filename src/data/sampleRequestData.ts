// Sample request data for testing the RequestDetailPanel component

export interface RequestTag {
  id: string;
  label: string;
  icon: string;
  category: 'type' | 'service' | 'location' | 'people' | 'delivery';
}

export interface Task {
  id: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface RequestDetail {
  id: string;
  title: string;
  dateTime: string;
  tags: RequestTag[];
  originator: {
    role: string;
    name: string;
    profilePicture?: string;
  };
  contactDetails: {
    familyName: string;
    address: string;
    phone: string;
  };
  description: string;
  tasks: Task[];
}

// Sample request data matching the image
export const sampleRequest: RequestDetail = {
  id: 'req-001',
  title: 'מזון למשפחת מפונים',
  dateTime: '22.07.2025 | 13:42',
  tags: [
    { id: '1', label: 'מזון', icon: '🍽️', category: 'type' },
    { id: '2', label: 'מנות חמות', icon: '🔥', category: 'service' },
    { id: '3', label: 'מחוז מרכז', icon: '📍', category: 'location' },
    { id: '4', label: '3 אנשים', icon: '👥', category: 'people' },
    { id: '5', label: 'שינוע', icon: '🚚', category: 'delivery' },
  ],
  originator: {
    role: 'ראש קהילה מרכז ת"א יפו',
    name: 'Community Head',
    profilePicture: undefined, // You can add a profile picture URL here
  },
  contactDetails: {
    familyName: 'משפחת ישראל ישראלי',
    address: 'מחוז מרכז, ת"א יפו, אריק שרון 23',
    phone: '055-555-5555',
  },
  description: 'משפחה של מפונים שלאחרונה מתקשים מאוד כלכלית. מאוד יעזור להם ארוחות חמות, במיוחד ל2-3 שבתות הקרובות. 2 הורים וילד.',
  tasks: [
    {
      id: 'task-1',
      description: '< מנות חמות ל- 3 אנשים',
      status: 'pending',
    },
    {
      id: 'task-2',
      description: '> שינוע מנות חמות לכתובת',
      status: 'pending',
    },
  ],
};

// Additional sample requests for testing
export const sampleRequests: RequestDetail[] = [
  sampleRequest,
  {
    id: 'req-002',
    title: 'סיוע רפואי למשפחה',
    dateTime: '22.07.2025 | 14:30',
    tags: [
      { id: '7', label: 'תרופות', icon: '💊', category: 'type' },
      { id: '3', label: 'מחוז מרכז', icon: '📍', category: 'location' },
      { id: '10', label: '1-2 אנשים', icon: '👤', category: 'people' },
    ],
    originator: {
      role: 'מנהל מרכז רפואי',
      name: 'Medical Center Manager',
    },
    contactDetails: {
      familyName: 'משפחת כהן',
      address: 'מחוז מרכז, ת"א יפו, הרצל 15',
      phone: '054-123-4567',
    },
    description: 'משפחה זקוקה לתרופות קבועות. אין להם ביטוח רפואי והמצב הכלכלי קשה.',
    tasks: [
      {
        id: 'task-3',
        description: 'ארגון תרופות נדרשות',
        status: 'in-progress',
      },
      {
        id: 'task-4',
        description: 'משלוח התרופות לכתובת',
        status: 'pending',
      },
    ],
  },
  {
    id: 'req-003',
    title: 'סיוע בביגוד לילדים',
    dateTime: '22.07.2025 | 15:15',
    tags: [
      { id: '6', label: 'ביגוד', icon: '👕', category: 'type' },
      { id: '8', label: 'מחוז צפון', icon: '📍', category: 'location' },
      { id: '11', label: '4+ אנשים', icon: '👥', category: 'people' },
    ],
    originator: {
      role: 'עובד סוציאלי',
      name: 'Social Worker',
    },
    contactDetails: {
      familyName: 'משפחת לוי',
      address: 'מחוז צפון, חיפה, אלנבי 45',
      phone: '050-987-6543',
    },
    description: 'משפחה גדולה עם 5 ילדים זקוקה לביגוד חורף. הילדים בגילאי 3-12.',
    tasks: [
      {
        id: 'task-5',
        description: 'איסוף ביגוד חורף לילדים',
        status: 'pending',
      },
      {
        id: 'task-6',
        description: 'מיון וניקוי הביגוד',
        status: 'pending',
      },
      {
        id: 'task-7',
        description: 'משלוח הביגוד למשפחה',
        status: 'pending',
      },
    ],
  },
];

// Available tags for editing
export const availableTags: RequestTag[] = [
  { id: '1', label: 'מזון', icon: '🍽️', category: 'type' },
  { id: '2', label: 'מנות חמות', icon: '🔥', category: 'service' },
  { id: '3', label: 'מחוז מרכז', icon: '📍', category: 'location' },
  { id: '4', label: '3 אנשים', icon: '👥', category: 'people' },
  { id: '5', label: 'שינוע', icon: '🚚', category: 'delivery' },
  { id: '6', label: 'ביגוד', icon: '👕', category: 'type' },
  { id: '7', label: 'תרופות', icon: '💊', category: 'type' },
  { id: '8', label: 'מחוז צפון', icon: '📍', category: 'location' },
  { id: '9', label: 'מחוז דרום', icon: '📍', category: 'location' },
  { id: '10', label: '1-2 אנשים', icon: '👤', category: 'people' },
  { id: '11', label: '4+ אנשים', icon: '👥', category: 'people' },
  { id: '12', label: 'חינוך', icon: '📚', category: 'type' },
  { id: '13', label: 'דיור', icon: '🏠', category: 'type' },
  { id: '14', label: 'תחבורה', icon: '🚌', category: 'service' },
  { id: '15', label: 'פסיכולוגי', icon: '🧠', category: 'service' },
];

// Status options for tasks
export const taskStatusOptions = [
  { value: 'pending', label: 'ממתין', color: 'yellow' },
  { value: 'in-progress', label: 'בטיפול', color: 'orange' },
  { value: 'completed', label: 'הושלם', color: 'green' },
  { value: 'cancelled', label: 'בוטל', color: 'red' },
];
