<script setup lang="ts">
import dayjs from 'dayjs';

defineProps({
  location: {
    type: String,
    default: undefined,
  },
});
</script>

<template>
  <nav class="w-dvw p-4 flex items-start justify-between flex-wrap">
    <div class="flex items-center gap-2 text-sm">
      <img class="w-5" src="@/assets/logo.png" />
      <div>
        <span class="text-[#01b695]">ISTR</span>WRK<span class="text-[#eeb3e7]"
          >2DAY
        </span>
      </div>
    </div>

    <div class="text-right flex gap-2">
      <div>
        <span v-if="location">{{ location }} •</span>
        {{ dayjs(new Date()).format('MMMM D, YYYY') }}
      </div>
    </div>
  </nav>
</template>
