<template>
  <div class="d-flex">
    <v-text-field
      :label="data.label"
      v-model="changeData"
      :disabled="controll"
      height="40"
      @input="showConfirm()"
      :type="data.type"
    >
      <template v-slot:append v-if="confirm">
        <v-fade-transition leave-absolute>
          <div class="d-flex justify-end">
            <v-btn
              class="rounded-0 rounded-l pa-0"
              color="success"
              @click="saveDate()"
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
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-fade-transition>
      </template>
    </v-text-field>
    <v-btn class="mt-3" icon large @click="controll = !controll">
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
    };
  },
  components: {},
  props: ["data"],
  created() {
    this.changeData = this.data.data;
  },
  methods: {
    saveDate() {
      this.$emit("changeData", this.changeData);
      this.confirm = false;
      this.controll = true;
    },
    showConfirm() {
      this.confirm = true;
    },
  },
};
</script>
