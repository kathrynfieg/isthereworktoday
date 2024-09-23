<script setup lang="ts">
/**
 * TODO
 * - Improve geo error check
 * - Responsive design mobile
 * - more holiday info if holiday
 * - countdown for next holiday
 * - readme update for .env
 * - celebration animation
 */
import { useHolidayInfo } from '@/composables';
import { getRandomGif } from '@/api';
import dayjs from 'dayjs';

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
import { onMounted, ref } from 'vue';
import Countdown from '@/components/Countdown.vue';

const randomErrorMessage = getRandomMessage(errorMessages);
const randomLoadingMessage = getRandomMessage(loadingMessages);
const randomWorkdayMessage = getRandomMessage(workdayMessages);
const randomHolidayMessage = getRandomMessage(holidayMessages);
const randomNotAustraliaMessage = getRandomMessage(notInAustraliaMessages);

const holidayGif = ref('');
const workdayGif = ref('');

onMounted(async () => {
  holidayGif.value = await getRandomGif('celebrate');
  workdayGif.value = await getRandomGif('sad');
});
</script>

<template>
  <div class="flex flex-col min-h-dvh items-center container">
    <nav class="w-dvw p-4 flex items-start justify-between">
      <div class="flex items-center gap-2 text-sm">
        <img class="w-5" src="@/assets/logo.png" />
        <div>
          <span class="text-[#01b695]">ISTR</span>WRK<span
            class="text-[#eeb3e7]"
            >2DAY
          </span>
        </div>
      </div>

      <div class="text-right flex gap-2">
        <div>
          {{ userLocation?.state ?? userLocation?.territory }}
          •
          {{ dayjs(new Date()).format('MMMM D, YYYY') }}
        </div>
      </div>
    </nav>

    <div
      class="flex-1 flex flex-col md:flex-row gap-20 justify-center items-center w-full"
    >
      <div class="w-1/2 flex flex-col justify-center">
        <h1 class="text-5xl flex flex-col gap-3 -rotate-6 self-center">
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
        <div class="text-3xl">
          <div v-if="isLoading" class="flex flex-col gap-6">
            <p>{{ randomLoadingMessage }}</p>
            <img class="w-60" src="@/assets/loading2.gif" />
            <p class="text-sm text-gray-500">
              {{ locationPermissionMessage }}
            </p>
          </div>

          <!-- <p v-else-if="geoError">
            {{ randomErrorMessage }}
          </p> -->

          <div
            class="flex flex-col gap-4"
            v-else-if="userLocation?.country_code != 'au'"
          >
            <p class="text-3xl">
              {{ randomNotAustraliaMessage }}
            </p>
            <img class="w-fit self-center" src="@/assets/no-access.png" />
          </div>

          <div v-else>
            <div v-if="todaysHoliday" class="flex flex-col gap-6">
              <!-- <div>It's {{ todaysHoliday.localName }}!</div> -->
              <div class="text-4xl underline">It's a Holiday!</div>
              <div class="text-3xl">{{ randomHolidayMessage }}</div>
              <img
                v-if="holidayGif"
                class="gif"
                :src="holidayGif"
                alt="Holiday GIF"
              />
            </div>

            <div v-else class="flex flex-col gap-4">
              <div>Sorry...</div>
              <div class="text-4xl">{{ randomWorkdayMessage }}</div>
              <img
                v-if="workdayGif"
                class="gif"
                :src="workdayGif"
                alt="Workday GIF"
              />
              <Countdown :all-holidays="allHolidays" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gif {
  width: 100%;
  max-width: 300px;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
