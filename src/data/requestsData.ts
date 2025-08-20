import { IRequest } from '../store/types';

export const assistanceRequests: IRequest[] = [
  {
    id: 1,
    requesterDetails: {
      requesterName: 'משפחה מרחובות',
      phone: '050-0000000',
      district: 'תל אביב',
      city: 'תל אביב',
      street: 'רחוב לא ידוע',
    },
    requestDetails: {
      requestName: 'סיוע באוכל למשפחות מפונים בדירה זמנית בתל אביב',
      requestType: 'food', // מזון
      requestSubType: ['hot-meals'], // מנות חמות
      requestDescription:
        'משפחה מרחובות שביתם נפגע, עם 2 ילדים קטנים בדירה זמנית בת״א, מטבח קטן ואין להם זמן לבשל',
      needTransportation: false,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: 1755701331908,
      updatedAt: 1755701331908,
      assignedTo: ['חמ״ל צפון'],
    },
  },
  {
    id: 2,
    requesterDetails: {
      requesterName: 'אישה מבוגרת מדימונה',
      phone: '050-0000001',
      district: 'דרום',
      city: 'באר שבע',
      street: 'רחוב ראשי',
    },
    requestDetails: {
      requestName: 'עזרה בהובלת ציוד לדירה חדשה',
      requestType: 'logistics', // לוגיסטיקה ושינוע
      requestSubType: ['equipment-move'], // העברת ציוד
      requestDescription:
        'אישה מבוגרת שעוברת מדירתה בדימונה לדירה שכורה בבאר שבע, צריכה עזרה בהובלת רהיטים בסיסיים',
      needTransportation: true,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'in-progress',
      createdAt: 1755701331908,
      updatedAt: 1755701331908,
    },
  },
  {
    id: 3,
    requesterDetails: {
      requesterName: 'קשישה מרמת גן',
      phone: '050-0000002',
      district: 'מרכז',
      city: 'רמת גן',
      street: 'רחוב ביאליק',
    },
    requestDetails: {
      requestName: 'ליווי קשישה לטיפול רפואי',
      requestType: 'transportation', // הסעות ותחבורה
      requestSubType: ['medical-transport'], // הסעות רפואיות
      requestDescription:
        'קשישה בת 84 מרמת גן, זקוקה למתנדב שילווה אותה לבדיקות בבית החולים איכילוב',
      needTransportation: true,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: 1755701331908,
      updatedAt: 1755701331908,
    },
  },
  {
    id: 4,
    requesterDetails: {
      requesterName: 'מרכז לנוער בסיכון ביפו',
      phone: '050-0000003',
      district: 'תל אביב',
      city: 'יפו',
      street: 'רחוב שדרות ירושלים',
    },
    requestDetails: {
      requestName: 'תרומת בגדים לנוער בסיכון',
      requestType: 'personal-equipment', // ציוד אישי
      requestSubType: ['clothing'], // ביגוד
      requestDescription:
        'מרכז לנוער בסיכון ביפו מבקש תרומת בגדים במצב טוב – בעיקר חורף: מעילים, סוודרים, נעליים',
      needTransportation: false,
      needVolunteers: false,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: 1755701331908,
      updatedAt: 1755701331908,
    },
  },
  {
    id: 5,
    requesterDetails: {
      requesterName: 'אמא חד הורית מהוד השרון',
      phone: '050-0000004',
      district: 'מרכז',
      city: 'הוד השרון',
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'שמירה על ילדים בזמן שהאם בעבודה',
      requestType: 'volunteers', // מתנדבים
      requestSubType: ['social-volunteers'], // מתנדבים חברתיים
      requestDescription:
        'אמא חד הורית מהוד השרון מבקשת עזרה בשמירה על שני ילדים בגילאי 4 ו-7 בין השעות 15:00–18:00',
      needTransportation: false,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: 1755701331908,
      updatedAt: 1755701331908,
    },
  },
  {
    id: 6,
    requesterDetails: {
      requesterName: 'התארגנות מקומית ברעננה',
      phone: '050-0000005',
      district: 'מרכז',
      city: 'רעננה',
      street: 'רחוב אחוזה',
    },
    requestDetails: {
      requestName: 'חבילות מזון לחיילים בודדים',
      requestType: 'food', // מזון
      requestSubType: ['food-packages'], // חבילות מזון
      requestDescription:
        'התארגנות מקומית ברעננה לאיסוף מוצרי מזון יבשים לחיילים בודדים המתגוררים באזור המרכז',
      needTransportation: false,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: 1755701331908,
      updatedAt: 1755701331908,
    },
  },
  {
    id: 7,
    requesterDetails: {
      requesterName: 'בית ספר בבת ים',
      phone: '050-0000006',
      district: 'מרכז',
      city: 'בת ים',
      street: 'רחוב העצמאות',
    },
    requestDetails: {
      requestName: 'תרומת מחשבים ללמידה מרחוק',
      requestType: 'education-equipment', // ציוד למוסדות חינוך וקהילה
      requestSubType: ['computers'], // מחשבים וטכנולוגיה
      requestDescription:
        'בית ספר בבת ים מבקש תרומת מחשבים ניידים לילדים שאין להם גישה למחשב ללמידה מרחוק',
      needTransportation: false,
      needVolunteers: false,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'completed',
      createdAt: 1755701331908,
      updatedAt: 1755701331908,
    },
  },
  {
    id: 8,
    requesterDetails: {
      requesterName: 'משפחה מנתניה',
      phone: '050-0000007',
      district: 'מרכז',
      city: 'נתניה',
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'סיוע בדיור זמני למשפחה מפונה',
      requestType: 'housing', // דיור ואירוח קהילתי
      requestSubType: ['temporary-housing'], // דיור זמני
      requestDescription:
        'משפחה מנתניה שדירתם נפגעה, זקוקה לדיור זמני למשך שבועיים עד שיתקנו את הדירה',
      needTransportation: false,
      needVolunteers: false,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: 1755701331908,
      updatedAt: 1755701331908,
    },
  },
  {
    id: 9,
    requesterDetails: {
      requesterName: 'קשיש מאשדוד',
      phone: '050-0000008',
      district: 'דרום',
      city: 'אשדוד',
      street: 'רחוב העצמאות',
    },
    requestDetails: {
      requestName: 'תמיכה נפשית לקשיש במשבר',
      requestType: 'mental-health', // בריאות הנפש
      requestSubType: ['counseling'], // ייעוץ פסיכולוגי
      requestDescription:
        'קשיש מאשדוד שחווה אובדן של בן משפחה, זקוק לתמיכה נפשית וייעוץ פסיכולוגי',
      needTransportation: false,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'in-progress',
      createdAt: 1755701331908,
      updatedAt: 1755701331908,
    },
  },
  {
    id: 10,
    requesterDetails: {
      requesterName: 'מרכז קהילתי בחיפה',
      phone: '050-0000009',
      district: 'חיפה',
      city: 'חיפה',
      street: 'רחוב בלפור',
    },
    requestDetails: {
      requestName: 'תיקון מערכת החשמל במרכז הקהילתי',
      requestType: 'maintenance', // תחזוקה ותשתיות
      requestSubType: ['electrical'], // תיקונים חשמליים
      requestDescription:
        'מרכז קהילתי בחיפה עם בעיות במערכת החשמל, זקוק לתיקון דחוף כדי להמשיך לפעול',
      needTransportation: false,
      needVolunteers: false,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: 1755701331908,
      updatedAt: 1755701331908,
    },
  },
];
