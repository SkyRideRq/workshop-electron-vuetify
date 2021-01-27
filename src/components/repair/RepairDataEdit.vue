<template>
  <v-form>
    <div class="d-flex">
      <v-text-field
        label="Nazwa urządzenia"
        v-model="data.name"
        :disabled="c1"
        height="20"
      ></v-text-field>
      <v-btn icon large @click="c1 = !c1">
        <v-icon :color="c1 ? '' : 'primary'">mdi-pencil</v-icon>
      </v-btn>
    </div>
    <div class="d-flex">
      <v-text-field
        label="Numer seryjny"
        v-model="data.serialNumber"
        :disabled="c2"
        height="20"
      ></v-text-field>
      <v-btn icon large @click="c2 = !c2">
        <v-icon :color="c2 ? '' : 'primary'">mdi-pencil</v-icon>
      </v-btn>
    </div>
    <div class="d-flex">
      <v-select
        :items="types"
        v-model="data.type"
        label="Typ urządzenia"
        :disabled="c3"
        height="20"
      ></v-select>
      <v-btn icon large @click="c3 = !c3">
        <v-icon :color="c3 ? '' : 'primary'">mdi-pencil</v-icon>
      </v-btn>
    </div>
    <v-btn
      color="primary"
      class="ml-auto d-block"
      @click="confirmation()"
      v-if="!confirmed"
      width="128"
    >
      Zapisz
    </v-btn>

    <div class="d-flex justify-end" v-if="confirmed">
      <v-btn color="success" class="rounded-0 rounded-l" @click="saveData()">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn
        color="error"
        class="rounded-0 rounded-r"
        @click="confirmed = !confirmed"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </v-form>
</template>
<script>
export default {
  name: "RepairDataEdit",
  data: () => {
    return {
      // data: [],
      controll: true,
      c1: true,
      c2: true,
      c3: true,
      confirmed: false,
      types: [
        {
          text: "Rower",
          value: "bike",
        },
        {
          text: "Stihl",
          value: "stihl",
        },
        {
          text: "Kosiarka",
          value: "mower",
        },
      ],
    };
  },
  components: {},
  props: ["data"],
  methods: {
    confirmation() {
      for (var i = 1; i < 7; i++) {
        this["c" + i] = true;
      }
      this.confirmed = true;
    },
    saveData() {
      this.$emit("dataToChange", this.data);
      console.log(this.data);
      this.confirmed = false;
    },
  },
};
</script>
