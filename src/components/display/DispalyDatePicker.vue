<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" scrollable locale="pl-pl">
      <v-spacer></v-spacer>
      <div class="d-flex justify-end">
        <v-btn
          class="rounded-0 rounded-l"
          color="success"
          @click="$refs.menu.save(date)"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn class="rounded-0 rounded-r" color="error" @click="menu = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  name: "DispalyDatePicker",
  data: () => {
    return {
      picker: null,
      dialog: false,
      menu: false,
    };
  },
  components: {},
  props: ["date"],
};
</script>
