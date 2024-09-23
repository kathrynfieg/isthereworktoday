<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { getAuPublicHolidays } from '@/api';
import { Holiday } from '@/models';

dayjs.extend(duration);

const nextHoliday = ref<Holiday | null>(null);
const timeUntilNextHoliday = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const findNextHoliday = (holidays: Holiday[]) => {
  const today = dayjs();
  const futureHolidays = holidays.filter((holiday) =>
    dayjs(holiday.date).isAfter(today)
  );

  if (futureHolidays.length) {
    futureHolidays.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
    nextHoliday.value = futureHolidays[0];
  }
};

const updateCountdown = () => {
  if (!nextHoliday.value) return;

  const holidayDate = dayjs(nextHoliday.value.date);
  const now = dayjs();
  const diff = holidayDate.diff(now);

  const duration = dayjs.duration(diff);

  timeUntilNextHoliday.value = {
    days: Math.floor(duration.asDays()),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  };
};

const initializeCountdown = async () => {
  const currentYear = new Date().getFullYear();
  const holidays = await getAuPublicHolidays(currentYear);
  findNextHoliday(holidays);

  if (nextHoliday.value) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
};

const formattedNextHolidayDate = computed(() => {
  return nextHoliday.value
    ? dayjs(nextHoliday.value.date).format('MMMM D, YYYY')
    : '';
});

onMounted(() => {
  initializeCountdown();
});
</script>

<template>
  <div v-if="nextHoliday">
    <div class="text-2xl mt-6">
      But hey, don't worry - the next holiday is just around the corner! Next
      one's
      <span class="underline">{{ nextHoliday.localName }}</span> on
      <span class="underline">{{ formattedNextHolidayDate }}</span
      >.
      <br />
      <br />
      <span class="text-5xl">{{ timeUntilNextHoliday.days }}</span> d
      <span class="text-5xl">{{ timeUntilNextHoliday.hours }}</span> h
      <span class="text-5xl">{{ timeUntilNextHoliday.minutes }}</span> m
      <span class="text-5xl">{{ timeUntilNextHoliday.seconds }}</span> s to go!
    </div>
  </div>
  <div v-else>
    <p>
      😕 No upcoming holidays this year? Looks like it's back to the grind...
      for now. 🛠️
    </p>
  </div>
</template>
