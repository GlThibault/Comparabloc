<template>
  <div class="gymContainer">
    <a :href="gym.socialNetwork?.website" target="_blank">
      <img v-if="gym.logo" :src="gym.logo" :alt="gym.name" :title="gym.name" />
      <div v-else class="gymTitle">{{ gym.name }}</div>
    </a>
    <template v-for="(val, key) in gym.grades" :key="key">
      <div :style="{ backgroundColor: key, gridRow: val }"></div>
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Gym from "@/models/Gym";

@Options({
  props: {
    gym: Gym,
  },
})
export default class GymGrade extends Vue {
  gym!: Gym;
}
</script>
