<template>
  <div class="home">
    <currentWeather/>
  </div>
</template>

<script>
import currentWeather from "@/components/currentWeather.vue";

export default {
  name: "home",
  components: {
    currentWeather
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
</style>

