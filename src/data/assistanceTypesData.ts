export interface IAssistanceSubType {
  id: string;
  label: string; // Hebrew
  name: string; // English
  icon?: string;
}

export interface IAssistanceType {
  id: string;
  label: string; // Hebrew
  name: string; // English
  icon: string;
  subTypes: IAssistanceSubType[];
}

export const assistanceTypes: IAssistanceType[] = [
  {
    id: 'food',
    label: 'מזון',
    name: 'food',
    icon: '🍽️',
    subTypes: [
      { id: 'hot-meals', label: 'מנות חמות', name: 'hot-meals', icon: '🍲' },
      {
        id: 'food-packages',
        label: 'חבילות מזון',
        name: 'food-packages',
        icon: '📦',
      },
      {
        id: 'baby-food',
        label: 'מזון לתינוקות',
        name: 'baby-food',
        icon: '🍼',
      },
      {
        id: 'dietary-restrictions',
        label: 'מזון מיוחד (צליאק, סוכרת)',
        name: 'dietary-restrictions',
        icon: '🥗',
      },
    ],
  },
  {
    id: 'transportation',
    label: 'הסעות ותחבורה',
    name: 'transportation',
    icon: '🚗',
    subTypes: [
      {
        id: 'medical-transport',
        label: 'הסעות רפואיות',
        name: 'medical-transport',
        icon: '🚑',
      },
      {
        id: 'public-transport',
        label: 'כרטיסי תחבורה ציבורית',
        name: 'public-transport',
        icon: '🚌',
      },
      {
        id: 'evacuation',
        label: 'פינוי ופיזור',
        name: 'evacuation',
        icon: '🚁',
      },
      {
        id: 'delivery',
        label: 'משלוחים והובלות',
        name: 'delivery',
        icon: '🚚',
      },
    ],
  },
  {
    id: 'logistics',
    label: 'לוגיסטיקה ושינוע',
    name: 'logistics',
    icon: '🚛',
    subTypes: [
      {
        id: 'equipment-move',
        label: 'העברת ציוד',
        name: 'equipment-move',
        icon: '📦',
      },
      {
        id: 'furniture-move',
        label: 'העברת רהיטים',
        name: 'furniture-move',
        icon: '🪑',
      },
      { id: 'storage', label: 'אחסון זמני', name: 'storage', icon: '🏭' },
      { id: 'packaging', label: 'אריזה ומיון', name: 'packaging', icon: '📋' },
    ],
  },
  {
    id: 'personal-equipment',
    label: 'ציוד אישי',
    name: 'personal-equipment',
    icon: '🛍️',
    subTypes: [
      { id: 'clothing', label: 'ביגוד', name: 'clothing', icon: '👕' },
      { id: 'hygiene', label: 'מוצרי היגיינה', name: 'hygiene', icon: '🧴' },
      {
        id: 'medical-supplies',
        label: 'ציוד רפואי',
        name: 'medical-supplies',
        icon: '💊',
      },
      {
        id: 'electronics',
        label: 'מכשירים אלקטרוניים',
        name: 'electronics',
        icon: '📱',
      },
    ],
  },
  {
    id: 'housing',
    label: 'דיור ואירוח קהילתי',
    name: 'housing',
    icon: '🏢',
    subTypes: [
      {
        id: 'temporary-housing',
        label: 'דיור זמני',
        name: 'temporary-housing',
        icon: '🏠',
      },
      {
        id: 'hotel-accommodation',
        label: 'אירוח במלון',
        name: 'hotel-accommodation',
        icon: '🏨',
      },
      {
        id: 'community-shelter',
        label: 'מקלט קהילתי',
        name: 'community-shelter',
        icon: '🏛️',
      },
      {
        id: 'rental-assistance',
        label: 'סיוע בשכירות',
        name: 'rental-assistance',
        icon: '🏘️',
      },
    ],
  },
  {
    id: 'shelters',
    label: 'מקלטים ומרחבים מוגנים',
    name: 'shelters',
    icon: '🏠',
    subTypes: [
      {
        id: 'bomb-shelter',
        label: 'מקלט מפני טילים',
        name: 'bomb-shelter',
        icon: '🛡️',
      },
      { id: 'safe-room', label: 'חדר מוגן', name: 'safe-room', icon: '🚪' },
      {
        id: 'underground-shelter',
        label: 'מקלט תת קרקעי',
        name: 'underground-shelter',
        icon: '⛰️',
      },
      {
        id: 'community-center',
        label: 'מרכז קהילתי מוגן',
        name: 'community-center',
        icon: '🏛️',
      },
    ],
  },
  {
    id: 'volunteers',
    label: 'מתנדבים',
    name: 'volunteers',
    icon: '❤️',
    subTypes: [
      {
        id: 'medical-volunteers',
        label: 'מתנדבים רפואיים',
        name: 'medical-volunteers',
        icon: '👨‍⚕️',
      },
      {
        id: 'logistics-volunteers',
        label: 'מתנדבים לוגיסטיים',
        name: 'logistics-volunteers',
        icon: '📦',
      },
      {
        id: 'social-volunteers',
        label: 'מתנדבים חברתיים',
        name: 'social-volunteers',
        icon: '🤝',
      },
      {
        id: 'technical-volunteers',
        label: 'מתנדבים טכניים',
        name: 'technical-volunteers',
        icon: '🔧',
      },
    ],
  },
  {
    id: 'mental-health',
    label: 'בריאות הנפש',
    name: 'mental-health',
    icon: '🧠',
    subTypes: [
      {
        id: 'counseling',
        label: 'ייעוץ פסיכולוגי',
        name: 'counseling',
        icon: '💭',
      },
      {
        id: 'crisis-support',
        label: 'תמיכה במשבר',
        name: 'crisis-support',
        icon: '🆘',
      },
      {
        id: 'group-therapy',
        label: 'טיפול קבוצתי',
        name: 'group-therapy',
        icon: '👥',
      },
      {
        id: 'emergency-psychiatry',
        label: 'פסיכיאטריה דחופה',
        name: 'emergency-psychiatry',
        icon: '🏥',
      },
    ],
  },
  {
    id: 'education-equipment',
    label: 'ציוד למוסדות חינוך וקהילה',
    name: 'education-equipment',
    icon: '🏫',
    subTypes: [
      {
        id: 'computers',
        label: 'מחשבים וטכנולוגיה',
        name: 'computers',
        icon: '💻',
      },
      { id: 'books', label: 'ספרים וחומרי לימוד', name: 'books', icon: '📚' },
      {
        id: 'furniture',
        label: 'רהיטים לכיתות',
        name: 'furniture',
        icon: '🪑',
      },
      {
        id: 'playground',
        label: 'ציוד לגן שעשועים',
        name: 'playground',
        icon: '🎠',
      },
    ],
  },
  {
    id: 'maintenance',
    label: 'תחזוקה ותשתיות',
    name: 'maintenance',
    icon: '🔧',
    subTypes: [
      {
        id: 'electrical',
        label: 'תיקונים חשמליים',
        name: 'electrical',
        icon: '⚡',
      },
      {
        id: 'plumbing',
        label: 'תיקונים אינסטלציה',
        name: 'plumbing',
        icon: '🚰',
      },
      {
        id: 'construction',
        label: 'עבודות בנייה',
        name: 'construction',
        icon: '🏗️',
      },
      { id: 'cleaning', label: 'ניקוי ותחזוקה', name: 'cleaning', icon: '🧹' },
    ],
  },
  {
    id: 'operations-support',
    label: 'סיוע לחמ"ל/עמותה',
    name: 'operations-support',
    icon: '📋',
    subTypes: [
      {
        id: 'administrative',
        label: 'עזרה אדמיניסטרטיבית',
        name: 'administrative',
        icon: '📝',
      },
      {
        id: 'coordination',
        label: 'תיאום וניהול',
        name: 'coordination',
        icon: '📞',
      },
      {
        id: 'logistics-support',
        label: 'תמיכה לוגיסטית',
        name: 'logistics-support',
        icon: '📦',
      },
      {
        id: 'communication',
        label: 'תקשורת ומידע',
        name: 'communication',
        icon: '📢',
      },
    ],
  },
  {
    id: 'reporting',
    label: 'דיווח ומידע',
    name: 'reporting',
    icon: '💬',
    subTypes: [
      {
        id: 'damage-assessment',
        label: 'הערכת נזקים',
        name: 'damage-assessment',
        icon: '📊',
      },
      {
        id: 'status-updates',
        label: 'עדכוני סטטוס',
        name: 'status-updates',
        icon: '📈',
      },
      {
        id: 'resource-tracking',
        label: 'מעקב משאבים',
        name: 'resource-tracking',
        icon: '📋',
      },
      {
        id: 'emergency-alerts',
        label: 'התראות חירום',
        name: 'emergency-alerts',
        icon: '🚨',
      },
    ],
  },
];
