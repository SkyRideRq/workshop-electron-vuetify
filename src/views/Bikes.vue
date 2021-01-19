<template>
  <v-container>
    <ProductTree :items="items"/>
  </v-container>
</template>
<script>
import ProductTree from "../components/product/ProductTree";

export default {
  name: "Bikes",
  components: {
    ProductTree
  },
  data: () => {
    return {
      items: [],
    };
  },
  created() {
    this.items = this.$db.get('bikes')
      .value()
      .sort(function(a,b){ return new Date(b.registered) - new Date(a.registered);});
  },
};
</script>
