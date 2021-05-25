<template>
  <div class="text-center mt-5">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ma-2"
          color="primary"
          v-bind="attrs"
          v-on="on"
          @click="AddItem()"
          large
          fab
        >
          <v-icon x-large>{{ $icons.add.icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ $icons.add.text }} naprawę</span>
    </v-tooltip>
  </div>
</template>
<script>
import mongoObjectId from "@/mixins/mongoObjectId.js";
import uuidv4 from "@/mixins/uuidv4.js";
export default {
  name: "RepairAdd",
  mixins: [mongoObjectId, uuidv4],
  methods: {
    AddItem() {
      var guid = this.uuidv4();
      var id = this.mongoObjectId();

      var newRepair = {
        id: id,
        guid: guid,
        type: "repair",
        registered: "",
        returned: "",
        partCost: "",
        workCost: "",
        link: this.$route.params.id + "/" + this.$route.params.id1 + "/" + guid,
        parentLink: this.$route.params.id + "/" + this.$route.params.id1,
        name: "",
        photos: [],
        shortNotes: "",
        notes: "",
        partList: [],
      };
      this.$db
        .get("users")
        .find({ guid: this.$route.params.id })
        .get("children")
        .find({ guid: this.$route.params.id1 })
        .get("children")
        .push(newRepair)
        .write();
      this.$router.push("/");
      this.$router.push(newRepair.link);
    },
  },
};
</script>
