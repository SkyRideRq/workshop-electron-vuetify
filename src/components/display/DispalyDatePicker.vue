<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Wybierz datę przyjęcia:
        </v-card-title>

        <v-date-picker
          v-model="picker"
          show-adjacent-months
          locale="pl-pl"
        ></v-date-picker>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "DispalyDatePicker",
  data: () => {
    return {
      picker: null,
      dialog: false,
    };
  },
  components: {},
};
</script>
