export interface Location {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: Address;
  boundingbox?: string[];
}

export interface Address {
  government?: string;
  house_number?: string;
  road?: string;
  quarter?: string;
  suburb?: string;
  city?: string;
  state_district?: string;
  territory?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
}

export enum CountryCode {
  Australia = 'au',
}

export enum Country {
  Australia = 'Australia',
}

export enum State {
  SouthAustralia = 'South Australia',
  NorthernTerritory = 'Northern Territory',
  Queensland = 'Queensland',
  Tasmania = 'Tasmania',
  NewSouthWales = 'New South Wales',
  Victoria = 'Victoria',
  WesternAustralia = 'Western Australia',
}

export enum Territory {
  AustralianCapitalTerritory = 'Australian Capital Territory',
}
