<script setup lang="ts">
import dayjs from 'dayjs';
import { Address, Holiday } from '@/models';

defineProps<{
  userLocation: Address;
  allHolidays: Holiday[];
}>();
</script>

<template>
  <div class="flex flex-col container">
    <div class="w-fit self-center">
      <h1 class="text-2xl text-center">
        All holidays in {{ userLocation?.state ?? userLocation?.territory }},
        {{ new Date().getFullYear() }}
      </h1>

      <br />

      <div
        v-for="holiday in allHolidays"
        :key="holiday.date"
        class="flex gap-10"
      >
        <div class="min-w-40 text-right">
          {{ dayjs(holiday.date).format('MMMM D, YYYY') }}
        </div>
        <div>{{ holiday.localName }}</div>
      </div>
    </div>
  </div>
</template>
