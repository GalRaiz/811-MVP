export interface ICity {
  id: string;
  label: string; // Hebrew name
  name: string; // English name
}

export interface IDistrict {
  id: string;
  label: string; // Hebrew name
  name: string; // English name
  cities: ICity[];
}

export const locationsFormMock: IDistrict[] = [
  {
    id: 'tel-aviv',
    label: 'מחוז תל אביב',
    name: 'tel-aviv',
    cities: [
      {
        id: 'tel-aviv',
        label: 'תל אביב-יפו',
        name: 'tel-aviv-yafo',
      },
      { id: 'ramat-gan', label: 'רמת גן', name: 'ramat-gan' },
      { id: 'givatayim', label: 'גבעתיים', name: 'givatayim' },
      { id: 'bat-yam', label: 'בת ים', name: 'bat-yam' },
      { id: 'holon', label: 'חולון', name: 'holon' },
    ],
  },
  {
    id: 'jerusalem',
    label: 'מחוז ירושלים',
    name: 'jerusalem',
    cities: [
      { id: 'jerusalem', label: 'ירושלים', name: 'jerusalem' },
      {
        id: 'beit-shemesh',
        label: 'בית שמש',
        name: 'beit-shemesh',
      },
      {
        id: 'maale-adumim',
        label: 'מעלה אדומים',
        name: 'maale-adumim',
      },
    ],
  },
  {
    id: 'north',
    label: 'מחוז הצפון',
    name: 'north',
    cities: [
      { id: 'haifa', label: 'חיפה', name: 'haifa' },
      { id: 'tiberias', label: 'טבריה', name: 'tiberias' },
      { id: 'nahariya', label: 'נהריה', name: 'nahariya' },
      { id: 'safed', label: 'צפת', name: 'safed' },
      { id: 'karmiel', label: 'כרמיאל', name: 'karmiel' },
    ],
  },
  {
    id: 'south',
    label: 'מחוז הדרום',
    name: 'south',
    cities: [
      { id: 'beer-sheva', label: 'באר שבע', name: 'beer-sheva' },
      { id: 'ashdod', label: 'אשדוד', name: 'ashdod' },
      { id: 'ashkelon', label: 'אשקלון', name: 'ashkelon' },
      { id: 'eilat', label: 'אילת', name: 'eilat' },
      { id: 'dimona', label: 'דימונה', name: 'dimona' },
    ],
  },
  {
    id: 'center',
    label: 'מחוז המרכז',
    name: 'center',
    cities: [
      {
        id: 'petah-tikva',
        label: 'פתח תקווה',
        name: 'petah-tikva',
      },
      { id: 'rehovot', label: 'רחובות', name: 'rehovot' },
      {
        id: 'rishon-lezion',
        label: 'ראשון לציון',
        name: 'rishon-lezion',
      },
      { id: 'lod', label: 'לוד', name: 'lod' },
      { id: 'ramla', label: 'רמלה', name: 'ramla' },
    ],
  },
];
