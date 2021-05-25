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
      <span>{{ $icons.add.text }} produkt</span>
    </v-tooltip>
  </div>
</template>
<script>
import mongoObjectId from "@/mixins/mongoObjectId.js";
import uuidv4 from "@/mixins/uuidv4.js";
export default {
  name: "ProductAdd",
  mixins: [mongoObjectId, uuidv4],
  methods: {
    AddItem() {
      var guid = this.uuidv4();
      var id = this.mongoObjectId();

      var newProduct = {
        id: id,
        guid: guid,
        name: "",
        type: "",
        serialNumber: "",
        registered: new Date(),
        link: this.$route.params.id + "/" + guid,
        parentLink: this.$route.params.id,
        children: [],
      };
      this.$db
        .get("users")
        .find({ guid: this.$route.params.id })
        .get("children")
        .push(newProduct)
        .write();
      this.$router.push(newProduct.link);
    },
  },
};
</script>
