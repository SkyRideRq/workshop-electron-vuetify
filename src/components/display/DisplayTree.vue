<template>
  <v-treeview
    open-on-click
    hoverable
    activatable
    :items="items"
    class="display-tree"
  >
    <template slot="append" slot-scope="props" v-if="props.item.name !== ''">
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
  components: {
    CustomerPreview,
  },
  props: ["items"],
  methods: {
    changeLink($event, link) {
      $event.stopPropagation();
      this.$router.push({
        path: "/" + link,
      });
    },
  },
};
</script>
<style lang="scss">
.display-tree {
  > .v-treeview-node {
    &:nth-of-type(2n) {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:nth-of-type(2n + 1) {
      .v-treeview-node {
        &__children {
          .v-treeview-node {
            &:last-child {
              &::after {
                background-color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .v-treeview-node {
    &__append {
      flex: 8;
      justify-content: flex-end;
      display: flex;
    }
    &--active {
      &::before {
        z-index: 2;
      }
    }
    &__label {
      font-weight: 700;
    }
    &__children {
      position: relative;
    }
    &__root {
      &::before {
        transition: none;
      }
      &:hover {
        &::before {
          z-index: 2;
        }
      }
    }
    &__children::before {
      content: "";
      width: 2px;
      height: 100%;
      position: absolute;
      top: -23px;
      left: 19px;
      background-color: rgba(0, 0, 0, 0.2);
    }
    &__children {
      .v-treeview-node {
        position: relative;
        &::before {
          content: "";
          height: 2px;
          width: 22px;
          position: absolute;
          top: 23px;
          left: 21px;
          background-color: rgba(0, 0, 0, 0.2);
        }
        &:last-child {
          &::after {
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
        }
        &__children {
          &::before {
            left: 43px;
          }
          .v-treeview-node {
            &::before {
              left: 45px;
            }
            &:last-child::after {
              content: none;
            }
          }
        }
      }
    }
  }
  &__box {
    width: 100%;
    justify-content: flex-end;
  }
  &__holder {
    flex: 1;
  }
  &__desc {
    width: 60%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  &__data {
    width: 20%;
  }
}
</style>
