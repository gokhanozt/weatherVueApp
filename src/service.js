import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

Vue.axios
  .get(
    "https://raw.githubusercontent.com/ardatasci/frontend-recruitment-task/master/istanbulCurrentWeather.json"
  )
  .then(response => {
    console.log(response.data);
    const weatherText = response.data[0].WeatherText;
  });
