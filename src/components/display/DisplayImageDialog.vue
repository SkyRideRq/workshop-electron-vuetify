<template>
  <div class="text-center">
    <v-dialog v-model="dialog" @click:outside="closeModal()">
      <template v-slot:activator="{ on, attrs }">
        <v-img
          max-width="200"
          max-height="200"
          :src="'../../pictures/' + data"
          v-bind="attrs"
          v-on="on"
          class="img-btn"
        >
        </v-img>
      </template>

      <v-card class="image-dialog-box" height="80vh">
        <v-card-title
          class="headline grey lighten-2 px-4 image-dialog-header"
          id="draggable-header"
        >
          <!--  -->
          {{ data }}
          <v-btn
            color="primary"
            icon
            x-large
            class="ml-auto"
            @click="zoomMenuActive = !zoomMenuActive"
          >
            <v-icon>mdi-magnify-plus-outline</v-icon>
          </v-btn>
          <v-btn color="error" fab x-small @click="closeModal()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
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
        <div ref="draggableContainer" id="draggable-container">
          <img
            @mousedown="dragMouseDown"
            :src="'../../pictures/' + data"
            ref="imgToZoom"
            @wheel.prevent="zoomWheel($event)"
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
    };
  },
  props: ["data"],
  created() {},
  methods: {
    dragMouseDown: function(event) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },
    elementDrag: function(event) {
      event.preventDefault();
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
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
    },
    closeModal() {
      this.dialog = false;
      this.$refs.draggableContainer.style.top = 0 + "px";
      this.$refs.draggableContainer.style.left = 0 + "px";
      this.zoom = 1;
      this.$refs.imgToZoom.style.transform = "scale(" + this.zoom + ")";
    },

    zoomControll() {
      this.$refs.imgToZoom.style.transform = "scale(" + this.zoom + ")";
    },
    zoomWheel(event) {
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
