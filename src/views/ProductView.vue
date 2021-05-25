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
      this.items = [];
      this.$db
        .get("users")
        .value()
        .forEach((item) => {
          if (item.children !== undefined)
            item.children.forEach((item) => {
              if (this.$route.meta.name === "repairs") {
                item.children.forEach((item) => {
                  this.items.push(item);
                });
              }
              if (this.$route.meta.name === item.type) {
                this.items.push(item);
              }
            });
        });
    },
  },
};
</script>
