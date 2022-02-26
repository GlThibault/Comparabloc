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
    new Gym(
      "Block Out",
      {
        "N/A": "2",
        yellow: "3",
        orange: "4/10",
        blue: "10/16",
        red: "16/20",
        white: "20/23",
        black: "23/25",
        green: "25/28",
      },
      "https://www.blockout.fr/images/2019/09/16/logo-blockout.svg",
      { website: "https://www.blockout.fr" }
    ),
    new Gym(
      "Vertical Art",
      {
        pink: "2",
        white: "3",
        orange: "4/10",
        green: "10/16",
        blue: "16/20",
        red: "20/23",
        black: "23/27",
        purple: "27/29",
      },
      "https://www.vertical-art.fr/wp-content/themes/common/img/logo_va/logo-verticalart-bt.png",
      { website: "https://www.vertical-art.fr" }
    ),
    new Gym(
      "Arkose",
      {
        "N/A": "2",
        yellow: "3/10",
        green: "10/16",
        blue: "16/19",
        red: "19/22",
        black: "22/24",
        purple: "24/28",
      },
      "https://www.arkose.com/wp-content/themes/arkose/img/logo.png",
      { website: "https://www.arkose.com" }
    ),
    new Gym(
      "Climb Up",
      {
        "N/A": "2",
        pink: "3",
        yellow: "4/10",
        green: "10/15",
        blue: "15/17",
        purple: "17/19",
        red: "19/21",
        white: "21/23",
        black: "23/28",
      },
      "https://www.climb-up.fr/wp-content/uploads/2020/07/LOGO-CLIMB-UP-BLANC.png",
      { website: "https://www.climb-up.fr" }
    ),
    new Gym(
      "Le labo",
      {
        "N/A": "2",
        pinck: "3/5",
        green: "5/11",
        darkgreen: "11/14",
        yellow: "14/17",
        orange: "17/20",
        red: "20/22",
        purple: "22/24",
        blue: "24/26",
        black: "26/35",
      },
      "/lelabo.png",
      { website: "http://labo-bloc.com" }
    ),
    new Gym(
      "Le Triangle",
      {
        "N/A": "2",
        pink: "3/7",
        yellow: "7/13",
        green: "13/16",
        blue: "16/19",
        purple: "19/22",
        white: "22/24",
        black: "24/27",
        lightpink: "27/31",
      },
      "https://i0.wp.com/www.letriangle.net/wp-content/uploads/2021/08/logo-large-grand-texte-2.png?fit=900%2C408&ssl=1",
      { website: "https://www.letriangle.net" }
    ),
  ];
}
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
