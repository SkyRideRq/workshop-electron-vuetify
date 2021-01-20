<template>
  <v-container>
    <h1 class="ml-4">{{ data.name }}</h1>

    <v-divider class="mb-5 mt-2"></v-divider>
    <ProductTree :items="items" />
  </v-container>
</template>

<script>
import ProductTree from "../components/product/ProductTree";
export default {
  name: "ProductPage",
  components: {
    ProductTree,
  },
  data: () => {
    return {
      data: [],
    };
  },
  created() {
    console.log(this.$route);

    this.data = this.$db
      .get("users")
      .find({ guid: this.$route.params.id })
      .get("children")
      .find({ guid: this.$route.params.id1 })
      .value();
    console.log(this.data);
    this.items = this.data.children;
  },
};
</script>
