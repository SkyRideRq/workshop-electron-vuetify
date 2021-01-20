<template>
  <v-app>
    <NavDrawer />
    <Header />
    <AppView />
  </v-app>
</template>

<script>
import Header from "./components/layout/Header";
import AppView from "./components/layout/AppView";
import NavDrawer from "./components/layout/NavDrawer";
export default {
  name: "App",

  components: {
    AppView,
    NavDrawer,
    Header,
  },

  data: () => ({
    //
  }),
  watch: {
    $route() {
      // console.log(this.$route);
    },
  },
};
</script>
<style>
::-webkit-scrollbar {
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 1);
  margin-top: 75px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1976d2;
}
</style>
