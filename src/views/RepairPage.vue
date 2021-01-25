<template>
  <v-container>
    <h1 class="ml-4">{{ data.name }}</h1>
    <v-row>
      <v-col>
        <DisplayData :data="machineData" />
      </v-col>
      <v-col class="mr-2">
        <v-row>
          <v-col>
            <b>Data przyjęcia:</b>
            {{ new Date(data.registered).toLocaleDateString() }}
          </v-col>
          <v-col>
            <b>Data oddania:</b>
            {{ new Date(data.returned).toLocaleDateString() }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              label="Opis skrócony"
              :value="data.shortNotes"
              hint="Krótki opis naprawy"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row></v-row>
      </v-col>
    </v-row>
    <v-divider class="mb-5 mt-0"></v-divider>
    {{ data }}
  </v-container>
</template>

<script>
import DisplayData from "../components/display/DisplayData";

export default {
  name: "ProductPage",
  components: {
    DisplayData,
  },
  data: () => {
    return {
      data: [],
      type: "",
      owner: [],
      product: {},
    };
  },
  created() {
    console.log(this.$route);
    this.data = this.$db
      .get("users")
      .find({ guid: this.$route.params.id })
      .get("children")
      .find({ guid: this.$route.params.id1 })
      .get("children")
      .find({ guid: this.$route.params.id2 })
      .value();

    this.owner = this.$db
      .get("users")
      .find({ guid: this.$route.params.id })
      .value();
    this.product = this.$db
      .get("users")
      .find({ guid: this.$route.params.id })
      .get("children")
      .find({ guid: this.$route.params.id1 })
      .value();

    if (this.product.type === "stihl") {
      this.type = "Stihl";
    }
    if (this.product.type === "bike") {
      this.type = "Rower";
    }
    if (this.product.type === "mower") {
      this.type = "Kosiarka";
    }
    this.machineData = {
      type: this.type,
      serialNumber: this.product.serialNumber,
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
  // methods: {
  //   changeData(value) {
  //     this.machineData.type = value.type;
  //     if (value.type === "stihl") {
  //       this.machineData.type = "Stihl";
  //     }
  //     if (value.type === "bike") {
  //       this.machineData.type = "Rower";
  //     }
  //     if (value.type === "mower") {
  //       this.machineData.type = "Kosiarka";
  //     }
  //     this.machineData.serialNumber = value.serialNumber;

  //     this.data.name = value.name;

  //     this.$db
  //       .get("users")
  //       .find({ guid: this.$route.params.id })
  //       .get("children")
  //       .find({ guid: this.$route.params.id1 })
  //       .assign(value)
  //       .write();
  //   },
  // },
};
</script>
