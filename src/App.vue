<script setup lang="ts">
/**
 * TODO
 * - Improve geo error check
 * - more holiday info if holiday
 * - celebration animation
 */
import { onMounted, ref } from 'vue';
import { useHolidayInfo } from '@/composables';
import { getRandomGif } from '@/api';
import {
  workdayMessages,
  holidayMessages,
  loadingMessages,
  locationPermissionMessage,
  notInAustraliaMessages,
} from '@/messages';
import { getRandomMessage } from '@/utils';
import { Countdown, MainLogo, Navbar } from '@/components';

const { isLoading, userLocation, todaysHoliday, allHolidays } =
  useHolidayInfo();

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
    <Navbar :location="userLocation?.state ?? userLocation?.territory" />

    <div
      class="flex-1 flex flex-col md:flex-row gap-5 py-5 md:gap-16 justify-center items-center w-full"
    >
      <div class="w-full md:w-1/2 flex flex-col justify-center">
        <MainLogo />
      </div>

      <div class="w-full md:w-1/2 bg-white p-4 md:p-10 rounded-lg">
        <div class="text-3xl">
          <transition name="fade" mode="out-in">
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
                <div class="text-4xl underline">
                  It's {{ todaysHoliday.localName }}!
                </div>
                <div class="text-3xl">{{ randomHolidayMessage }}</div>
                <img
                  v-if="holidayGif"
                  class="gif"
                  :src="holidayGif"
                  alt="Holiday GIF"
                />
              </div>

              <div v-else class="flex flex-col gap-4">
                <div>
                  <div>Sorry...</div>
                  <div class="text-4xl">{{ randomWorkdayMessage }}</div>
                </div>
                <img
                  v-if="workdayGif"
                  class="gif"
                  :src="workdayGif"
                  alt="Workday GIF"
                />
                <Countdown :all-holidays="allHolidays" />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gif {
  max-height: 130px;
  width: auto;
  display: block;
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
