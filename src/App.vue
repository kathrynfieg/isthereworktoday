<script setup lang="ts">
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useGeolocation } from '@vueuse/core';
import {
  getReversedLocation,
  getAuPublicHolidays,
  getIsTodayAuHoliday,
} from '@/api';

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

const { data: isTodayAuHoliday, isLoading: isLoadingTodayHoliday } = useQuery({
  queryKey: ['isTodayAuHoliday'],
  queryFn: () => getIsTodayAuHoliday(userLocation.value?.stateCode),
});
</script>

<template>
  <div>isLoadingUserLocation: {{ isLoadingUserLocation }}</div>
  <div>isLoadingPublicHolidays: {{ isLoadingPublicHolidays }}</div>
  <div>isLoadingTodayHoliday: {{ isLoadingTodayHoliday }}</div>
  <br />

  <div>error:{{ error?.message ? error.message : 'NO error' }}</div>

  <br />

  <div>
    <strong>User Country: </strong>{{ userLocation?.country }} ({{
      userLocation?.country_code
    }})
  </div>

  <br />

  <div><strong>User State: </strong>{{ userLocation?.state }}</div>

  <br />

  <div><strong>State Code: </strong>{{ userLocation?.stateCode }}</div>

  <br />

  <div>
    <strong>Is Today a holiday: </strong>{{ Boolean(isTodayAuHoliday) }}
  </div>

  <br />

  <div>
    <strong>All Public Holidays: </strong
    >{{ allPublicHolidays?.map((holiday) => holiday.localName) }}
  </div>
</template>

<style scoped></style>
