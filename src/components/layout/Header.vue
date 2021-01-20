<template>
  <v-app-bar
    id="app-bar"
    fixed
    app
    color="white"
    flat
    height="75"
    elevate-on-scroll
    v-resize="onResize"
    extension-height="1"
  >
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon v-if="!drawer">
        mdi-menu
      </v-icon>
      <v-icon v-else>
        mdi-menu-open
      </v-icon>
    </v-btn>
    <!-- <v-btn @click="addData()">1</v-btn> -->
    <v-toolbar-title
      class="font-weight-light text-capitalize"
      v-text="$route.name"
    />
    <v-spacer></v-spacer>
    <v-btn x-large icon @click="saveDBtoDisk()" color="primary">
      <v-icon>
        mdi-content-save
      </v-icon>
    </v-btn>
    <template slot="extension">
      <v-divider></v-divider>
    </template>
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
    saveDBtoDisk() {
      // https://www.geeksforgeeks.org/save-files-in-electronjs/
      const electron = require("electron");
      const path = require("path");
      const fs = require("fs");
      // Importing dialog module using remote
      const dialog = electron.remote.dialog;
      // Resolves to a Promise<Object>
      dialog
        .showSaveDialog({
          title: "Select the File Path to save",
          defaultPath: path.join(
            __dirname,
            "./db-" +
              new Date().getDate() +
              "-" +
              new Date().getMonth() +
              "-" +
              new Date().getFullYear() +
              ".json"
          ),
          buttonLabel: "Save",
          properties: [],
        })
        .then((file) => {
          console.log(path.join("./db.json"));
          console.log(file);
          // Stating whether dialog operation was cancelled or not.
          // console.log(file.canceled);
          // if (!file.canceled) {
          //   console.log(file.filePath.toString());

          //   // Creating and Writing to the sample.txt file
          fs.copyFile(
            "./db.json",
            file.filePath.toString(),
            "This is a Sample File",
            function(err) {
              if (err) throw err;
              console.log("Saved!");
            }
          );
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addData() {
      // console.log(this.$db.getState());
      // console.log(this.$db.find("products").value());
      // this.$db.defaults({ products: [] }).write();
      // this.$db
      //   // .find("products")
      //   .get("products")
      //   .push({ id: 1, title: "lowdb is awesome" })
      //   .write();
      //   // .update();
      // // this.$db.set("products", "typicode").write();
      // // .get("products")
      // // .push({ id: 1, title: "lowdb is awesome" })
      // // .update();
      // console.log('wynik')
      // for building products db
      // console.log(this.$db.get('users').value());
      // var st = this.$db.get("users").value();
      // st.forEach((element) => {
      //   element.children.forEach((element) => {
      //     if (element.type === "bike") {
      //       this.$db
      //         .get("bikes")
      //         .push(element)
      //         .write();
      //     }
      //   });
      // });
      // this.$db.get('stihl')
      // repairs
      // var st = this.$db.get("mowers").value();
      // // console.log(st)
      // st.forEach((element) => {
      //   element.children.forEach((element) => {
      //     // if(element.children==='mower')
      //     // element.children.forEach(element => {
      //     //   // console.log(element)
      //     this.$db
      //       .get("repairs")
      //       .push(element)
      //       .write();
      //     // })
      //   });
      // });
    },
  },
};
</script>
<style>
.v-toolbar__extension {
  padding: 0 !important;
}
</style>
