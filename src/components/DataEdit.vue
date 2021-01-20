<template>
  <v-form>
    <v-text-field label="Nazwisko" v-model="data.last" :disabled="controll">
      <template v-slot:append>
        <v-fade-transition leave-absolute>
          <v-progress-circular
            v-if="loading"
            size="24"
            color="info"
            indeterminate
          ></v-progress-circular>
          <img
            v-else
            width="24"
            height="24"
            src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
            alt=""
          />
        </v-fade-transition>
      </template>
    </v-text-field>
    <v-text-field
      label="Imię"
      v-model="data.first"
      :disabled="controll"
    ></v-text-field>
    <v-text-field
      label="Nazwa Firmy"
      v-model="data.company"
      :disabled="controll"
    ></v-text-field>
    <v-text-field
      label="Adres"
      v-model="data.adress"
      :disabled="controll"
    ></v-text-field>
    <v-text-field
      label="Telefon"
      v-model="data.phone"
      :disabled="controll"
    ></v-text-field>
    <v-text-field
      label="E-mail"
      v-model="data.mail"
      :disabled="controll"
    ></v-text-field>
  </v-form>
</template>
<script>
export default {
  name: "DataEdit",
  data: () => {
    return {
      data: [],
    };
  },
  components: {},
  props: ["data"],
};
</script>
