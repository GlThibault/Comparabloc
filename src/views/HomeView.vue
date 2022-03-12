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
  grid-template-rows: repeat(28, 3vh);
  margin-top: 25px;

  .gradeRow {
    font-weight: bold;
    border-bottom: 1px solid #0003;
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

.description {
  font-size: 1rem !important;
  margin-top: 0;
}
</style>
