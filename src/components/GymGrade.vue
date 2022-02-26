<template>
  <div class="gymContainer">
    <div class="gymTitle">{{ gym.name }}</div>
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

<style scoped lang="scss">
.gymContainer {
  display: grid;
  grid-template-rows: repeat(50, 1fr);

  .gymTitle {
    grid-row: 1;
  }
}
</style>
