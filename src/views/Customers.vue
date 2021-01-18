<template>
  <v-container>
    <SearchBar/>
    <CustomerTree :items="items"/>
  </v-container>
</template>
<script>
import db from "@/db/db";
import CustomerTree from "../components/customer/CustomerTree";
import SearchBar from "../components/search/SearchBar";

export default {
  name: "Customers",
  components: {
    CustomerTree,
    SearchBar
  },
  data: () => {
    return {
      items: [],
    };
  },
  created() {
    console.log(db);
    this.items = db.users;
  },
  methods: {},
};
</script>
