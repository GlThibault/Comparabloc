<template>
  <GymsCompare />
  <GymsList />
</template>

<script setup lang="ts">
import GymsList from "@/components/GymsList.vue";
import GymsCompare from "@/components/GymsCompare.vue";
</script>

<style lang="scss">
* {
  text-align: center;
}
.gymContainer {
  display: grid;
  grid-template-rows: repeat(34, 1fr);
  margin-top: 50px;

  .gradeRow {
    font-weight: bold;
    border-bottom: 1px solid #0003;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -50px;

    img {
      max-width: 80%;
    }

    .gymTitle {
      grid-row: 1;
      font-weight: bold;
    }
  }
}
</style>
