<template>
  <v-form>
    <div class="d-flex">
      <v-select
        :items="types"
        v-model="data.type"
        label="Typ urządzenia"
        :disabled="c1"
        height="20"
      ></v-select>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" @click="c1 = !c1" large icon>
            <v-icon :color="c1 ? '' : 'primary'">{{ $icons.edit.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $icons.edit.text }} typ</span>
      </v-tooltip>
    </div>
    <div class="d-flex">
      <v-text-field
        label="Nazwa urządzenia"
        v-model="data.name"
        :disabled="c2"
        height="20"
      ></v-text-field>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" @click="c2 = !c2" large icon>
            <v-icon :color="c2 ? '' : 'primary'">{{ $icons.edit.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $icons.edit.text }} nazwę</span>
      </v-tooltip>
    </div>
    <div class="d-flex">
      <v-text-field
        label="Numer seryjny"
        v-model="data.serialNumber"
        :disabled="c3"
        height="20"
      ></v-text-field>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" @click="c3 = !c3" large icon>
            <v-icon :color="c3 ? '' : 'primary'">{{ $icons.edit.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $icons.edit.text }} numer seryjny</span>
      </v-tooltip>
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
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            type="submit"
            v-bind="attrs"
            v-on="on"
            @click.prevent="saveData()"
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
            @click="confirmed = !confirmed"
            color="error"
            class="rounded-0 rounded-r"
          >
            <v-icon>{{ $icons.disagree.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $icons.disagree.text }}</span>
      </v-tooltip>
    </div>
  </v-form>
</template>
<script>
export default {
  name: "ProductDataEdit",
  data: () => {
    return {
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
  props: ["data"],
  created() {
    if (this.data.name === "") {
      this.c1 = false;
    }
    if (this.data.serialNumber === "") {
      this.c2 = false;
    }
    if (this.data.type === "") {
      this.c3 = false;
    }
  },
  methods: {
    confirmation() {
      for (var i = 1; i < 7; i++) {
        this["c" + i] = true;
      }
      this.confirmed = true;
    },
    saveData() {
      this.$emit("dataToChange", this.data);
      this.confirmed = false;
    },
  },
};
</script>
