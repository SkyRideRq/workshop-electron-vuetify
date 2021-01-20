<template>
<v-form>
  <v-text-field label="Nazwisko" v-model="data.last"></v-text-field>
  <v-text-field label="Imię" v-model="data.first"></v-text-field>
  <v-text-field label="Nazwa Firmy" v-model="data.company"></v-text-field>
  <v-text-field label="Adres" v-model="data.adress"></v-text-field>
  <v-text-field label="Telefon" v-model="data.phone"></v-text-field>
  <v-text-field label="E-mail" v-model="data.mail"></v-text-field>
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
  components: {

  },
  props:["data"]
};
</script>