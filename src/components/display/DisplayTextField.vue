<template>
  <div class="d-flex confirm">
    <v-text-field
      :label="data.label"
      v-model="changeData"
      :disabled="controll"
      @input="showConfirm()"
      :type="data.type"
    ></v-text-field>
    <v-expand-transition>
      <div class="d-flex justify-end mt-3 ml-1 confirm-menu" v-if="confirm">
        <v-btn
          class="rounded-0 rounded-l pa-0"
          color="success"
          @click="saveData()"
          height="30"
          width="30"
          fab
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn
          class="rounded-0 rounded-r"
          color="error"
          height="30"
          width="30"
          fab
          @click="reverseData()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-expand-transition>
    <p v-if="data.appendText" class="mb-0 mt-5 ml-1">{{ data.appendText }}</p>
    <v-btn icon class="mt-3 rounded ml-1" large @click="controll = !controll">
      <v-icon :color="controll ? '' : 'primary'">mdi-pencil</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: "DispalyTextField",
  data: () => {
    return {
      controll: true,
      confirm: false,
      changeData: "",
    };
  },
  components: {},
  props: ["data"],
  created() {
    this.changeData = this.data.data;
    this.oldData = this.data.data;
  },
  methods: {
    saveData() {
      this.$emit("changeData", this.changeData);
      this.confirm = false;
      this.controll = true;
      this.oldData = this.changeData;
    },
    showConfirm() {
      this.confirm = true;
    },
    reverseData() {
      this.changeData = this.oldData;
      this.confirm = false;
      this.controll = true;
    },
  },
};
</script>
<style>
.confirm {
  position: relative;
}
.confirm-menu {
  position: absolute;
  top: 40px;
  left: -5px;
}
</style>
