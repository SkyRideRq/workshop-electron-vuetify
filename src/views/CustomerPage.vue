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
// components
import DisplayData from "@/components/display/DisplayData";
import CustomerDataEdit from "@/components/customer/CustomerDataEdit";
import DisplayTree from "@/components/display/DisplayTree";
import ProductAdd from "@/components/product/ProductAdd";
// mixins
import mountedAdressData from "@/mixins/mountedAdressData.js";
export default {
  name: "CustomerPage",
  data: () => {
    return {
      data: [],
      adressData: {},
    };
  },
  mixins: [mountedAdressData],
  components: {
    DisplayData,
    CustomerDataEdit,
    DisplayTree,
    ProductAdd,
  },
  created() {
    this.data = this.$db
      .get("users")
      .find({ guid: this.$route.params.id })
      .value();

    const { name, last, first, company, adress, phone, mail } = this.data;
    this.dataToEdit = { name, last, first, company, adress, phone, mail };

    this.items = this.data.children;
  },
  methods: {
    changeData(value) {
      const { company, adress, phone, mail } = value;
      this.adressData = { company, adress, phone, mail };

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
