<template>
  <div class="text-center">
    <v-dialog v-model="dialog">
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

      <v-card height="80vh">
        <v-card-title
          class="headline grey lighten-2 px-4"
          id="draggable-header"
        >
          <!--  -->
          {{ data }}
          <v-btn
            color="error"
            fab
            x-small
            class="ml-auto"
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <div ref="draggableContainer" id="draggable-container">
          <v-img
            @mousedown="dragMouseDown"
            contain
            width="100%"
            height="100%"
            :src="'../../pictures/' + data"
          >
          </v-img>
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
  },
};
</script>
<style>
.img-btn {
  cursor: pointer;
}
#draggable-container {
  position: absolute;
  z-index: 9;
}
#draggable-header {
  position: relative;
  z-index: 10;
}
</style>
