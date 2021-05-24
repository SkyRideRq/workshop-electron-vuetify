<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :prepend-icon="$icons.calendar.icon"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="changeDate" scrollable locale="pl-pl">
      <v-spacer></v-spacer>
      <div class="d-flex justify-end">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              type="submit"
              v-bind="attrs"
              v-on="on"
              @click="saveDate()"
              color="success"
              class="rounded-0 rounded-l"
            >
              <v-icon>{{ $icons.agree.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $icons.agree.text }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="menu = false"
              color="error"
              class="rounded-0 rounded-l"
            >
              <v-icon>{{ $icons.disagree.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $icons.disagree.text }}</span>
        </v-tooltip>
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
      changeDate: undefined,
    };
  },
  components: {},
  props: ["date"],
  created() {
    this.changeDate = this.date;
  },
  methods: {
    saveDate() {
      this.$emit("changeDate", this.changeDate);
      this.menu = false;
    },
  },
};
</script>
