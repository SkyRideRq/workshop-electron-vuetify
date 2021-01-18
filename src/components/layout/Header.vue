<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
    v-resize="onResize"
  >
    <v-row class="ma-0 d-flex align-center">
      <div class=" ">
        <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
          <v-icon v-if="value">
            mdi-view-quilt
          </v-icon>

          <v-icon v-else>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </div>
      <v-toolbar-title
        class="font-weight-light text-capitalize"
        v-text="$route.name"
      />
      <v-spacer />

      <div class="d-flex pt-2" v-if="desktop">
        <v-list>
          <v-list-item><v-btn @click="addData">1</v-btn> </v-list-item>
          <v-list-item> </v-list-item>
        </v-list>
      </div>
      <div v-else>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" icon class="mr-4">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item> </v-list-item>
            <v-list-item> </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-row>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "TheHeader",
  data: () => ({
    desktop: true,
    dialog: false,
  }),
  props: {
    links: null,
    value: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  mounted() {
    this.onResize();
  },
  computed: {
    ...mapGetters({}),
    ...mapState(["drawer"]),
  },
  methods: {
    ...mapMutations({
      setDrawer: "setDrawer",
    }),
    onResize() {
      window.innerWidth >= this.$vuetify.breakpoint.thresholds.xs
        ? (this.desktop = true)
        : (this.desktop = false);
    },

    addData() {
      console.log(this.$db.getState());
      
      console.log(this.$db.find("products").value());
      this.$db.defaults({ products: [] }).write();
      this.$db
        // .find("products")
        .get("products")
        .push({ id: 1, title: "lowdb is awesome" })
        .write();
        // .update();

      // this.$db.set("products", "typicode").write();
      // .get("products")
      // .push({ id: 1, title: "lowdb is awesome" })
      // .update();
      console.log('wynik')
      console.log(this.$db.getState());
    },
  },
};
</script>
