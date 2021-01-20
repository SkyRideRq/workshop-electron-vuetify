<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary white--text mr-5" dark v-bind="attrs" v-on="on">
          Dane Adresowe
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2 px-4">
          {{ data.name }}
          <v-btn
            color="error"
            fab
            x-small
            class="ml-auto"
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <CustomerData :data="data" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CustomerData from "./CustomerData";

export default {
  name: "CustomerPreview",
  components: {
    CustomerData,
  },
  data: () => {
    return {
      dialog: false,
    };
  },

  props: ["data"],
};
</script>
