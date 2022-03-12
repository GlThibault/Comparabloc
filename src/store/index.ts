import Gym from "@/models/Gym";
import { createStore } from "vuex";

export default createStore({
  state: {
    gyms: [
      new Gym(
        "Block Out",
        {
          "N/A": "4",
          yellow: "5",
          orange: "6/12",
          blue: "12/18",
          red: "18/22",
          white: "22/25",
          black: "25/27",
          green: "27/31",
        },
        "https://www.blockout.fr/images/2019/09/16/logo-blockout.svg",
        { website: "https://www.blockout.fr" }
      ),
      new Gym(
        "Vertical Art",
        {
          pink: "4",
          white: "5",
          orange: "6/12",
          green: "12/18",
          blue: "18/22",
          red: "22/25",
          black: "25/29",
          purple: "29/31",
        },
        "https://www.vertical-art.fr/wp-content/themes/common/img/logo_va/logo-verticalart-bt.png",
        { website: "https://www.vertical-art.fr" }
      ),
      new Gym(
        "Arkose",
        {
          "N/A": "4",
          yellow: "5/12",
          green: "12/18",
          blue: "18/21",
          red: "21/24",
          black: "24/26",
          purple: "26/31",
        },
        "https://arkose.com/wp-content/themes/arkose/img/arkose_live-elevated_light.svg",
        { website: "https://www.arkose.com" }
      ),
      new Gym(
        "Climb Up",
        {
          "N/A": "4",
          pink: "5",
          yellow: "6/12",
          green: "12/17",
          blue: "17/19",
          purple: "19/21",
          red: "21/23",
          white: "23/25",
          black: "25/31",
        },
        "https://www.climb-up.fr/wp-content/uploads/2020/07/LOGO-CLIMB-UP-BLANC.png",
        { website: "https://www.climb-up.fr" }
      ),
      new Gym(
        "Le labo",
        {
          "N/A": "4",
          pinck: "5/7",
          green: "7/13",
          darkgreen: "13/16",
          yellow: "16/19",
          orange: "19/22",
          red: "22/24",
          purple: "24/26",
          blue: "26/28",
          black: "28/31",
        },
        "/lelabo.png",
        { website: "http://labo-bloc.com" }
      ),
      new Gym(
        "Le Triangle",
        {
          "N/A": "4",
          pink: "5/9",
          yellow: "9/15",
          green: "15/18",
          blue: "18/21",
          purple: "21/24",
          white: "24/26",
          black: "26/29",
          lightpink: "29/31",
        },
        "https://i0.wp.com/www.letriangle.net/wp-content/uploads/2021/08/logo-large-grand-texte-2.png?fit=900%2C408&ssl=1",
        { website: "https://www.letriangle.net" }
      ),
    ],
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
