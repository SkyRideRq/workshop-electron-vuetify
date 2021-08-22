<template>
  <v-container>
    <v-form ref="form">
      <div class="search-box mt-5">
        <v-combobox
          v-model="searchPlace"
          :items="items"
          class="px-2 search-box__input"
          label="Szukaj po"
          disable-lookup
          @change="changeSearch"
        ></v-combobox>

        <v-autocomplete
          :label="searchPlace.searchLabel"
          v-model="searchWord"
          class="px-2 search-box__input"
          :items='searchPlace.dataToSuggest'
          @change='search'
        ></v-autocomplete>
      </div>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "SearchBar",
  data: () => {
    return {
      searchWord: "",
      searchPlace: {
        text: "Nazwisku klienta",
        value: "last",
        searchLabel: "Nazwisko",
        dataToSuggest: []
      },
      items: [
        {
          text: "Nazwie firmy",
          value: "company",
          searchLabel: "Firma",
          
        },
        {
          text: "Nazwisku klienta",
          value: "last",
          searchLabel: "Nazwisko",
        },
      ],
      dataLastNames:[],
      dataCompanyNames:[]
    };
  },
  props:["dataItems"],
  mounted() {
    this.dataItems.forEach((element) => { 
      this.dataLastNames.push(element.last)
      this.dataCompanyNames.push(element.company)
    })
    this.changeSearch()
  },
  components: {},
  methods: {
    changeSearch() {
      this.searchPlace.dataToSuggest = this.searchPlace.value === "last" ? this.dataLastNames : this.dataCompanyNames
    },
    search() {
      const regex = new RegExp(`^${this.searchWord}`, "i");
      var searchResult = this.$db
        .get("users")
        .filter((item) => regex.test(item[this.searchPlace.value]))
        .sortBy("last")
        .value();
      this.$emit("searchResult", searchResult);
    },
  },
};
</script>
<style lang="scss">
.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  &__input {
    max-width: 400px;
  }
}
</style>
