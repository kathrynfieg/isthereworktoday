import axios from 'axios';
import { Location, Holiday, County, State, Territory } from '@/models';

const locationIqApi = import.meta.env.VITE_LOCATIONIQ_API;
const nagerDateApi = import.meta.env.VITE_NAGER_DATE_API;

export const getReversedLocation = async (lat: number, lon: number) => {
  const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

  const endpoint = `${locationIqApi}?key=${apiKey}&lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await axios.get<Location>(endpoint);
    const address = response.data.address;

    return {
      ...address,
      stateCode: getNagerDateCounty(address.territory ?? address.state),
    };
  } catch (e) {
    throw e;
  }
};

export const getAuPublicHolidays = async (year: number) => {
  const endpoint = `${nagerDateApi}/PublicHolidays/${year}/au`;

  try {
    const response = await axios.get<Holiday[]>(endpoint);

    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getIsTodayAuHoliday = async (state?: County) => {
  if (!state) return null;

  const endpoint = `${nagerDateApi}/IsTodayPublicHoliday/au?countyCode=${state}&offset=0`;

  /**
   * response
   * 200 = Today is a public holiday. response.data is NagerDateAUCounty
   * 204 = Today is not a public holiday. response.data is empty string ''
   */

  try {
    const response = await axios.get<Holiday>(endpoint);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export function getNagerDateCounty(
  stateOrTerritory?: string
): County | undefined {
  switch (stateOrTerritory) {
    case State.SouthAustralia:
      return County.SouthAustralia;
    case State.NorthernTerritory:
      return County.NorthernTerritory;
    case State.Queensland:
      return County.Queensland;
    case State.Tasmania:
      return County.Tasmania;
    case State.NewSouthWales:
      return County.NewSouthWales;
    case State.Victoria:
      return County.Victoria;
    case State.WesternAustralia:
      return County.WesternAustralia;
    case Territory.AustralianCapitalTerritory:
      return County.AustralianCapitalTerritory;
    default:
      return undefined;
  }
}
