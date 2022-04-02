<template>
  <div class="container">
    <Grade grade="gradeList" />
    <template v-for="gym in gyms" :key="gym.name">
      <GymGrade :gym="gym" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import GymGrade from "@/components/GymGrade.vue";
import Grade from "@/components/Grade.vue";

import { useStore } from "vuex";
const store = useStore();
const gyms = store.state.gyms;
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: rgba(19, 22, 31, 0.42);
  padding-top: 5px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  margin-bottom: 50px;
  border-radius: 30px;
  overflow: hidden;
}
</style>
