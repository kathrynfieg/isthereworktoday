<script setup lang="ts">
/**
 * TODO
 * Improve geo error check
 */
import { useHolidayInfo } from '@/composables';

const { geoError, isLoading, userLocation, todaysHoliday } = useHolidayInfo();

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
  <div class="flex flex-col min-h-dvh items-center container">
    <nav>
      <!-- <h1 class="text-5xl">Do I have work today? 🤞</h1> -->
    </nav>

    <div class="flex-1 flex flex-row gap-20 justify-center items-center w-full">
      <div class="w-1/2 flex justify-center">
        <h1 class="text-5xl flex flex-col gap-3 -rotate-6">
          <div class="bg-[#01b695] px-6 py-2 rounded-lg w-fit">IS THERE</div>
          <div class="bg-white px-8 py-2 rounded-lg text-8xl w-fit ml-5">
            WORK
          </div>
          <div class="bg-[#eeb3e7] px-6 py-2 rounded-lg w-fit ml-28">
            TODAY?
          </div>
        </h1>
      </div>

      <div class="w-1/2">
        <div class="text-2xl">
          <div v-if="isLoading">
            <h2>{{ randomLoadingMessage }}</h2>
            <br />
            <p class="text-sm text-gray-500">
              {{ locationPermissionMessage }}
            </p>
          </div>

          <h2 v-else-if="geoError">
            {{ randomErrorMessage }}
          </h2>

          <h2 class="text-3xl" v-else-if="userLocation?.country_code != 'au'">
            {{ randomNotAustraliaMessage }}
          </h2>

          <h2 v-else>
            <div v-if="todaysHoliday">
              <!-- <div>It's {{ todaysHoliday.localName }}!</div> -->
              <div class="text-4xl underline">It's a Holiday!</div>
              <div class="text-3xl">{{ randomHolidayMessage }}</div>
            </div>

            <div v-else>
              <div>Sorry...</div>
              <div class="text-4xl">{{ randomWorkdayMessage }}</div>
            </div>
            <!-- {{ todaysHoliday ? randomHolidayMessage : randomWorkdayMessage }} -->
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
