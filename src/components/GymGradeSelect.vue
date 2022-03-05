<template>
  <div class="gymContainer">
    <select @input="selectGym">
      <option v-for="(g, key) in gyms" :key="g.name" :value="key">
        {{ g.name }}
      </option>
    </select>

    <!-- <v-select :options="gyms" label="name" class="selectGym">
      <template v-slot:option="g">
        <div class="optionGym">
          <img v-if="g.logo" :src="g.logo" :alt="g.name" :title="g.name" />
          <div v-else class="gymTitle">{{ g.name }}</div>
        </div>
      </template>
    </v-select> -->
    <template v-for="(val, key) in state.currentGym.grades" :key="key">
      <div :style="{ backgroundColor: key, gridRow: val }"></div>
    </template>
  </div>
</template>

<script lang="ts" setup>
// import vSelect from "vue-select";
import { useStore } from "vuex";
import { reactive } from "vue";
const store = useStore();
const gyms = store.state.gyms;

const state = reactive({ currentGym: gyms[0] });

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
</style>
