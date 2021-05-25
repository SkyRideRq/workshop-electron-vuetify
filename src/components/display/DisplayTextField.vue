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
      <div class="d-flex justify-end mt-3 ml-1 confirm__menu" v-if="confirm">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              type="submit"
              v-bind="attrs"
              v-on="on"
              @click="saveData()"
              color="success"
              class="rounded-0 rounded-l pa-0"
              height="30"
              width="30"
              fab
            >
              <v-icon>{{ $icons.agree.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $icons.agree.text }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="reverseData()"
              color="error"
              class="rounded-0 rounded-r"
              height="30"
              width="30"
              fab
            >
              <v-icon>{{ $icons.disagree.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $icons.disagree.text }}</span>
        </v-tooltip>
      </div>
    </v-expand-transition>
    <p v-if="data.appendText" class="mb-0 mt-5 ml-1">{{ data.appendText }}</p>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          @click="controll = !controll"
          large
          icon
          class="mt-3 rounded ml-1"
        >
          <v-icon :color="controll ? '' : 'primary'">{{
            $icons.edit.icon
          }}</v-icon>
        </v-btn>
      </template>
      <span>{{ $icons.edit.text }}</span>
    </v-tooltip>
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
  props: ["data"],
  created() {
    this.changeData = this.data.data;
    this.oldData = this.data.data;
  },
  methods: {
    saveData() {
      this.$emit("changeData", this.changeData, this.data.dataId);
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
<style lang="scss">
.confirm {
  position: relative;
  &__menu {
    position: absolute;
    top: 40px;
    left: -5px;
  }
}
</style>
