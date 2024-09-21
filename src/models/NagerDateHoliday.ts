export interface NagerDateHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean; // deprecated?
  global: boolean;
  counties?: string[] | null; // note: if counties	=== null, its a holiday for all of australia
  launchYear: number;
  types: NagerDateHolidayType[];
}

export enum NagerDateHolidayType {
  Public = 'Public',
  Bank = 'Bank',
  School = 'School',
  Authorities = 'Authorities',
  Optional = 'Optional',
  Observance = 'Observance',
}

export enum NagerDateAUCountryCode {
  Australia = 'AU',
}

export enum NagerDateAUCounty {
  SouthAustralia = 'AU-SA',
  NorthernTerritory = 'AU-NT',
  Queensland = 'AU-QLD',
  Tasmania = 'AU-TAS',
  AustralianCapitalTerritory = 'AU-ACT',
  NewSouthWales = 'AU-NSW',
  Victoria = 'AU-VIC',
  WesternAustralia = 'AU-WA',
}
