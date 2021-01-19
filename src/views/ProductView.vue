<template>
  <v-container>
    <ProductTree :items="items"/>
  </v-container>
</template>
<script>
import ProductTree from "../components/product/ProductTree";

export default {
  name: "ProductView",
  components: {
    ProductTree
  },
  data: () => {
    return {
      items: [],
    };
  },
  created() {
    console.log(this.$route.meta.name)
    this.items = this.$db.get(`${this.$route.meta.name}`)
      .value()
      .sort(function(a,b){ return new Date(b.registered) - new Date(a.registered);});
  },
  watch: {
    '$route' () {
      this.items = this.$db.get(`${this.$route.meta.name}`)
      .value()
      .sort(function(a,b){ return new Date(b.registered) - new Date(a.registered);});
    }
  }
};
</script>
