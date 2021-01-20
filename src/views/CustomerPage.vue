<template>
  <v-container>
    <h1 class="ml-4">{{ data.name }}</h1>
    <v-row>
      <v-col>
        <CustomerData :data="adressData" />
      </v-col>
      <v-col>
        <DataEdit :data="adressData" @dataToChange="changeData" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CustomerData from "../components/customer/CustomerData";
import DataEdit from "../components/DataEdit";
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
