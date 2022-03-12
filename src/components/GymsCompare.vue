<template>
  <div class="container">
    <GymGradeSelect />
    <Grade title="VS" />
    <GymGradeSelect />
  </div>
</template>

<script lang="ts" setup>
import GymGradeSelect from "@/components/GymGradeSelect.vue";
import Grade from "@/components/Grade.vue";
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: 1fr 70px 1fr;
  background: rgba(19, 22, 31, 0.42);
  padding-top: 5px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  margin-bottom: 50px;
  border-radius: 20px;
  overflow: hidden;
}
</style>
