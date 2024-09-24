<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Holiday } from '@/models';

const props = defineProps({
  allHolidays: {
    type: Array<Holiday>,
    default: [],
  },
});

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

const initializeCountdown = () => {
  const holidays = props.allHolidays;
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
    <div class="text-2xl flex flex-col gap-6">
      <div>
        Your next holiday is
        <span class="underline">{{ nextHoliday.localName }}</span> on
        <span class="underline">{{ formattedNextHolidayDate }}</span
        >!
      </div>
      <div
        class="flex items-center gap-2 justify-center self-center bg-gray-200 p-4 rounded-md -rotate-2 w-fit"
      >
        <div class="flex flex-col items-center">
          <div
            class="bg-black text-white md:text-5xl rounded-md p-2 min-w-12 md:min-w-20 flex justify-center"
          >
            {{ timeUntilNextHoliday.days }}
          </div>
          <div>days</div>
        </div>
        <div class="text-5xl mb-12">:</div>
        <div class="flex flex-col items-center">
          <div
            class="bg-black text-white md:text-5xl rounded-md p-2 min-w-12 md:min-w-20 flex justify-center"
          >
            {{ timeUntilNextHoliday.hours }}
          </div>
          <div>hours</div>
        </div>
        <div class="text-5xl mb-12">:</div>
        <div class="flex flex-col items-center">
          <div
            class="bg-black text-white md:text-5xl rounded-md p-2 min-w-12 md:min-w-20 flex justify-center"
          >
            {{ timeUntilNextHoliday.minutes }}
          </div>
          <div>mins</div>
        </div>
        <div class="text-5xl mb-12">:</div>
        <div class="flex flex-col items-center">
          <div
            class="bg-black text-white md:text-5xl rounded-md p-2 min-w-12 md:min-w-20 flex justify-center"
          >
            {{ timeUntilNextHoliday.seconds }}
          </div>
          <div>secs</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>
      😕 No upcoming holidays this year? Looks like it's back to the grind...
      for now. 🛠️
    </p>
  </div>
</template>
