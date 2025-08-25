import { IRequest } from '../store/types';
import { assistanceTypes } from './assistanceTypesData';
import { locationsFormMock } from './formsData/locationsFormMock';

// Helper functions to get proper objects from the data
const getAssistanceType = (typeId: string) => {
  const type = assistanceTypes.find(type => type.id === typeId);
  if (!type) return null;
  return {
    id: type.id,
    label: type.label,
    name: type.name,
    icon: type.icon,
  };
};

const getAssistanceSubType = (typeId: string, subTypeId: string) => {
  const type = assistanceTypes.find(type => type.id === typeId);
  const subType = type?.subTypes.find(subType => subType.id === subTypeId);
  if (!subType) return null;
  return {
    id: subType.id,
    label: subType.label,
    name: subType.name,
    icon: subType.icon,
  };
};

const getDistrict = (districtId: string) => {
  const district = locationsFormMock.find(district => district.id === districtId);
  if (!district) return null;
  return {
    id: district.id,
    label: district.label,
    name: district.name,
  };
};

const getCity = (districtId: string, cityId: string) => {
  const district = locationsFormMock.find(district => district.id === districtId);
  const city = district?.cities.find(city => city.id === cityId);
  if (!city) return null;
  return {
    id: city.id,
    label: city.label,
    name: city.name,
  };
};

export const assistanceRequests: IRequest[] = [
  {
    id: 1,
    requesterDetails: {
      requesterName: 'משפחה מרחובות',
      phone: '050-0000000',
      district: getDistrict('tel-aviv')!,
      city: getCity('tel-aviv', 'tel-aviv')!,
      street: 'רחוב לא ידוע',
    },
    requestDetails: {
      requestName: 'סיוע באוכל למשפחות מפונים בדירה זמנית בתל אביב',
      requestType: getAssistanceType('food')!,
      requestSubType: [
        getAssistanceSubType('food', 'hot-meals')!,
        getAssistanceSubType('food', 'baby-food')!,
      ],
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
      district: getDistrict('south')!,
      city: getCity('south', 'beer-sheva')!,
      street: 'רחוב ראשי',
    },
    requestDetails: {
      requestName: 'עזרה בהובלת ציוד לדירה חדשה',
      requestType: getAssistanceType('logistics')!,
      requestSubType: [
        getAssistanceSubType('logistics', 'equipment-move')!,
        getAssistanceSubType('logistics', 'furniture-move')!,
        getAssistanceSubType('logistics', 'packaging')!,
      ],
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
      district: getDistrict('center')!,
      city: getCity('center', 'ramat-gan')!,
      street: 'רחוב ביאליק',
    },
    requestDetails: {
      requestName: 'ליווי קשישה לטיפול רפואי',
      requestType: getAssistanceType('transportation')!,
      requestSubType: [
        getAssistanceSubType('transportation', 'medical-transport')!,
        getAssistanceSubType('transportation', 'public-transport')!,
      ],
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
      district: getDistrict('tel-aviv')!,
      city: getCity('tel-aviv', 'tel-aviv')!, // Using tel-aviv for Yafo
      street: 'רחוב שדרות ירושלים',
    },
    requestDetails: {
      requestName: 'תרומת בגדים לנוער בסיכון',
      requestType: getAssistanceType('personal-equipment')!,
      requestSubType: [
        getAssistanceSubType('personal-equipment', 'clothing')!,
        getAssistanceSubType('personal-equipment', 'hygiene')!,
      ],
      requestDescription:
        'מרכז לנוער בסיכון ביפו מבקש תרומת בגדים במצב טוב – בעיקר חורף: מעילים, סוודרים, נעליים',
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
    id: 5,
    requesterDetails: {
      requesterName: 'אמא חד הורית מהוד השרון',
      phone: '050-0000004',
      district: getDistrict('center')!,
      city: getCity('center', 'petah-tikva')!, // Using petah-tikva as closest match
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'שמירה על ילדים בזמן שהאם בעבודה',
      requestType: getAssistanceType('volunteers')!,
      requestSubType: [
        getAssistanceSubType('volunteers', 'social-volunteers')!,
        getAssistanceSubType('volunteers', 'medical-volunteers')!,
      ],
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
      district: getDistrict('center')!,
      city: getCity('center', 'rehovot')!, // Using rehovot as closest match
      street: 'רחוב אחוזה',
    },
    requestDetails: {
      requestName: 'חבילות מזון לחיילים בודדים',
      requestType: getAssistanceType('food')!,
      requestSubType: [
        getAssistanceSubType('food', 'food-packages')!,
        getAssistanceSubType('food', 'dietary-restrictions')!,
      ],
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
      district: getDistrict('tel-aviv')!,
      city: getCity('tel-aviv', 'bat-yam')!,
      street: 'רחוב העצמאות',
    },
    requestDetails: {
      requestName: 'תרומת מחשבים ללמידה מרחוק',
      requestType: getAssistanceType('education-equipment')!,
      requestSubType: [
        getAssistanceSubType('education-equipment', 'computers')!,
        getAssistanceSubType('education-equipment', 'books')!,
      ],
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
      district: getDistrict('center')!,
      city: getCity('center', 'petah-tikva')!, // Using petah-tikva as closest match
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'סיוע בדיור זמני למשפחה מפונה',
      requestType: getAssistanceType('housing')!,
      requestSubType: [
        getAssistanceSubType('housing', 'temporary-housing')!,
        getAssistanceSubType('housing', 'hotel-accommodation')!,
      ],
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
      requesterName: 'משפחה מאשדוד',
      phone: '050-0000008',
      district: getDistrict('south')!,
      city: getCity('south', 'ashdod')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'סיוע פסיכולוגי למשפחה',
      requestType: getAssistanceType('mental-health')!,
      requestSubType: [
        getAssistanceSubType('mental-health', 'counseling')!,
        getAssistanceSubType('mental-health', 'crisis-support')!,
      ],
      requestDescription:
        'משפחה מאשדוד מבקשת סיוע פסיכולוגי לילדים שנפגעו נפשית מהמצב',
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
    id: 10,
    requesterDetails: {
      requesterName: 'משפחה מחיפה',
      phone: '050-0000009',
      district: getDistrict('north')!,
      city: getCity('north', 'haifa')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'תיקון חשמל בדירה',
      requestType: getAssistanceType('maintenance')!,
      requestSubType: [
        getAssistanceSubType('maintenance', 'electrical')!,
        getAssistanceSubType('maintenance', 'cleaning')!,
      ],
      requestDescription:
        'משפחה מחיפה מבקשת עזרה בתיקון בעיות חשמל בדירתם',
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
    id: 11,
    requesterDetails: {
      requesterName: 'משפחה מירושלים',
      phone: '050-0000010',
      district: getDistrict('jerusalem')!,
      city: getCity('jerusalem', 'jerusalem')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'ציוד אישי למשפחה',
      requestType: getAssistanceType('personal-equipment')!,
      requestSubType: [
        getAssistanceSubType('personal-equipment', 'hygiene')!,
        getAssistanceSubType('personal-equipment', 'medical-supplies')!,
        getAssistanceSubType('personal-equipment', 'electronics')!,
      ],
      requestDescription:
        'משפחה מירושלים מבקשת ציוד אישי ומוצרי היגיינה',
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
    id: 12,
    requesterDetails: {
      requesterName: 'משפחה מתל אביב',
      phone: '050-0000011',
      district: getDistrict('tel-aviv')!,
      city: getCity('tel-aviv', 'tel-aviv')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'מתנדבים לעזרה',
      requestType: getAssistanceType('volunteers')!,
      requestSubType: [getAssistanceSubType('volunteers', 'social-volunteers')!],
      requestDescription:
        'משפחה מתל אביב מבקשת מתנדבים לעזרה כללית',
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
    id: 13,
    requesterDetails: {
      requesterName: 'משפחה מהצפון',
      phone: '050-0000012',
      district: getDistrict('north')!,
      city: getCity('north', 'tiberias')!, // Using tiberias as closest match
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'ציוד לימודי לילדים',
      requestType: getAssistanceType('education-equipment')!,
      requestSubType: [getAssistanceSubType('education-equipment', 'books')!],
      requestDescription:
        'משפחה מהצפון מבקשת ציוד לימודי וספרים לילדים',
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
    id: 14,
    requesterDetails: {
      requesterName: 'משפחה מתל אביב',
      phone: '050-0000013',
      district: getDistrict('tel-aviv')!,
      city: getCity('tel-aviv', 'tel-aviv')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'מזון למשפחה',
      requestType: getAssistanceType('food')!,
      requestSubType: [getAssistanceSubType('food', 'hot-meals')!],
      requestDescription:
        'משפחה מתל אביב מבקשת מזון חם',
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
    id: 15,
    requesterDetails: {
      requesterName: 'משפחה מהדרום',
      phone: '050-0000014',
      district: getDistrict('south')!,
      city: getCity('south', 'beer-sheva')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'לוגיסטיקה ושינוע',
      requestType: getAssistanceType('logistics')!,
      requestSubType: [getAssistanceSubType('logistics', 'equipment-move')!],
      requestDescription:
        'משפחה מהדרום מבקשת עזרה בהובלת ציוד',
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
    id: 16,
    requesterDetails: {
      requesterName: 'משפחה מהמרכז',
      phone: '050-0000015',
      district: getDistrict('center')!,
      city: getCity('center', 'ramat-gan')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'שינוע רפואי',
      requestType: getAssistanceType('transportation')!,
      requestSubType: [getAssistanceSubType('transportation', 'medical-transport')!],
      requestDescription:
        'משפחה מהמרכז מבקשת עזרה בשינוע רפואי',
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
      requesterName: 'משפחה מתל אביב',
      phone: '050-0000016',
      district: getDistrict('tel-aviv')!,
      city: getCity('tel-aviv', 'tel-aviv')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'ציוד אישי',
      requestType: getAssistanceType('personal-equipment')!,
      requestSubType: [getAssistanceSubType('personal-equipment', 'clothing')!],
      requestDescription:
        'משפחה מתל אביב מבקשת ציוד אישי ובגדים',
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
      requesterName: 'משפחה מהמרכז',
      phone: '050-0000017',
      district: getDistrict('center')!,
      city: getCity('center', 'petah-tikva')!, // Using petah-tikva as closest match
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'מתנדבים לעזרה',
      requestType: getAssistanceType('volunteers')!,
      requestSubType: [getAssistanceSubType('volunteers', 'social-volunteers')!],
      requestDescription:
        'משפחה מהמרכז מבקשת מתנדבים לעזרה כללית',
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
      requesterName: 'משפחה מהמרכז',
      phone: '050-0000018',
      district: getDistrict('center')!,
      city: getCity('center', 'rehovot')!, // Using rehovot as closest match
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'מזון למשפחה',
      requestType: getAssistanceType('food')!,
      requestSubType: [getAssistanceSubType('food', 'food-packages')!],
      requestDescription:
        'משפחה מהמרכז מבקשת חבילות מזון',
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
    id: 20,
    requesterDetails: {
      requesterName: 'משפחה מהמרכז',
      phone: '050-0000019',
      district: getDistrict('tel-aviv')!,
      city: getCity('tel-aviv', 'bat-yam')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'ציוד לימודי',
      requestType: getAssistanceType('education-equipment')!,
      requestSubType: [getAssistanceSubType('education-equipment', 'computers')!],
      requestDescription:
        'משפחה מהמרכז מבקשת ציוד לימודי ומחשבים',
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
    id: 21,
    requesterDetails: {
      requesterName: 'משפחה מהמרכז',
      phone: '050-0000020',
      district: getDistrict('center')!,
      city: getCity('center', 'petah-tikva')!, // Using petah-tikva as closest match
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'דיור זמני',
      requestType: getAssistanceType('housing')!,
      requestSubType: [getAssistanceSubType('housing', 'temporary-housing')!],
      requestDescription:
        'משפחה מהמרכז מבקשת דיור זמני',
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
      requesterName: 'משפחה מהדרום',
      phone: '050-0000021',
      district: getDistrict('south')!,
      city: getCity('south', 'ashdod')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'ייעוץ פסיכולוגי',
      requestType: getAssistanceType('mental-health')!,
      requestSubType: [getAssistanceSubType('mental-health', 'counseling')!],
      requestDescription:
        'משפחה מהדרום מבקשת ייעוץ פסיכולוגי',
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
    id: 23,
    requesterDetails: {
      requesterName: 'משפחה מהצפון',
      phone: '050-0000022',
      district: getDistrict('north')!,
      city: getCity('north', 'haifa')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'תיקון חשמל',
      requestType: getAssistanceType('maintenance')!,
      requestSubType: [getAssistanceSubType('maintenance', 'electrical')!],
      requestDescription:
        'משפחה מהצפון מבקשת תיקון חשמל',
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
    id: 24,
    requesterDetails: {
      requesterName: 'משפחה מירושלים',
      phone: '050-0000023',
      district: getDistrict('jerusalem')!,
      city: getCity('jerusalem', 'jerusalem')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'ציוד אישי',
      requestType: getAssistanceType('personal-equipment')!,
      requestSubType: [getAssistanceSubType('personal-equipment', 'hygiene')!],
      requestDescription:
        'משפחה מירושלים מבקשת ציוד אישי',
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
    id: 25,
    requesterDetails: {
      requesterName: 'משפחה מתל אביב',
      phone: '050-0000024',
      district: getDistrict('tel-aviv')!,
      city: getCity('tel-aviv', 'tel-aviv')!,
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'מתנדבים לעזרה',
      requestType: getAssistanceType('volunteers')!,
      requestSubType: [getAssistanceSubType('volunteers', 'social-volunteers')!],
      requestDescription:
        'משפחה מתל אביב מבקשת מתנדבים',
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
    id: 26,
    requesterDetails: {
      requesterName: 'משפחה מהצפון',
      phone: '050-0000025',
      district: getDistrict('north')!,
      city: getCity('north', 'tiberias')!, // Using tiberias as closest match
      street: 'רחוב הרצל',
    },
    requestDetails: {
      requestName: 'ציוד לימודי',
      requestType: getAssistanceType('education-equipment')!,
      requestSubType: [getAssistanceSubType('education-equipment', 'books')!],
      requestDescription:
        'משפחה מהצפון מבקשת ציוד לימודי',
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
