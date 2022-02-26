<template>
  <div class="container">
    <Grade />
    <template v-for="gym in gyms" :key="gym.name">
      <GymGrade :gym="gym" />
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import GymGrade from "@/components/GymGrade.vue";
import Grade from "@/components/Grade.vue";
import Gym from "@/models/Gym";

@Options({
  props: {
    gyms: Array,
  },
  components: {
    GymGrade,
    Grade,
  },
})
export default class GymsList extends Vue {
  gyms!: Gym[];
}
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
</style>
