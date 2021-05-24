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
export default {
  name: "AddCustomer",
  components: {},
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
      console.log(newUser);
      this.$db
        .get("users")
        .push(newUser)
        .write();
      this.$router.push(newUser.link);
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
  },
};
</script>
