import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useGeolocation } from '@vueuse/core';
import {
  getReversedLocation,
  getAuPublicHolidays,
  getIsTodayAuHoliday,
} from '@/api';
import { getAllPublicHolidays } from '@/utils';

export function useHolidayInfo() {
  const { coords, error, isSupported } = useGeolocation();

  const isValidCoords = computed(() => {
    const latitude = coords.value.latitude;
    const longitude = coords.value.longitude;
    return (
      isSupported &&
      typeof latitude === 'number' &&
      typeof longitude === 'number' &&
      isFinite(latitude) &&
      isFinite(longitude)
    );
  });

  const { data: userLocation, isLoading: isLoadingUserLocation } = useQuery({
    queryKey: ['userLocation', coords, isValidCoords],
    queryFn: () =>
      getReversedLocation(coords.value.latitude, coords.value.longitude),
    enabled: isValidCoords,
  });

  const { data: allPublicHolidays, isLoading: isLoadingPublicHolidays } =
    useQuery({
      queryKey: ['allPublicHolidays'],
      queryFn: () => {
        const currentYear = new Date().getFullYear();
        return getAuPublicHolidays(currentYear);
      },
    });

  const allHolidays = computed(() => {
    if (allPublicHolidays.value && userLocation.value?.stateCode)
      return getAllPublicHolidays(
        allPublicHolidays.value,
        userLocation.value?.stateCode
      );
    return [];
  });

  const { data: todaysHoliday, isLoading: isLoadingTodayHoliday } = useQuery({
    queryKey: ['isTodayAuHoliday'],
    queryFn: () => getIsTodayAuHoliday(userLocation.value?.stateCode),
    enabled: Boolean(userLocation.value?.stateCode),
  });

  const geoError = computed(() => error.value || !isSupported.value);

  const isLoading = computed(
    () =>
      isLoadingUserLocation.value ||
      isLoadingPublicHolidays.value ||
      isLoadingTodayHoliday.value ||
      !isValidCoords.value
  );

  return {
    geoError,
    isLoading,
    userLocation,
    todaysHoliday,
    allHolidays,
  };
}
