var zoomControll = {
  data: () => {
    return {
      zoom: 1,
      zoomMenuActive: false,
    };
  },
  methods: {
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
export default zoomControll;
