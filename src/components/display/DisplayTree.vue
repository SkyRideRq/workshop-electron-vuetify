<template>
  <v-treeview
    open-on-click
    hoverable
    activatable
    :items="items"
    class="display-tree"
  >
    <template slot="append" slot-scope="props">
      <div class="d-flex align-center display-tree__box">
        <div
          class="d-flex align-center display-tree__holder"
          v-if="props.item.type === 'repair'"
        >
          <p class="ma-0 pa-0 pr-3 display-tree__desc">
            <b>Opis skrócony:</b>
            {{ props.item.shortNotes }}
          </p>
          <p class="ma-0 pa-0 pr-3 display-tree__data">
            <b>Data przyjęcia:</b>
            {{ new Date(props.item.registered).toLocaleDateString() }}
          </p>
          <p class="ma-0 pa-0 pr-3 display-tree__data">
            <b>Data oddania:</b>
            {{ new Date(props.item.returned).toLocaleDateString() }}
          </p>
        </div>
        <CustomerPreview v-if="props.item.type === 'user'" :data="props.item" />
        <v-btn @click="changeLink($event, props.item.link)">
          Szczegóły
        </v-btn>
      </div>
    </template>
  </v-treeview>
</template>

<script>
import CustomerPreview from "../customer/CustomerPreview";

export default {
  name: "DisplayTree",
  data: () => {
    return {
      // items: [],
    };
  },
  components: {
    CustomerPreview,
  },

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
.display-tree .v-treeview-node__append {
  flex: 8;
  justify-content: flex-end;
  display: flex;
}
.display-tree__box {
  width: 100%;
  justify-content: flex-end;
}
.display-tree__holder {
  flex: 1;
}
.display-tree__desc {
  width: 60%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.display-tree__data {
  width: 20%;
}
.v-treeview > .v-treeview-node:nth-of-type(2n) {
  background-color: rgba(0, 0, 0, 0.1);
}
/* .v-treeview > .v-treeview-node {
  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
} */
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

.v-treeview-node__children .v-treeview-node:last-child::after {
  content: "";
  width: 2px;
  height: calc(100% - 25px);
  position: absolute;
  top: 25px;
  left: 19px;
  background-color: #e5e5e5;
  z-index: 1;
  overflow: hidden;
}
.v-treeview
  > .v-treeview-node:nth-of-type(2n + 1)
  .v-treeview-node__children
  .v-treeview-node:last-child::after {
  background-color: #fff;
}
.v-treeview-node__children
  .v-treeview-node__children
  .v-treeview-node:last-child::after {
  content: none;
}
.theme--light.v-treeview--hoverable .v-treeview-node__root:hover::before,
.theme--light.v-treeview
  .v-treeview-node--click
  > .v-treeview-node__root:hover::before {
  z-index: 2;
}
.v-treeview-node__root::before {
  transition: none;
}
.theme--light.v-treeview
  .v-treeview-node__root.v-treeview-node--active:hover::before,
.theme--light.v-treeview
  .v-treeview-node__root.v-treeview-node--active::before {
  z-index: 2;
}
</style>
