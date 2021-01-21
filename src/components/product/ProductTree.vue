<template>
  <v-treeview
    open-on-click
    hoverable
    activatable
    :items="items"
    class="product-tree"
  >
    <template slot="append" slot-scope="props">
      <div class="d-flex align-center product-tree__box">
        <div
          class="d-flex align-center product-tree__holder"
          v-if="props.item.type === 'repair'"
        >
          <p class="ma-0 pa-0 pr-3 product-tree__desc">
            <b>Opis skrócony:</b>
            {{ props.item.shortNotes }}
          </p>
          <p class="ma-0 pa-0 pr-3 product-tree__data">
            <b>Data przyjęcia:</b>
            {{ new Date(props.item.registered).toLocaleDateString() }}
          </p>
          <p class="ma-0 pa-0 pr-3 product-tree__data">
            <b>Data oddania:</b>
            {{ new Date(props.item.returned).toLocaleDateString() }}
          </p>
        </div>

        <v-btn @click="changeLink($event, props.item.link)">
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
  methods: {
    changeLink($event, link) {
      $event.stopPropagation();
      console.log(link);
      this.$router.push({
        path: "/",
      });
      this.$router.push({
        path: link,
      });
    },
  },
};
</script>
<style>
.product-tree .v-treeview-node__append {
  flex: 8;
  justify-content: flex-end;
  display: flex;
}
.product-tree__box {
  width: 100%;
  justify-content: flex-end;
}
.product-tree__holder {
  flex: 1;
}
.product-tree__desc {
  width: 60%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.product-tree__data {
  width: 20%;
}
.v-treeview-node__label {
  font-weight: 700;
}
.v-treeview-node__children {
  position: relative;
}
.v-treeview-node__children::before {
  content: "";
  width: 2px;
  height: 100%;
  position: absolute;
  top: -23px;
  left: 19px;
  background-color: rgba(0, 0, 0, 0.2);
}
.v-treeview-node__children .v-treeview-node {
  position: relative;
}
.v-treeview-node__children .v-treeview-node::before {
  content: "";
  height: 2px;
  width: 22px;
  position: absolute;
  top: 23px;
  left: 21px;
  background-color: rgba(0, 0, 0, 0.2);
}
.v-treeview-node__children .v-treeview-node__children {
  position: relative;
}
.v-treeview-node__children .v-treeview-node__children::before {
  left: 43px;
}
.v-treeview-node__children .v-treeview-node__children .v-treeview-node {
  position: relative;
}
.v-treeview-node__children .v-treeview-node__children .v-treeview-node::before {
  left: 45px;
}
</style>
