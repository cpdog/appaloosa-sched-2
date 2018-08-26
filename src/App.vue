<template>
  <div id="app" class="container-fluid">

    <AppaloosaSchedule />

  </div>
</template>

<script>
import AppaloosaSchedule from "./components/AppaloosaSchedule.vue";

export default {
  name: "app",
  components: {
    AppaloosaSchedule
  }
};
</script>

<style lang="scss">
#app {
  margin-top: 60px;
}
</style>
