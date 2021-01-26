<template>
  <v-form>
    <v-row>
      <v-col>
        <div class="d-flex">
          <v-text-field
            label="Nazwisko"
            v-model="data.last"
            :disabled="c1"
            height="20"
          ></v-text-field>
          <v-btn icon large @click="c1 = !c1">
            <v-icon :color="c1 ? '' : 'primary'">mdi-pencil</v-icon>
          </v-btn>
        </div>
        <div class="d-flex">
          <v-text-field
            label="Imię"
            v-model="data.first"
            :disabled="c2"
            height="20"
          ></v-text-field>
          <v-btn icon large @click="c2 = !c2">
            <v-icon :color="c2 ? '' : 'primary'">mdi-pencil</v-icon>
          </v-btn>
        </div>
        <div class="d-flex">
          <v-text-field
            label="Nazwa Firmy"
            v-model="data.company"
            :disabled="c3"
            height="20"
          ></v-text-field>
          <v-btn icon large @click="c3 = !c3">
            <v-icon :color="c3 ? '' : 'primary'">mdi-pencil</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col>
        <div class="d-flex">
          <v-text-field
            label="Adres"
            v-model="data.adress"
            :disabled="c4"
            height="20"
          ></v-text-field>
          <v-btn icon large @click="c4 = !c4">
            <v-icon :color="c4 ? '' : 'primary'">mdi-pencil</v-icon>
          </v-btn>
        </div>
        <div class="d-flex">
          <v-text-field
            label="Telefon"
            v-model="data.phone"
            :disabled="c5"
            height="20"
          ></v-text-field>
          <v-btn icon large @click="c5 = !c5">
            <v-icon :color="c5 ? '' : 'primary'">mdi-pencil</v-icon>
          </v-btn>
        </div>
        <div class="d-flex">
          <v-text-field
            label="E-mail"
            v-model="data.mail"
            :disabled="c6"
            height="20"
          ></v-text-field>
          <v-btn icon large @click="c6 = !c6">
            <v-icon :color="c6 ? '' : 'primary'">mdi-pencil</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
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
      <v-btn
        color="success"
        class="rounded-0 rounded-l"
        @click="saveData($event)"
        type="submit"
      >
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
  name: "CustomerDataEdit",
  data: () => {
    return {
      // data: [],
      controll: true,
      c1: true,
      c2: true,
      c3: true,
      c4: true,
      c5: true,
      c6: true,
      confirmed: false,
    };
  },
  components: {},
  props: ["data"],
  created() {
    if (this.data.last === "") {
      this.c1 = false;
    }
    if (this.data.first === "") {
      this.c2 = false;
    }
    if (this.data.company === "") {
      this.c3 = false;
    }
    if (this.data.adress === "") {
      this.c4 = false;
    }
    if (this.data.phone === "") {
      this.c5 = false;
    }
    if (this.data.mail === "") {
      this.c6 = false;
    }
  },
  methods: {
    confirmation() {
      for (var i = 1; i < 7; i++) {
        this["c" + i] = true;
      }
      this.confirmed = true;
    },
    saveData(event) {
      event.preventDefault();
      this.data.name = this.data.last + " " + this.data.first;
      this.$emit("dataToChange", this.data);
      // console.log(this.data);
      this.confirmed = false;
    },
  },
};
</script>
