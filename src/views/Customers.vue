<template>
  <v-container>
    <v-text-field label="Szukaj"></v-text-field>
    <CustomerTree :items="items"/>
  </v-container>
</template>
<script>
import db from "@/db/db";
import CustomerTree from "../components/customer/CustomerTree";

export default {
  name: "Customers",
  components: {
    CustomerTree
  },
  data: () => {
    return {
      items: [],
    };
  },
  created() {
    console.log(db);
    this.items = db;
  },
  methods: {},
};
</script>
