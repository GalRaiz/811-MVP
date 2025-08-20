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
      requestType: 'מזון',
      requestSubType: ['מנות חמות'],
      requestDescription:
        'משפחה מרחובות שביתם נפגע, עם 2 ילדים קטנים בדירה זמנית בת״א, מטבח קטן ואין להם זמן לבשל',
      needTransportation: false,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now(),
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
      requestType: 'לוגיסטיקה',
      requestSubType: ['הובלה'],
      requestDescription:
        'אישה מבוגרת שעוברת מדירתה בדימונה לדירה שכורה בבאר שבע, צריכה עזרה בהובלת רהיטים בסיסיים',
      needTransportation: true,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'in-progress',
      createdAt: Date.now(),
      updatedAt: Date.now(),
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
      requestType: 'בריאות',
      requestSubType: ['ליווי'],
      requestDescription:
        'קשישה בת 84 מרמת גן, זקוקה למתנדב שילווה אותה לבדיקות בבית החולים איכילוב',
      needTransportation: true,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now(),
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
      requestType: 'ציוד',
      requestSubType: ['ביגוד'],
      requestDescription:
        'מרכז לנוער בסיכון ביפו מבקש תרומת בגדים במצב טוב – בעיקר חורף: מעילים, סוודרים, נעליים',
      needTransportation: false,
      needVolunteers: false,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now(),
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
      requestType: 'תמיכה משפחתית',
      requestSubType: ['בייביסיטר'],
      requestDescription:
        'אמא חד הורית מהוד השרון מבקשת עזרה בשמירה על שני ילדים בגילאי 4 ו-7 בין השעות 15:00–18:00',
      needTransportation: false,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now(),
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
      requestType: 'מזון',
      requestSubType: ['חבילות'],
      requestDescription:
        'התארגנות מקומית ברעננה לאיסוף מוצרי מזון יבשים לחיילים בודדים המתגוררים באזור המרכז',
      needTransportation: false,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now(),
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
      requestType: 'ציוד',
      requestSubType: ['מחשבים'],
      requestDescription:
        'בית ספר בבת ים מבקש תרומת מחשבים ניידים לילדים שאין להם גישה למחשב ללמידה מרחוק',
      needTransportation: false,
      needVolunteers: false,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'completed',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  },
];
