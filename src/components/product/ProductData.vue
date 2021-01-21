<template>
  <v-list>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-domain</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ data.company }}</v-list-item-title>
        <v-list-item-subtitle>Nazwa firmy</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-google-maps</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ data.adress }}</v-list-item-title>
        <v-list-item-subtitle>Adres</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-phone</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ data.phone }}</v-list-item-title>
        <v-list-item-subtitle>Telefon</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-email</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ data.mail }}</v-list-item-title>
        <v-list-item-subtitle>E-mail</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  name: "ProductData",
  components: {},
  props: ["data"],
};
</script>
