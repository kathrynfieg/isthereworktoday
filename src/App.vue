<script setup lang="ts">
/**
 * TODO
 * - Improve geo error check
 * - more holiday info if holiday
 * - celebration animation
 */
import { useHolidayInfo } from '@/composables';
import {
  HolidayToday,
  MainLogo,
  Navbar,
  AllHolidays,
  Footer,
} from '@/components';

const { isLoading, userLocation, todaysHoliday, allHolidays } =
  useHolidayInfo();
</script>

<template>
  <div class="flex flex-col min-h-dvh items-center justify-between pb-5">
    <Navbar
      class="w-full"
      :location="userLocation?.state ?? userLocation?.territory"
    />

    <div
      class="flex flex-col md:flex-row gap-5 py-5 md:gap-16 justify-center items-center w-full container"
    >
      <div class="w-full md:w-1/2 flex flex-col justify-center">
        <MainLogo />
      </div>

      <div class="w-full md:w-1/2">
        <HolidayToday
          :is-loading="isLoading"
          :todays-holiday="todaysHoliday"
          :all-holidays="allHolidays"
          :user-location="userLocation"
        />
      </div>
    </div>

    <div v-if="!isLoading && allHolidays">View all holidays below v</div>
  </div>

  <AllHolidays
    v-if="!isLoading && allHolidays && userLocation"
    :all-holidays="allHolidays"
    :user-location="userLocation"
  />

  <Footer />
</template>
