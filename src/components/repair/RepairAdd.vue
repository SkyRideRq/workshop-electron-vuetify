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
          <v-icon x-large>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Dodaj naprawę</span>
    </v-tooltip>
  </div>
</template>
<script>
export default {
  name: "RepairAdd",
  components: {},
  data: () => {
    return {};
  },
  created() {},
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
      console.log(newRepair);
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
    // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
    uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    // https://gist.github.com/solenoid/1372386
    mongoObjectId() {
      var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
      return (
        timestamp +
        "xxxxxxxxxxxxxxxx"
          .replace(/[x]/g, function() {
            return ((Math.random() * 16) | 0).toString(16);
          })
          .toLowerCase()
      );
    },
    // moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")
  },
};
</script>
