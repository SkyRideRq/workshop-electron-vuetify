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
            <DispalyTextField
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
            zł
            <DispalyTextField
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
            <p>{{ Number(data.workCost) + Number(data.partCost) }} zł</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <b>Opis skrócony:</b>
            <v-text-field
              label=""
              :value="data.shortNotes"
              hint="Krótki opis naprawy"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <b>Zdjęcia:</b>
            <v-row>
              <v-col v-for="(item, index) in data.photos" :key="item + index">
                {{ item }}

                <v-img
                  max-height="150"
                  max-width="250"
                  :src="'app://' + item"
                ></v-img>
              </v-col>
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
import DispalyDatePicker from "../components/display/DispalyDatePicker";

import DispalyTextField from "../components/display/DisplayTextField";

export default {
  name: "ProductPage",
  components: {
    DisplayData,
    DispalyDatePicker,
    DispalyTextField,
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
  },
  methods: {
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
  },
};
</script>
