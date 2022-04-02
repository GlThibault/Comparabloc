<template>
  <div class="gymContainer smallContainer">
    <a :href="props?.gym?.socialNetwork?.website" target="_blank">
      <img
        v-if="props?.gym?.logo"
        :src="props?.gym?.logo"
        :alt="props?.gym.name"
        :title="props?.gym.name"
      />
      <div v-else class="gymTitle">{{ props?.gym?.name }}</div>
    </a>
    <template v-for="(val, key) in props?.gym?.grades" :key="key">
      <div :style="{ backgroundColor: key, gridRow: val }"></div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Gym from "@/models/Gym";

const props = defineProps({
  gym: Gym,
});
</script>
