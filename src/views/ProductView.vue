<template>
  <v-container>
    <DisplayTree :items="items" />
  </v-container>
</template>
<script>
import DisplayTree from "../components/display/DisplayTree";

export default {
  name: "ProductView",
  components: {
    DisplayTree,
  },
  data: () => {
    return {
      items: [],
    };
  },
  created() {
    this.updateContent();
  },
  watch: {
    $route() {
      this.updateContent();
    },
  },
  methods: {
    updateContent() {
      this.items = this.$db
        .get(`${this.$route.meta.name}`)
        .value()
        .sort(function(a, b) {
          return new Date(b.registered) - new Date(a.registered);
        });
    },
  },
};
</script>
