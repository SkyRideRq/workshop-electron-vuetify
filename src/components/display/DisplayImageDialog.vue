<template>
  <div class="text-center">
    <v-dialog v-model="dialog" @click:outside="closeModal()">
      <template v-slot:activator="{ on, attrs }">
        <v-img
          max-width="200"
          max-height="200"
          :src="'/pictures/' + data"
          v-bind="attrs"
          v-on="on"
          class="image-dialog__btn"
        >
        </v-img>
      </template>

      <v-card class="image-dialog__box" height="80vh" ref="dragWindow">
        <v-card-title
          class="headline grey lighten-2 px-4 image-dialog__header"
          id="draggable-header"
          ref="draggableHeader"
        >
          {{ data }}
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                @click="zoomMenuActive = !zoomMenuActive"
                color="primary"
                icon
                x-large
                class="ml-auto"
              >
                <v-icon>{{ $icons.magnify.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ $icons.magnify.text }}</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                @click="closeModal()"
                color="error"
                fab
                x-small
              >
                <v-icon>{{ $icons.close.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ $icons.close.text }}</span>
          </v-tooltip>

          <v-expand-transition>
            <div class="image-dialog__zoom-menu" v-if="zoomMenuActive">
              <v-slider
                v-model="zoom"
                hint="Im a hint"
                max="10"
                min="1"
                step="0.1"
                @change="zoomControll()"
                hide-details
              ></v-slider>
            </div>
          </v-expand-transition>
        </v-card-title>
        <div
          class="image-dialog__draggable-container"
          ref="draggableContainer"
          id="draggable-container"
          :style="{ cursor: selectedCursor.container }"
        >
          <img
            @mousedown="dragMouseDown"
            :src="'/pictures/' + data"
            ref="imgToZoom"
            @wheel.prevent="zoomWheel($event)"
            :style="{ cursor: selectedCursor.img }"
          />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import dragControll from "@/mixins/dragControll.js";
import zoomControll from "@/mixins/zoomControll.js";
export default {
  name: "ProductPage",
  mixins: [dragControll, zoomControll],
  data: () => {
    return {
      dialog: false,
    };
  },
  props: ["data"],
  methods: {
    closeModal() {
      this.dialog = false;
      this.$refs.draggableContainer.style.top =
        this.$refs.draggableHeader.offsetHeight + "px";
      this.$refs.draggableContainer.style.left = 0 + "px";
      this.zoom = 1;
      this.$refs.imgToZoom.style.transform = "scale(" + this.zoom + ")";
    },
  },
};
</script>
<style lang="scss">
.image-dialog {
  &__btn {
    cursor: pointer;
  }
  &__box {
    overflow: hidden;
  }
  &__header {
    position: relative;
    z-index: 10;
  }
  &__zoom-menu {
    position: absolute;
    width: 200px;
    top: 78px;
    right: 10px;
    padding: 0 5px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: #e0e0e0 !important;
  }
  &__draggable-container {
    position: absolute;
    z-index: 9;
    width: 100%;
    height: 100%;
  }
}
</style>
