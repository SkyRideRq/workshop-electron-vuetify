<template>
  <v-container>
    <h1 class="ml-4">{{ data.name }}</h1>
    <v-row>
      <v-col>
        <DisplayData :data="machineData" />
      </v-col>
      <v-col class="mr-2">
        <ProductDataEdit :data="dataToEdit" @dataToChange="changeData" />
      </v-col>
    </v-row>
    <v-divider class="mb-5 mt-0"></v-divider>

    <DisplayTree :items="items" />
  </v-container>
</template>

<script>
import DisplayTree from "../components/display/DisplayTree";
import DisplayData from "../components/display/DisplayData";
import ProductDataEdit from "../components/product/ProductDataEdit";
export default {
  name: "ProductPage",
  components: {
    DisplayTree,
    DisplayData,
    ProductDataEdit,
  },
  data: () => {
    return {
      data: [],
      type: "",
      owner: [],
      items: [],
      machineData: [],
    };
  },
  created() {
    console.log(this.$route);
    this.data = this.$db
      .get("users")
      .find({ guid: this.$route.params.id })
      .get("children")
      .find({ guid: this.$route.params.id1 })
      .value();
    this.owner = this.$db
      .get("users")
      .find({ guid: this.$route.params.id })
      .value();
    this.items = this.data.children;
    console.log(this.items);
    if (this.data.type === "stihl") {
      this.type = "Stihl";
    }
    if (this.data.type === "bike") {
      this.type = "Rower";
    }
    if (this.data.type === "mower") {
      this.type = "Kosiarka";
    }
    this.machineData = {
      type: this.type,
      serialNumber: this.data.serialNumber,
      name: this.owner.name,
      company: this.owner.company,
      phone: this.owner.phone,
      mail: this.owner.mail,
    };
    this.dataToEdit = {
      serialNumber: this.data.serialNumber,
      name: this.data.name,
      type: this.data.type,
    };
  },
  methods: {
    changeData(value) {
      this.machineData.type = value.type;
      if (value.type === "stihl") {
        this.machineData.type = "Stihl";
      }
      if (value.type === "bike") {
        this.machineData.type = "Rower";
      }
      if (value.type === "mower") {
        this.machineData.type = "Kosiarka";
      }
      this.machineData.serialNumber = value.serialNumber;

      this.data.name = value.name;

      this.$db
        .get("users")
        .find({ guid: this.$route.params.id })
        .get("children")
        .find({ guid: this.$route.params.id1 })
        .assign(value)
        .write();
    },
  },
};
</script>
