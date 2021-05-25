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
      <span>{{ $icons.add.text }} klienta</span>
    </v-tooltip>
  </div>
</template>
<script>
import mongoObjectId from "@/mixins/mongoObjectId.js";
import uuidv4 from "@/mixins/uuidv4.js";
export default {
  name: "AddCustomer",
  mixins: [mongoObjectId, uuidv4],
  data: () => {
    return {};
  },
  created() {},
  methods: {
    AddItem() {
      var guid = this.uuidv4();
      var id = this.mongoObjectId();

      var newUser = {
        guid: guid,
        id: id,
        first: "",
        last: "",
        name: "",
        company: "",
        phone: "",
        mail: "",
        type: "user",
        adress: "",
        registered: new Date(),
        link: guid,
        children: [],
      };

      this.$db
        .get("users")
        .push(newUser)
        .write();
      this.$router.push(newUser.link);
    },
  },
};
</script>
