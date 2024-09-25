<script setup lang="ts">
/**
 * TODO
 * - Improve geo error check
 * - more holiday info if holiday
 * - celebration animation
 */
import { useHolidayInfo } from '@/composables';
import { HolidayToday, MainLogo, Navbar } from '@/components';

const { isLoading, userLocation, todaysHoliday, allHolidays } =
  useHolidayInfo();
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
        <HolidayToday
          :is-loading="isLoading"
          :todays-holiday="todaysHoliday"
          :all-holidays="allHolidays"
        />
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
