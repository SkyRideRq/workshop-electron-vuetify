<template>
  <v-container>
    <h1 class="ml-4">{{ data.name }}</h1>
    <v-row>
      <v-col>
        <CustomerData :data="adressData" />
      </v-col>
      <v-col class="mr-2">
        <DataEdit :data="adressData" @dataToChange="changeData" />
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <DisplayTree :items="items" />
  </v-container>
</template>
<script>
import CustomerData from "../components/customer/CustomerData";
import DataEdit from "../components/DataEdit";
import DisplayTree from "../components/display/DisplayTree";

export default {
  name: "CustomerPage",
  data: () => {
    return {
      data: [],
      adressData: {},
    };
  },
  components: {
    CustomerData,
    DataEdit,
    DisplayTree,
  },
  created() {
    console.log(this.$route);
    this.data = this.$db
      .get("users")
      .find({ guid: this.$route.params.id })
      .value();
    console.log(this.data);

    this.adressData = {
      name: this.data.name,
      last: this.data.last,
      first: this.data.first,
      company: this.data.company,
      adress: this.data.adress,
      phone: this.data.phone,
      mail: this.data.mail,
    };
    this.items = this.data.children;
  },
  methods: {
    changeData(value) {
      this.adressData = value;
      this.data.name = value.last + " " + value.first;
      this.$db
        .get("users")
        .find({ guid: this.$route.params.id })
        .assign(value)
        .write();
    },
  },
};
</script>
