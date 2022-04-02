<template>
  <h2 class="description">
    Traduiser les différents systèmes de cotations à travers le monde
  </h2>
  <div class="container">
    <GradesSystems />
  </div>
</template>
<script setup lang="ts">
import GradesSystems from "@/components/GradesSystems.vue";
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  background: rgba(19, 22, 31, 0.42);
  padding-top: 5px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  margin-bottom: 50px;
  border-radius: 30px;
  overflow-y: hidden;
  overflow-x: scroll;
}
</style>
