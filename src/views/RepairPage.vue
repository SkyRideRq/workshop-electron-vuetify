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
              :dataId="'registered'"
              @changeDate="changeDate"
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
              :dataId="'returned'"
              @changeDate="changeDate"
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
                dataId: 'workCost',
              }"
              @changeData="changeSpecificData"
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
                dataId: 'partCost',
              }"
              @changeData="changeSpecificData"
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
                dataId: 'shortNotes',
              }"
              @changeData="changeSpecificData"
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
      // visible: false,
      index: 1,
      pictures: [],
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

    const machineDataRest = {
      machineName: this.product.name,
      type: this.type,
      serialNumber: this.product.serialNumber,
    };
    const { name, company, phone, mail } = this.owner;
    this.machineData = { name, company, phone, mail, ...machineDataRest };

    this.data.photos.forEach((element) => {
      this.pictures.push("@/pictures/" + element);
    });
  },
  methods: {
    handleHide() {
      this.visible = false;
    },
    changeDate(value, name) {
      this.data[name] = value;
      this.changeData(value, name);
    },
    changeSpecificData(value, name) {
      this.data[name] = value;
      this.changeData(Number(value), name);
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
  },
};
</script>
