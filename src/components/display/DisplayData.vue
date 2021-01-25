<template>
  <v-list>
    <v-row>
      <v-col>
        <v-list-item
          v-for="(item, name, index) in Object.fromEntries(
            Object.entries(data).slice(0, 4)
          )"
          :key="index + data.mail"
        >
          <v-list-item-icon>
            <v-icon>{{ icons[name].icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
            <v-list-item-subtitle>{{ icons[name].text }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col v-if="Object.values(data).length > 4">
        <v-list-item
          v-for="(item, name, index) in Object.fromEntries(
            Object.entries(data).slice(4, 8)
          )"
          :key="index + data.mail"
        >
          <v-list-item-icon>
            <v-icon>{{ icons[name].icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
            <v-list-item-subtitle>{{ icons[name].text }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-list>
</template>
<script>
export default {
  name: "DisplayData",
  data: () => {
    return {
      icons: {
        phone: {
          icon: "mdi-phone",
          text: "Telefon",
        },
        mail: {
          icon: "mdi-email",
          text: "E-mail",
        },
        adress: {
          icon: "mdi-google-maps",
          text: "Adres",
        },
        company: {
          icon: "mdi-domain",
          text: "Nazwa firmy",
        },
        type: {
          icon: "mdi-cog",
          text: "Typ urządzenia",
        },
        serialNumber: {
          icon: "mdi-numeric",
          text: "Numer seryjny",
        },
        name: {
          icon: "mdi-account",
          text: "Właściciel",
        },
      },
    };
  },
  components: {},
  props: ["data"],
  created() {
    // console.log(this.data);
    // console.log(this.data.slice(0, 1));
  },
};
</script>
