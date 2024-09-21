export interface LocationIQLocation {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: LocationIQAddress;
  boundingbox?: string[];
}

export interface LocationIQAddress {
  government?: string;
  house_number?: string;
  road?: string;
  quarter?: string;
  suburb?: string;
  city?: string;
  state_district?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
}

export enum LocationIQAuCountryCode {
  Australia = 'au',
}

export enum LocationIQAuCountry {
  Australia = 'Australia',
}

export enum LocationIQAuState {
  SouthAustralia = 'South Australia',
  NorthernTerritory = 'Northern Territory',
  Queensland = 'Queensland',
  Tasmania = 'Tasmania',
  NewSouthWales = 'New South Wales',
  Victoria = 'Victoria',
  WesternAustralia = 'Western Australia',
}

export enum LocationIQAuTerritory {
  AustralianCapitalTerritory = 'Australian Capital Territory',
}
