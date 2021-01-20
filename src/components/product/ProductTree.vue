<template>
  <v-treeview open-on-click hoverable activatable :items="items">
    <template slot="append" slot-scope="props">
      <div class="d-flex align-center">
        <p class="ma-0 pa-0 pr-3">
          {{ props.item.registered }}
        </p>
        <v-btn @click="$event.stopPropagation()" :to="props.item.link">
          Szczegóły
        </v-btn>
      </div>
    </template>
  </v-treeview>
</template>

<script>
export default {
  name: "ProductTree",
  data: () => {
    return {
      // items: [],
    };
  },
  props: ["items"],
};
</script>
