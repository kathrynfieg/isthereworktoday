import axios from 'axios';
import {
  LocationIQLocation,
  NagerDateAUCounty,
  NagerDateHoliday,
} from '@/models';

export const getReversedLocation = async (lat: number, lon: number) => {
  const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

  const endpoint = `${
    import.meta.env.VITE_LOCATIONIQ_API
  }?key=${apiKey}&lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await axios.get<LocationIQLocation>(endpoint);

    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getAuPublicHolidays = async (year: number) => {
  const endpoint = `${
    import.meta.env.VITE_NAGER_DATE_API
  }/PublicHolidays/${year}/au`;

  try {
    const response = await axios.get<NagerDateHoliday[]>(endpoint);

    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getIsTodayAuHoliday = async (state: NagerDateAUCounty) => {
  const endpoint = `${
    import.meta.env.VITE_NAGER_DATE_API
  }/IsTodayPublicHoliday/au?countyCode=${state}&offset=0`;

  /**
   * response
   * 200 = Today is a public holiday. response.data is NagerDateAUCounty
   * 204 = Today is not a public holiday. response.data is empty string ''
   */

  try {
    const response = await axios.get<NagerDateHoliday>(endpoint);
    return response.data;
  } catch (e) {
    throw e;
  }
};
