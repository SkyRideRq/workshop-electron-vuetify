var dragControll = {
  data: () => {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
      dragWindow: {},
      selectedCursor: {
        container: "default",
        img: "grab",
      },
    };
  },
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
  },
};
export default dragControll;
