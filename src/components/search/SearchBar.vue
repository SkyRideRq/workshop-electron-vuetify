<template>
  <v-container class="d-flex">
    <v-text-field label="Szukaj" v-model="searchString"></v-text-field>
    <v-btn @click="search(searchString)">Szukaj</v-btn>
  </v-container>
</template>

<script>
import db from "@/db/db";
export default {
  name: "SearchBar",
  data: () => {
    return {
      searchString: '',
    };
  },
  components: {},
  methods: {
    search(word){
      console.log('go')
      console.log(word)
      console.log(this.$db.keys(db))

      const regex = new RegExp(`\\b${word}`, 'i');

      var show = this.$db.get('users')
      .filter(item => regex.test(item.name))
      .value()

      console.log(show)
      console.log(this.$db.getState())
    }
    
  }
};
</script>
