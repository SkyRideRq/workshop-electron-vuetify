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
              :date="
                data.registered
                  ? new Date(data.registered).toISOString().substr(0, 10)
                  : undefined
              "
              @changeDate="changeRegisteredDate"
            />
          </v-col>
          <v-col>
            <b>Data oddania:</b>
            <DispalyDatePicker
              :date="
                data.returned
                  ? new Date(data.returned).toISOString().substr(0, 10)
                  : undefined
              "
              @changeDate="changeReturnedDate"
            />
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col>
            <b>Koszt pracy:</b>
            <DisplayTextField
              :data="{
                data: data.workCost,
                label: '',
                type: 'number',
                appendText: 'zł',
              }"
              @changeData="changeWorkCost"
            />
          </v-col>
          <v-col>
            <b>Koszt części:</b>
            <DisplayTextField
              :data="{
                data: data.partCost,
                label: '',
                type: 'number',
                appendText: 'zł',
              }"
              @changeData="changePartCost"
            />
          </v-col>
          <v-col>
            <b>Koszt całkowity:</b>
            <p class="mt-5">
              {{ Number(data.workCost) + Number(data.partCost) }} zł
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <b>Opis skrócony:</b>
            <DisplayTextField
              :data="{
                data: data.shortNotes,
                type: 'text',
              }"
              @changeData="changeShortNotes"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <b>Zdjęcia:</b>
            <v-row>
              <v-col v-for="(item, index) in data.photos" :key="item + index">
                <DisplayImageDialog :data="item" />
              </v-col>
            </v-row>
            <v-row>
              <v-col> </v-col>
            </v-row>
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
  </v-container>
</template>

<script>
import DisplayData from "../components/display/DisplayData";
import DispalyDatePicker from "../components/display/DisplayDatePicker";
import DisplayTextField from "../components/display/DisplayTextField";
import DisplayImageDialog from "../components/display/DisplayImageDialog";

export default {
  name: "ProductPage",
  components: {
    DisplayData,
    DispalyDatePicker,
    DisplayTextField,
    DisplayImageDialog,
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
  },
  methods: {
    handleHide() {
      this.visible = false;
    },
    changeRegisteredDate(value) {
      this.data.registered = value;
      this.changeData(value, "registered");
    },
    changeReturnedDate(value) {
      this.data.returned = value;
      this.changeData(value, "returned");
    },

    changeData(value, place) {
      this.$db
        .get("users")
        .find({ guid: this.$route.params.id })
        .get("children")
        .find({ guid: this.$route.params.id1 })
        .get("children")
        .find({ guid: this.$route.params.id2 })
        .get(place)
        .assign(value)
        .write();
    },
    changeWorkCost(value) {
      this.data.workCost = value;
      this.changeData(Number(value), "workCost");
    },
    changePartCost(value) {
      this.data.partCost = value;
      this.changeData(Number(value), "partCost");
    },
    changeShortNotes(value) {
      this.data.shortNotes = value;
      this.changeData(Number(value), "shortNotes");
    },
  },
};
</script>
