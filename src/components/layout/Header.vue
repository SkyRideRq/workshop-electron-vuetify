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
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-3"
          elevation="1"
          fab
          small
          @click="setDrawer(!drawer)"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon v-if="!drawer">
            {{ $icons.openMenu.icon }}
          </v-icon>
          <v-icon v-else>
            {{ $icons.closeMenu.icon }}
          </v-icon>
        </v-btn>
      </template>
      <span v-if="!drawer">{{ $icons.openMenu.text }}</span>
      <span v-else>{{ $icons.closeMenu.text }}</span>
    </v-tooltip>

    <!-- button for faking db -->
    <!-- <v-btn @click="addData()">1</v-btn> -->
    <v-toolbar-title
      class="font-weight-light text-capitalize"
      v-text="$route.name"
    />
    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          x-large
          v-bind="attrs"
          v-on="on"
          icon
          @click="back()"
          color="primary"
        >
          <v-icon>
            {{ $icons.backBtn.icon }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $icons.backBtn.text }}</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          x-large
          icon
          v-bind="attrs"
          v-on="on"
          @click="up()"
          color="primary"
        >
          <v-icon>
            {{ $icons.upBtn.icon }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $icons.upBtn.text }}</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          x-large
          icon
          v-bind="attrs"
          v-on="on"
          @click="saveDBtoDisk()"
          color="primary"
        >
          <v-icon>
            {{ $icons.saveDb.icon }}
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $icons.saveDb.text }}</span>
    </v-tooltip>

    <template slot="extension">
      <v-divider></v-divider>
    </template>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "TheHeader",
  data: () => {
    return {
      desktop: true,
      dialog: false,
    };
  },
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
          // Stating whether dialog operation was cancelled or not.
          // console.log(file.canceled);
          // if (!file.canceled) {
          //   console.log(file.filePath.toString());

          //   // Creating and Writing to the sample.txt file
          fs.copyFile("./db.json", file.filePath.toString(), function(err) {
            if (err) throw err;
          });
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    up() {
      var linkUp = "/";

      if (this.$route.params.id1) {
        linkUp = linkUp + this.$route.params.id;
      }
      if (this.$route.params.id2) {
        linkUp = linkUp + "/" + this.$route.params.id1;
      }
      if (this.$route.name != "Panel Główny") {
        this.$router.push(linkUp);
      }
    },
    back() {
      this.$router.go(-1);
    },
    addData() {
      // for building products db
      // console.log(this.$db.get('users').value());
      // var st = this.$db.get("users").value();
      // st.forEach((element) => {
      //   element.children.forEach((element) => {
      //     if (element.type === "mower") {
      //       this.$db
      //         .get("mowers")
      //         .push(element)
      //         .write();
      //     }
      //   });
      // });
      // repairs
      // var st = this.$db.get("bikes").value();
      // // // console.log(st)
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
<style lang="scss">
.v-toolbar {
  &__extension {
    padding: 0 !important;
  }
}
</style>
