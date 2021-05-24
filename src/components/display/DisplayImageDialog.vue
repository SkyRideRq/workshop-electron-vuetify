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
          class="img-btn"
        >
        </v-img>
      </template>

      <v-card class="image-dialog-box" height="80vh" ref="dragWindow">
        <v-card-title
          class="headline grey lighten-2 px-4 image-dialog-header"
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
            <div class="zoom-menu" v-if="zoomMenuActive">
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
export default {
  name: "ProductPage",
  components: {},
  data: () => {
    return {
      dialog: false,
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
      zoom: 1,
      zoomMenuActive: false,
      dragWindow: {},
      selectedCursor: {
        container: "default",
        img: "grab",
      },
    };
  },
  props: ["data"],

  methods: {
    dragMouseDown(event) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
      this.selectedCursor.container = "grabbing";
      this.selectedCursor.img = "grabbing";
      this.dragWindow = {
        top:
          this.$refs.draggableHeader.offsetHeight +
          this.$refs.dragWindow.$el.offsetTop,
        bottom:
          this.$refs.dragWindow.$el.clientHeight +
          this.$refs.draggableHeader.offsetHeight,
        left: this.$refs.dragWindow.$el.offsetLeft,
        right: this.$refs.dragWindow.$el.offsetWidth,
      };
    },
    elementDrag(event) {
      event.preventDefault();
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      //lock drag
      if (
        this.dragWindow.top > this.positions.clientY ||
        this.dragWindow.bottom < this.positions.clientY ||
        this.dragWindow.left > this.positions.clientX ||
        this.dragWindow.right < this.positions.clientX
      ) {
        return;
      }

      // set the element's new position:
      this.$refs.draggableContainer.style.top =
        this.$refs.draggableContainer.offsetTop -
        this.positions.movementY +
        "px";
      this.$refs.draggableContainer.style.left =
        this.$refs.draggableContainer.offsetLeft -
        this.positions.movementX +
        "px";
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      this.selectedCursor.container = "default";
      this.selectedCursor.img = "grab";
    },

    closeModal() {
      this.dialog = false;
      this.$refs.draggableContainer.style.top =
        this.$refs.draggableHeader.offsetHeight + "px";
      this.$refs.draggableContainer.style.left = 0 + "px";
      this.zoom = 1;
      this.$refs.imgToZoom.style.transform = "scale(" + this.zoom + ")";
    },

    zoomControll() {
      this.$refs.imgToZoom.style.transform = "scale(" + this.zoom + ")";
    },
    zoomWheel(event) {
      this.zoomMenuActive = true;
      if (event.deltaY < 0) {
        this.zoom += 0.1;
        this.$refs.imgToZoom.style.transform = "scale(" + this.zoom + ")";
      } else {
        this.zoom -= 0.1;
        this.$refs.imgToZoom.style.transform = "scale(" + this.zoom + ")";
      }
    },
  },
};
</script>
<style>
.img-btn {
  cursor: pointer;
}
.image-dialog-box {
  overflow: hidden;
}
.image-dialog-header {
  position: relative;
}
.zoom-menu {
  position: absolute;
  width: 200px;
  top: 78px;
  right: 10px;
  padding: 0 5px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #e0e0e0 !important;
}
#draggable-container {
  position: absolute;
  z-index: 9;
  width: 100%;
  height: 100%;
}
#draggable-header {
  position: relative;
  z-index: 10;
}
</style>
