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
            <DispalyDatePicker
              :date="new Date(data.registered).toISOString().substr(0, 10)"
            />
          </v-col>
          <v-col>
            <b>Data oddania:</b>
            <DispalyDatePicker
              :date="new Date(data.returned).toISOString().substr(0, 10)"
            />
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col>
            <b>Koszt pracy:</b>
            {{ data.workCost }} zł
            <div class="d-flex">
              <v-text-field
                label="Nazwa urządzenia"
                v-model="data.workCost"
                :disabled="c1"
                height="20"
              ></v-text-field>
              <v-btn icon large @click="c1 = !c1">
                <v-icon :color="c1 ? '' : 'primary'">mdi-pencil</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col>
            <b>Koszt części:</b>
            {{ data.partCost }} zł
          </v-col>
          <v-col>
            <b>Koszt całkowity:</b>
            {{ data.workCost + data.partCost }} zł
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
        <v-row>
          <v-col>
            {{ data.photos }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider class="mb-5 mt-0"></v-divider>
    <v-row>
      <v-col> {{ data.partList }} </v-col>
      <v-col>
        <v-textarea
          label="Notatki"
          :value="data.notes"
          hint="Miejsce na notatki związane z naprawą"
          rows="10"
          auto-grow
        ></v-textarea>
      </v-col>
    </v-row>
    {{ data }}
  </v-container>
</template>

<script>
import DisplayData from "../components/display/DisplayData";
import DispalyDatePicker from "../components/display/DispalyDatePicker";

export default {
  name: "ProductPage",
  components: {
    DisplayData,
    DispalyDatePicker,
  },
  data: () => {
    return {
      data: [],
      type: "",
      owner: [],
      product: {},
      c1: false,
    };
  },
  created() {
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
      machineName: this.product.name,
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
