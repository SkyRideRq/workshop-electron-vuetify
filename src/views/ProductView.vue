<template>
  <v-container>
    <ProductTree :items="items" />
  </v-container>
</template>
<script>
import ProductTree from "../components/product/ProductTree";

export default {
  name: "ProductView",
  components: {
    ProductTree,
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
