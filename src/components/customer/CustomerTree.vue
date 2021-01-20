<template>
  <v-treeview open-on-click hoverable activatable :items="items">
    <template slot="append" slot-scope="props">
      <div class="d-flex align-center">
        <p class="ma-0 pa-0 pr-3" v-if="props.item.photos">
          {{ new Date(props.item.registered).toLocaleDateString() }}
        </p>
        <CustomerPreview v-if="props.item.type === 'user'" :data="props.item" />
        <v-btn @click="$event.stopPropagation()" :to="props.item.link">
          Szczegóły
        </v-btn>
      </div>
    </template>
  </v-treeview>
</template>

<script>
import CustomerPreview from "./CustomerPreview";

export default {
  name: "CustomerTree",
  data: () => {
    return {
      // items: [],
    };
  },
  components: {
    CustomerPreview,
  },

  props: ["items"],
};
</script>
