<script setup lang="ts">
import { useHolidayInfo } from '@/composables';

const { geoError, isLoading, userLocation, todaysHoliday, allHolidays } =
  useHolidayInfo();

import {
  workdayMessages,
  holidayMessages,
  loadingMessages,
  locationPermissionMessage,
  errorMessages,
  notInAustraliaMessages,
} from '@/messages';
import { getRandomMessage } from '@/utils';

const randomErrorMessage = getRandomMessage(errorMessages);
const randomLoadingMessage = getRandomMessage(loadingMessages);
const randomWorkdayMessage = getRandomMessage(workdayMessages);
const randomHolidayMessage = getRandomMessage(holidayMessages);
const randomNotAustraliaMessage = getRandomMessage(notInAustraliaMessages);
</script>

<template>
  <h1>Do I have work today? 🤞</h1>
  <div v-if="isLoading">
    <h2>{{ randomLoadingMessage }}</h2>
    <br />
    {{ locationPermissionMessage }}
  </div>

  <h2 v-else-if="geoError">
    {{ randomErrorMessage }}
  </h2>

  <h2 v-else-if="userLocation?.country_code != 'au'">
    {{ randomNotAustraliaMessage }}
  </h2>

  <h2 v-else>
    {{ todaysHoliday ? randomHolidayMessage : randomWorkdayMessage }}
  </h2>
</template>

<style scoped></style>
