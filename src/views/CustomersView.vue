<template>
  <v-container>
    <SearchBar @searchResult="showSearchResult" />
    <DisplayTree :items="items" />
  </v-container>
</template>
<script>
import DisplayTree from "../components/display/DisplayTree";
import SearchBar from "../components/search/SearchBar";

export default {
  name: "Customers",
  components: {
    DisplayTree,
    SearchBar,
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
