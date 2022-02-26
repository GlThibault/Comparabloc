<template>
  <GymsList :gyms="gyms" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import GymsList from "@/components/GymsList.vue";
import Gym from "@/models/Gym";

@Options({
  components: {
    GymsList,
  },
})
export default class HomeView extends Vue {
  gyms: Gym[] = [
    new Gym("Block Out", {
      "N/A": "2/3",
      yellow: "3/4",
      orange: "4/10",
      blue: "10/16",
      red: "16/20",
      white: "20/23",
      black: "23/25",
      green: "25/28",
    }),
    new Gym("Vertical Art", {
      pink: "2/3",
      white: "3/4",
      orange: "4/10",
      green: "10/16",
      blue: "16/20",
      red: "20/23",
      black: "23/27",
      purple: "27/29",
    }),
  ];
}
</script>
