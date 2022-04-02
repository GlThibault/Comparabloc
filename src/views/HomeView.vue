<template>
  <h2 class="description">
    Comparer simplement les couleurs de cotations dans vos salles de blocs
  </h2>
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
  grid-template-rows: repeat(36, 3vh);
  margin-top: 25px;

  &.smallContainer {
    grid-template-rows: repeat(30, 3vh);
  }

  .gradeRow:not(.noMinWidth) {
    font-weight: bold;
    border-bottom: 1px solid #0003;
    min-width: 100px;
  }

  .gradeRow:last-child {
    border-bottom: none;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 80%;
    }

    .gymTitle {
      font-weight: bold;
      margin-top: -25px;
      color: #ec9231;
    }
  }
}
</style>
