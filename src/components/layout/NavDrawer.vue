<template>
  <v-navigation-drawer
    :right="$vuetify.rtl"
    mobile-breakpoint="960"
    v-model="drawer"
    app
  >
    <div class="d-flex align-center ml-4" style="height:75px">
      <h2>Warsztat DB</h2>
    </div>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="(item, index) in items"
        :key="item.title"
        :to="item.to"
        link
        :class="{
          'primary white--text v-list-item--active': index === activeItem,
        }"
        @click="selectItem(index)"
      >
        <!-- active-class="primary white--text" -->
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-divider class="mt-auto"></v-divider>
      <div class="ma-5">
        <v-switch
          v-model="$vuetify.theme.dark"
          class="ma-0 pa-0"
          color="primary"
          hide-details
          label="Dark Mode"
        />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "TheNavDrawer",

  props: {},
  data: () => {
    return {
      activeItem: null,
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Panel Główny",
          to: "/",
          name: "dashboard",
        },
        {
          icon: "mdi-account",
          title: "Klienci",
          to: "/klienci",
          name: "Klienci",
        },
        {
          icon: "mdi-hand-saw",
          title: "Stihl",
          to: "/Stihl",
          name: "Stihl",
        },
        {
          icon: "mdi-robot-mower",
          title: "Kosiarki",
          to: "/Kosiarki",
          name: "Kosiarki",
        },
        {
          icon: "mdi-bike",
          title: "Rowery",
          to: "/Rowery",
          name: "Rowery",
        },
        {
          icon: "mdi-wrench",
          title: "Naprawy",
          to: "/Naprawy",
          name: "Naprawy",
        },
      ],
    };
  },
  mounted() {
    if (this.items.length > 0)
      this.items.forEach((element, index) => {
        element.name ===
        window.location.pathname.substring(
          window.location.pathname.lastIndexOf("/") + 1
        )
          ? (this.activeItem = index)
          : (this.activeItem = null);
      });
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("setDrawer", val);
      },
    },
  },
  methods: {
    selectItem(i) {
      this.activeItem = i;
    },
  },
};
</script>
