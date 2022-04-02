<template>
  <div
    :class="[
      'gymContainer',
      props.grade == 'gradeList' ? 'smallContainer' : '',
    ]"
  >
    <a style="grid-row: 1/4">
      <div class="gymTitle">
        <div
          v-if="state?.currentGrade?.image"
          :title="state?.currentGrade?.title"
        >
          <img
            :src="state.currentGrade.image"
            :alt="state?.currentGrade?.title"
            height="20"
          /><br />
          {{ state.currentGrade.subtitle }}
        </div>
        <div v-else>
          {{ state?.currentGrade?.title }}
        </div>
      </div>
    </a>
    <template v-for="(grade, key) in state.currentGrade" :key="grade">
      <div
        :class="['gradeRow', props.grade == 'gradeList' ? 'noMinWidth' : '']"
        v-if="key >= props.min && key <= props.max"
      >
        {{ grade }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { reactive } from "vue";

const props = defineProps({
  grade: { type: String, default: "Fontainebleau" },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 36 },
});

const store = useStore();
const grades = store.state.grades;

// const selectGrade = (event: Event) => {
//   state.currentGrade = grades[event?.target?.value];
// };
const gradeList = [
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
  "> 8",
];

const state = reactive({
  currentGrade: props.grade == "gradeList" ? gradeList : grades[props.grade],
});
</script>
