export interface AssistanceSubType {
  id: string;
  label: string;
  icon?: string;
}

export interface AssistanceType {
  id: string;
  label: string;
  icon: string;
  subTypes: AssistanceSubType[];
}

export const assistanceTypes: AssistanceType[] = [
  {
    id: 'food',
    label: 'מזון',
    icon: '🍽️',
    subTypes: [
      { id: 'hot-meals', label: 'מנות חמות', icon: '🍲' },
      { id: 'food-packages', label: 'חבילות מזון', icon: '📦' },
      { id: 'baby-food', label: 'מזון לתינוקות', icon: '🍼' },
      {
        id: 'dietary-restrictions',
        label: 'מזון מיוחד (צליאק, סוכרת)',
        icon: '🥗',
      },
    ],
  },
  {
    id: 'transportation',
    label: 'הסעות ותחבורה',
    icon: '🚗',
    subTypes: [
      { id: 'medical-transport', label: 'הסעות רפואיות', icon: '🚑' },
      { id: 'public-transport', label: 'כרטיסי תחבורה ציבורית', icon: '🚌' },
      { id: 'evacuation', label: 'פינוי ופיזור', icon: '🚁' },
      { id: 'delivery', label: 'משלוחים והובלות', icon: '🚚' },
    ],
  },
  {
    id: 'logistics',
    label: 'לוגיסטיקה ושינוע',
    icon: '🚛',
    subTypes: [
      { id: 'equipment-move', label: 'העברת ציוד', icon: '📦' },
      { id: 'furniture-move', label: 'העברת רהיטים', icon: '🪑' },
      { id: 'storage', label: 'אחסון זמני', icon: '🏭' },
      { id: 'packaging', label: 'אריזה ומיון', icon: '📋' },
    ],
  },
  {
    id: 'personal-equipment',
    label: 'ציוד אישי',
    icon: '🛍️',
    subTypes: [
      { id: 'clothing', label: 'ביגוד', icon: '👕' },
      { id: 'hygiene', label: 'מוצרי היגיינה', icon: '🧴' },
      { id: 'medical-supplies', label: 'ציוד רפואי', icon: '💊' },
      { id: 'electronics', label: 'מכשירים אלקטרוניים', icon: '📱' },
    ],
  },
  {
    id: 'housing',
    label: 'דיור ואירוח קהילתי',
    icon: '🏢',
    subTypes: [
      { id: 'temporary-housing', label: 'דיור זמני', icon: '🏠' },
      { id: 'hotel-accommodation', label: 'אירוח במלון', icon: '🏨' },
      { id: 'community-shelter', label: 'מקלט קהילתי', icon: '🏛️' },
      { id: 'rental-assistance', label: 'סיוע בשכירות', icon: '🏘️' },
    ],
  },
  {
    id: 'shelters',
    label: 'מקלטים ומרחבים מוגנים',
    icon: '🏠',
    subTypes: [
      { id: 'bomb-shelter', label: 'מקלט מפני טילים', icon: '🛡️' },
      { id: 'safe-room', label: 'חדר מוגן', icon: '🚪' },
      { id: 'underground-shelter', label: 'מקלט תת קרקעי', icon: '⛰️' },
      { id: 'community-center', label: 'מרכז קהילתי מוגן', icon: '🏛️' },
    ],
  },
  {
    id: 'volunteers',
    label: 'מתנדבים',
    icon: '❤️',
    subTypes: [
      { id: 'medical-volunteers', label: 'מתנדבים רפואיים', icon: '👨‍⚕️' },
      { id: 'logistics-volunteers', label: 'מתנדבים לוגיסטיים', icon: '📦' },
      { id: 'social-volunteers', label: 'מתנדבים חברתיים', icon: '🤝' },
      { id: 'technical-volunteers', label: 'מתנדבים טכניים', icon: '🔧' },
    ],
  },
  {
    id: 'mental-health',
    label: 'בריאות הנפש',
    icon: '🧠',
    subTypes: [
      { id: 'counseling', label: 'ייעוץ פסיכולוגי', icon: '💭' },
      { id: 'crisis-support', label: 'תמיכה במשבר', icon: '🆘' },
      { id: 'group-therapy', label: 'טיפול קבוצתי', icon: '👥' },
      { id: 'emergency-psychiatry', label: 'פסיכיאטריה דחופה', icon: '🏥' },
    ],
  },
  {
    id: 'education-equipment',
    label: 'ציוד למוסדות חינוך וקהילה',
    icon: '🏫',
    subTypes: [
      { id: 'computers', label: 'מחשבים וטכנולוגיה', icon: '💻' },
      { id: 'books', label: 'ספרים וחומרי לימוד', icon: '📚' },
      { id: 'furniture', label: 'רהיטים לכיתות', icon: '🪑' },
      { id: 'playground', label: 'ציוד לגן שעשועים', icon: '🎠' },
    ],
  },
  {
    id: 'maintenance',
    label: 'תחזוקה ותשתיות',
    icon: '🔧',
    subTypes: [
      { id: 'electrical', label: 'תיקונים חשמליים', icon: '⚡' },
      { id: 'plumbing', label: 'תיקונים אינסטלציה', icon: '🚰' },
      { id: 'construction', label: 'עבודות בנייה', icon: '🏗️' },
      { id: 'cleaning', label: 'ניקוי ותחזוקה', icon: '🧹' },
    ],
  },
  {
    id: 'operations-support',
    label: 'סיוע לחמ"ל/עמותה',
    icon: '📋',
    subTypes: [
      { id: 'administrative', label: 'עזרה אדמיניסטרטיבית', icon: '📝' },
      { id: 'coordination', label: 'תיאום וניהול', icon: '📞' },
      { id: 'logistics-support', label: 'תמיכה לוגיסטית', icon: '📦' },
      { id: 'communication', label: 'תקשורת ומידע', icon: '📢' },
    ],
  },
  {
    id: 'reporting',
    label: 'דיווח ומידע',
    icon: '💬',
    subTypes: [
      { id: 'damage-assessment', label: 'הערכת נזקים', icon: '📊' },
      { id: 'status-updates', label: 'עדכוני סטטוס', icon: '📈' },
      { id: 'resource-tracking', label: 'מעקב משאבים', icon: '📋' },
      { id: 'emergency-alerts', label: 'התראות חירום', icon: '🚨' },
    ],
  },
];
