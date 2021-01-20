<template>
  <v-treeview open-on-click hoverable activatable :items="items">
    <template slot="append" slot-scope="props">
      <div class="d-flex align-center">
        <p class="ma-0 pa-0 pr-3">
          Data przyjęcia:
          {{ new Date(props.item.registered).toLocaleDateString() }}
        </p>
        <p class="ma-0 pa-0 pr-3" v-if="props.item.returned">
          Data oddania: {{ new Date(props.item.returned).toLocaleDateString() }}
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
  created() {},
  props: ["items"],
};
</script>
