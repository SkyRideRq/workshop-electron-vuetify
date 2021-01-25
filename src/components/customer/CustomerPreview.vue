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
          <DisplayData :data="adressData" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import DisplayData from "../display/DisplayData";
export default {
  name: "CustomerPreview",
  components: {
    DisplayData,
  },
  data: () => {
    return {
      dialog: false,
      adressData: [],
    };
  },
  created() {
    this.adressData = {
      company: this.data.company,
      adress: this.data.adress,
      phone: this.data.phone,
      mail: this.data.mail,
    };
    console.log(this.adressData);
  },
  props: ["data"],
};
</script>
