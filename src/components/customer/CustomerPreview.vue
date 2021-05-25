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

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                @click="dialog = false"
                color="error"
                fab
                x-small
                class="ml-auto"
              >
                <v-icon>{{ $icons.close.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ $icons.close.text }}</span>
          </v-tooltip>
        </v-card-title>

        <v-card-text>
          <DisplayData :data="adressData" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// components
import DisplayData from "../display/DisplayData";
// mixins
import mountedAdressData from "@/mixins/mountedAdressData.js";
export default {
  name: "CustomerPreview",
  mixins: [mountedAdressData],
  components: {
    DisplayData,
  },
  data: () => {
    return {
      dialog: false,
      adressData: [],
    };
  },
  props: ["data"],
};
</script>
