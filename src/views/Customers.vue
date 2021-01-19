<template>
  <v-container>
    <SearchBar @searchResult="showSearchResult"/>
    <CustomerTree :items="items"/>
  </v-container>
</template>
<script>
// import db from "../../db.json";
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
    this.items = this.$db.get('users')
      .sortBy('last')
      .value()
  },
  methods: {
    showSearchResult(value) {
      this.items = value
    }
  },
};
</script>
