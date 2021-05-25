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

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click="c1 = !c1" large icon>
                <v-icon :color="c1 ? '' : 'primary'">{{
                  $icons.edit.icon
                }}</v-icon>
              </v-btn>
            </template>
            <span>{{ $icons.edit.text }} nazwisko</span>
          </v-tooltip>
        </div>

        <div class="d-flex">
          <v-text-field
            label="Imię"
            v-model="data.first"
            :disabled="c2"
            height="20"
          ></v-text-field>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click="c2 = !c2" large icon>
                <v-icon :color="c2 ? '' : 'primary'">{{
                  $icons.edit.icon
                }}</v-icon>
              </v-btn>
            </template>
            <span>{{ $icons.edit.text }} imię</span>
          </v-tooltip>
        </div>
        <div class="d-flex">
          <v-text-field
            label="Nazwa Firmy"
            v-model="data.company"
            :disabled="c3"
            height="20"
          ></v-text-field>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click="c3 = !c3" large icon>
                <v-icon :color="c3 ? '' : 'primary'">{{
                  $icons.edit.icon
                }}</v-icon>
              </v-btn>
            </template>
            <span>{{ $icons.edit.text }} nazwę firmy</span>
          </v-tooltip>
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

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click="c4 = !c4" large icon>
                <v-icon :color="c4 ? '' : 'primary'">{{
                  $icons.edit.icon
                }}</v-icon>
              </v-btn>
            </template>
            <span>{{ $icons.edit.text }} adres</span>
          </v-tooltip>
        </div>
        <div class="d-flex">
          <v-text-field
            label="Telefon"
            v-model="data.phone"
            :disabled="c5"
            height="20"
          ></v-text-field>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click="c5 = !c5" large icon>
                <v-icon :color="c5 ? '' : 'primary'">{{
                  $icons.edit.icon
                }}</v-icon>
              </v-btn>
            </template>
            <span>{{ $icons.edit.text }} numer telefonu</span>
          </v-tooltip>
        </div>
        <div class="d-flex">
          <v-text-field
            label="E-mail"
            v-model="data.mail"
            :disabled="c6"
            height="20"
          ></v-text-field>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click="c6 = !c6" large icon>
                <v-icon :color="c6 ? '' : 'primary'">{{
                  $icons.edit.icon
                }}</v-icon>
              </v-btn>
            </template>
            <span>{{ $icons.edit.text }} adres e-mail</span>
          </v-tooltip>
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
  name: "CustomerDataEdit",
  data: () => {
    return {
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
    saveData() {
      this.data.name = this.data.last + " " + this.data.first;
      this.$emit("dataToChange", this.data);
      this.confirmed = false;
    },
  },
};
</script>
