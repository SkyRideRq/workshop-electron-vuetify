<template>
  <v-container>
    <SearchBar @searchResult="showSearchResult" :dataItems="items"/>
    <DisplayTree :items="items" />
    <CustomerAdd />
  </v-container>
</template>
<script>
import DisplayTree from "../components/display/DisplayTree";
import SearchBar from "../components/search/SearchBar";
import CustomerAdd from "../components/customer/CustomerAdd";

export default {
  name: "Customers",
  components: {
    DisplayTree,
    SearchBar,
    CustomerAdd,
  },
  data: () => {
    return {
      items: [],
    };
  },
  created() {
    this.items = this.$db
      .get("users")
      .sortBy("last")
      .value();
  },
  methods: {
    showSearchResult(value) {
      this.items = value;
    },
  },
};
</script>
