<template>
  <v-container>
    <h1 class="ml-4">{{ data.name }}</h1>
    <v-row>
      <v-col>
        <DisplayData :data="adressData" />
      </v-col>
      <v-col class="mr-2">
        <CustomerDataEdit :data="dataToEdit" @dataToChange="changeData" />
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <DisplayTree :items="items" />
    <ProductAdd />
  </v-container>
</template>
<script>
import DisplayData from "../components/display/DisplayData";
import CustomerDataEdit from "../components/customer/CustomerDataEdit";
import DisplayTree from "../components/display/DisplayTree";
import ProductAdd from "../components/product/ProductAdd";
export default {
  name: "CustomerPage",
  data: () => {
    return {
      data: [],
      adressData: {},
    };
  },
  components: {
    DisplayData,
    CustomerDataEdit,
    DisplayTree,
    ProductAdd,
  },
  created() {
    // console.log(this.$route);
    this.data = this.$db
      .get("users")
      .find({ guid: this.$route.params.id })
      .value();
    // console.log(this.data);

    this.adressData = {
      // name: this.data.name,
      // last: this.data.last,
      // first: this.data.first,
      company: this.data.company,
      adress: this.data.adress,
      phone: this.data.phone,
      mail: this.data.mail,
    };
    this.dataToEdit = {
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
      this.adressData = {
        // name: this.data.name,
        // last: this.data.last,
        // first: this.data.first,
        company: value.company,
        adress: value.adress,
        phone: value.phone,
        mail: value.mail,
      };

      // console.log("---value");
      // console.log(value);
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
