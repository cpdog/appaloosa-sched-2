<template>
  <div>
    <AppaloosaSchedule />

    <!--<footer class="footer">
      <div class="container">
        <span>Place sticky footer content here.</span>
      </div>
    </footer>-->
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
$backColor: #1b6231;
#app {
  //margin-top: 20px;
}

.navbar {
  background-color: $backColor;
  top: 0;
}

body {
  margin-top: 70px !important; /* Margin bottom by footer height */
}
.header {
  position: fixed;
  background-color: $backColor;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  color: white;
  height: 45px; /* Set the fixed height of the footer here */
  line-height: 45px; /* Vertically center the text there */
  background-color: $backColor;
}
</style>
