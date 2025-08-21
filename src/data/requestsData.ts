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
      requestType: 'transportation',
      requestSubType: ['medical-transport'],
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
      requestType: 'personal-equipment',
      requestSubType: ['clothing'],
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
      requestType: 'volunteers',
      requestSubType: ['social-volunteers'],
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
      requestType: 'food',
      requestSubType: ['food-packages'],
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
      requestType: 'education-equipment',
      requestSubType: ['computers'],
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
      requestType: 'housing',
      requestSubType: ['temporary-housing'],
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
      requestType: 'mental-health',
      requestSubType: ['counseling'],
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
      requestType: 'maintenance',
      requestSubType: ['electrical'],
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
  {
    id: 11,
    requesterDetails: {
      requesterName: 'משפחה מירושלים',
      phone: '050-0000010',
      district: 'ירושלים',
      city: 'ירושלים',
      street: 'רחוב יפו',
    },
    requestDetails: {
      requestName: 'סיוע במוצרי היגיינה למשפחה עם ילדים',
      requestType: 'personal-equipment',
      requestSubType: ['hygiene'],
      requestDescription:
        'משפחה עם שלושה ילדים קטנים זקוקה לחיתולים, מגבונים ומוצרי היגיינה בסיסיים',
      needTransportation: true,
      needVolunteers: false,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: 1755701331909,
      updatedAt: 1755701331909,
    },
  },
  {
    id: 12,
    requesterDetails: {
      requesterName: 'סטודנטית מתל אביב',
      phone: '050-0000011',
      district: 'תל אביב',
      city: 'תל אביב',
      street: 'רחוב המלך ג׳ורג׳',
    },
    requestDetails: {
      requestName: 'חיפוש מתנדבים לליווי ילדים ללימודים',
      requestType: 'volunteers',
      requestSubType: ['social-volunteers'],
      requestDescription:
        'סטודנטית מארגנת קבוצת מתנדבים שתלווה ילדים בדרכם לבית הספר במרכז העיר',
      needTransportation: false,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'in-progress',
      createdAt: 1755701331910,
      updatedAt: 1755701331910,
    },
  },
  {
    id: 13,
    requesterDetails: {
      requesterName: 'עמותה בחדרה',
      phone: '050-0000012',
      district: 'צפון',
      city: 'חדרה',
      street: 'רחוב הנשיא',
    },
    requestDetails: {
      requestName: 'איסוף ספרים לספריה קהילתית',
      requestType: 'education-equipment',
      requestSubType: ['books'],
      requestDescription:
        'עמותה מקומית בחדרה מבקשת תרומת ספרים וחומרי לימוד להקמת ספריה קהילתית',
      needTransportation: false,
      needVolunteers: false,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'completed',
      createdAt: 1755701331911,
      updatedAt: 1755701331911,
    },
  },
  {
    id: 14,
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
    id: 15,
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
    id: 16,
    requesterDetails: {
      requesterName: 'קשישה מרמת גן',
      phone: '050-0000002',
      district: 'מרכז',
      city: 'רמת גן',
      street: 'רחוב ביאליק',
    },
    requestDetails: {
      requestName: 'ליווי קשישה לטיפול רפואי',
      requestType: 'transportation',
      requestSubType: ['medical-transport'],
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
    id: 17,
    requesterDetails: {
      requesterName: 'מרכז לנוער בסיכון ביפו',
      phone: '050-0000003',
      district: 'תל אביב',
      city: 'יפו',
      street: 'רחוב שדרות ירושלים',
    },
    requestDetails: {
      requestName: 'תרומת בגדים לנוער בסיכון',
      requestType: 'personal-equipment',
      requestSubType: ['clothing'],
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
    id: 18,
    requesterDetails: {
      requesterName: 'אמא חד הורית מהוד השרון',
      phone: '050-0000004',
      district: 'מרכז',
      city: 'הוד השרון',
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'שמירה על ילדים בזמן שהאם בעבודה',
      requestType: 'volunteers',
      requestSubType: ['social-volunteers'],
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
    id: 19,
    requesterDetails: {
      requesterName: 'התארגנות מקומית ברעננה',
      phone: '050-0000005',
      district: 'מרכז',
      city: 'רעננה',
      street: 'רחוב אחוזה',
    },
    requestDetails: {
      requestName: 'חבילות מזון לחיילים בודדים',
      requestType: 'food',
      requestSubType: ['food-packages'],
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
    id: 20,
    requesterDetails: {
      requesterName: 'בית ספר בבת ים',
      phone: '050-0000006',
      district: 'מרכז',
      city: 'בת ים',
      street: 'רחוב העצמאות',
    },
    requestDetails: {
      requestName: 'תרומת מחשבים ללמידה מרחוק',
      requestType: 'education-equipment',
      requestSubType: ['computers'],
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
    id: 21,
    requesterDetails: {
      requesterName: 'משפחה מנתניה',
      phone: '050-0000007',
      district: 'מרכז',
      city: 'נתניה',
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'סיוע בדיור זמני למשפחה מפונה',
      requestType: 'housing',
      requestSubType: ['temporary-housing'],
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
    id: 22,
    requesterDetails: {
      requesterName: 'קשיש מאשדוד',
      phone: '050-0000008',
      district: 'דרום',
      city: 'אשדוד',
      street: 'רחוב העצמאות',
    },
    requestDetails: {
      requestName: 'תמיכה נפשית לקשיש במשבר',
      requestType: 'mental-health',
      requestSubType: ['counseling'],
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
    id: 23,
    requesterDetails: {
      requesterName: 'מרכז קהילתי בחיפה',
      phone: '050-0000009',
      district: 'חיפה',
      city: 'חיפה',
      street: 'רחוב בלפור',
    },
    requestDetails: {
      requestName: 'תיקון מערכת החשמל במרכז הקהילתי',
      requestType: 'maintenance',
      requestSubType: ['electrical'],
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
  {
    id: 24,
    requesterDetails: {
      requesterName: 'משפחה מירושלים',
      phone: '050-0000010',
      district: 'ירושלים',
      city: 'ירושלים',
      street: 'רחוב יפו',
    },
    requestDetails: {
      requestName: 'סיוע במוצרי היגיינה למשפחה עם ילדים',
      requestType: 'personal-equipment',
      requestSubType: ['hygiene'],
      requestDescription:
        'משפחה עם שלושה ילדים קטנים זקוקה לחיתולים, מגבונים ומוצרי היגיינה בסיסיים',
      needTransportation: true,
      needVolunteers: false,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'pending',
      createdAt: 1755701331909,
      updatedAt: 1755701331909,
    },
  },
  {
    id: 25,
    requesterDetails: {
      requesterName: 'סטודנטית מתל אביב',
      phone: '050-0000011',
      district: 'תל אביב',
      city: 'תל אביב',
      street: 'רחוב המלך ג׳ורג׳',
    },
    requestDetails: {
      requestName: 'חיפוש מתנדבים לליווי ילדים ללימודים',
      requestType: 'volunteers',
      requestSubType: ['social-volunteers'],
      requestDescription:
        'סטודנטית מארגנת קבוצת מתנדבים שתלווה ילדים בדרכם לבית הספר במרכז העיר',
      needTransportation: false,
      needVolunteers: true,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'in-progress',
      createdAt: 1755701331910,
      updatedAt: 1755701331910,
    },
  },
  {
    id: 26,
    requesterDetails: {
      requesterName: 'עמותה בחדרה',
      phone: '050-0000012',
      district: 'צפון',
      city: 'חדרה',
      street: 'רחוב הנשיא',
    },
    requestDetails: {
      requestName: 'איסוף ספרים לספריה קהילתית',
      requestType: 'education-equipment',
      requestSubType: ['books'],
      requestDescription:
        'עמותה מקומית בחדרה מבקשת תרומת ספרים וחומרי לימוד להקמת ספריה קהילתית',
      needTransportation: false,
      needVolunteers: false,
      attachment: '',
      requestImage: '',
    },
    requestStatus: {
      requestStatus: 'completed',
      createdAt: 1755701331911,
      updatedAt: 1755701331911,
    },
  },
];
