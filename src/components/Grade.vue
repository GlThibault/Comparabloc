<template>
  <div class="gymContainer">
    <div class="gymTitle">Grades</div>
    <template v-for="grade in gradeList" :key="grade">
      <div class="gradeRow">
        {{ grade }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Grade extends Vue {
  gradeList = [
    "<3",
    "3",
    "4a",
    "4a+",
    "4b",
    "4b+",
    "4c",
    "4c+",
    "5a",
    "5a+",
    "5b",
    "5b+",
    "5c",
    "5c+",
    "6a",
    "6a+",
    "6b",
    "6b+",
    "6c",
    "6c+",
    "7a",
    "7a+",
    "7b",
    "7b+",
    "7c",
    "7c+",
    "8a",
    "8a+",
    "8b",
    "8b+",
    "8c",
    "8c+",
    "9a",
    "9a+",
    "9b",
    "9b+",
    "9c",
    "9c+",
  ];
}
</script>

<style scoped lang="scss">
.gymContainer {
  display: grid;
  grid-template-rows: repeat(50, 1fr);
  .gymTitle {
    grid-row: 1;
  }
  .gradeRow {
    background-color: white;
    font-weight: bold;
    color: black;
  }
}
</style>
