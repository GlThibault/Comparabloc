<template>
  <div class="gymContainer smallContainer">
    <div class="select">
      <select @input="selectGym" v-model="state.gymSelected">
        <option v-for="(g, key) in gyms" :key="g.name" :value="key">
          {{ g.name }}
        </option>
      </select>
    </div>

    <div class="gymLogo">
      <img
        v-if="state.currentGym.logo"
        :src="state.currentGym.logo"
        :alt="state.currentGym.name"
        :title="state.currentGym.name"
      />
    </div>
    <template v-for="(val, key) in state.currentGym.grades" :key="key">
      <div :style="{ backgroundColor: key, gridRow: val }"></div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { reactive } from "vue";
const store = useStore();
const gyms = store.state.gyms;

const props = defineProps({
  start: { type: Number, default: 0 },
});

const state = reactive({
  currentGym: gyms[props.start],
  gymSelected: props.start,
});

const selectGym = (event: Event) => {
  state.currentGym = gyms[event?.target?.value];
};
</script>
<style lang="scss" scoped>
.optionGym {
  max-width: 100%;
  background: #666;
  color: white;

  img {
    height: 30px;
  }
}
.gymLogo {
  grid-row: 2/3;
}
.gymLogo img {
  height: 5vh;
  margin-top: 0.5vh;
  max-width: 100%;
}

.select {
  position: relative;
  display: flex;
  height: 34px;
  border-radius: 0.25em;
  overflow: hidden;
  margin-top: -20px;
  margin-right: 10px;
  margin-left: 10px;

  select {
    appearance: none;
    outline: 0;
    border: 0;
    box-shadow: none;
    flex: 1;
    padding: 0 1em;
    color: #fff;
    background-color: #2c3e50;
    background-image: none;
    cursor: pointer;
    text-align: left;
  }
  select::-ms-expand {
    display: none;
  }
  &:after {
    content: "\25BC";
    position: absolute;
    top: 0;
    right: 0;
    padding: 7px 5px 7px 5px;
    background-color: #34495e;
    transition: 0.25s all ease;
    pointer-events: none;
  }
  &:hover:after {
    color: #f39c12;
  }
}
</style>
