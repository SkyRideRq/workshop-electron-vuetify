<template>
  <v-container>
    <v-text-field label="Szukaj"></v-text-field>
    <v-treeview open-on-click hoverable activatable :items="items">
      <template slot="append" slot-scope="props">
        <div class="d-flex align-center">
          <p class="ma-0 pa-0 pr-3" v-if="props.item.registered">
            {{ props.item.registered }}
          </p>
          <router-link :to="props.item.link">Szczegóły</router-link>
        </div>
      </template>
    </v-treeview>
  </v-container>
</template>
<script>
import db from "@/db/db";
export default {
  name: "Customers",
  components: {},
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
