<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-center">
        <h1 class="ml-4">{{ data.name }}</h1>
      </v-col>
      <v-col class="d-flex align-center">
        <h2>Typ urządzenia: {{ type }}</h2>
      </v-col>
      <v-col class="d-flex align-center">
        <h2 class="m-0">Numer seryjny: {{ data.serialNumber }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex align-center">
        <h2 class="ml-4">Właściciel: {{ owner.name }}</h2>
      </v-col>
      <v-col class="d-flex align-center">
        <h2>Firma: {{ owner.company }}</h2>
      </v-col>
      <v-col class="d-flex align-center">
        <h2>Nr telefonu: {{ owner.phone }}</h2>
      </v-col>
    </v-row>
    <v-divider class="mb-5 mt-0"></v-divider>
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
      type: "",
      owner: [],
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
    this.owner = this.$db
      .get("users")
      .find({ guid: this.$route.params.id })
      .value();
    this.items = this.data.children;
    console.log(this.items);
    if (this.data.type === "stihl") {
      this.type = "Stihl";
    }
    if (this.data.type === "bike") {
      this.type = "Rower";
    }
    if (this.data.type === "mower") {
      this.type = "Kosiarka";
    }
  },
};
</script>
