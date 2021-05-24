<template>
  <v-container>
    <v-form ref="form" @submit="search($event)">
      <div class="search-box mt-5">
        <v-combobox
          v-model="searchPlace"
          :items="items"
          class="px-2 search-box__input"
          label="Szukaj po"
          disable-lookup
        ></v-combobox>

        <v-text-field
          :label="this.searchPlace.searchLabel"
          v-model="searchWord"
          class="px-2 search-box__input"
        ></v-text-field>

        <v-btn type="submit" color="primary" class="search-box__btn">
          Szukaj
        </v-btn>
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
    };
  },
  components: {},
  methods: {
    search(event) {
      event.preventDefault();

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
<style>
.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-box__input {
  max-width: 400px;
}

.search-box__btn {
}
</style>
