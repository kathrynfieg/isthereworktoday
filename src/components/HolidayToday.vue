<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getRandomGif } from '@/api';
import { Holiday, Address } from '@/models';
import { getRandomMessage } from '@/utils';
import {
  holidayMessages,
  loadingMessages,
  notInAustraliaMessages,
  workdayMessages,
  locationPermissionMessage,
} from '@/messages';
import { Countdown } from '@/components';

defineProps<{
  isLoading?: boolean;
  todaysHoliday?: Holiday | null;
  allHolidays?: Holiday[];
  userLocation?: Address;
}>();

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
  <div class="bg-white p-4 md:p-10 rounded-lg">
    <div class="text-3xl">
      <transition name="fade" mode="out-in">
        <div v-if="isLoading" class="flex flex-col gap-6">
          <p>{{ randomLoadingMessage }}</p>
          <img class="w-60" src="@/assets/loading2.gif" />
          <p class="text-sm text-gray-500">
            {{ locationPermissionMessage }}
          </p>
        </div>

        <!-- TODO -->
        <!-- <p v-else-if="geoError">{{ randomErrorMessage }}</p> -->

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
</template>
