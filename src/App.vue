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
      console.log(this.$route);
    },
  },
};
</script>
