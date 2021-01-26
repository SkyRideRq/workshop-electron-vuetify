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
      // this.items = this.$db
      //   .get(`${this.$route.meta.name}`)
      //   .value()
      //   .sort(function(a, b) {
      //     return new Date(b.registered) - new Date(a.registered);
      //   });
      this.items = [];
      this.$db
        .get("users")
        .value()
        // .forEach((item) => console.log(item.children));
        .forEach((item) => {
          if (item.children !== undefined)
            item.children.forEach((item) => {
              if (this.$route.meta.name === "repairs") {
                item.children.forEach((item) => {
                  this.items.push(item);
                });
                // console.log(this.item);
                // this.items = [...this.items, ...item.children];
              }
              if (this.$route.meta.name === item.type) {
                this.items.push(item);
              }
            });
        });
      // .forEach((item) => Object.assign(this.items, item.children));
    },
  },
};
</script>
