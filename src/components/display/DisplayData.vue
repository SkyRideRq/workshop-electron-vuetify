<template>
  <v-list>
    <v-row>
      <v-col>
        <v-list-item
          v-for="(item, name, index) in Object.fromEntries(
            Object.entries(data).slice(0, 4)
          )"
          :key="index + data.mail"
        >
          <v-list-item-icon>
            <v-icon>{{ $icons[name].icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
            <v-list-item-subtitle>{{ $icons[name].text }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col v-if="Object.values(data).length > 4">
        <v-list-item
          v-for="(item, name, index) in Object.fromEntries(
            Object.entries(data).slice(4, 8)
          )"
          :key="index + data.mail"
        >
          <v-list-item-icon>
            <v-icon>{{ $icons[name].icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
            <v-list-item-subtitle>{{ $icons[name].text }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-list>
</template>
<script>
export default {
  name: "DisplayData",
  props: ["data"],
};
</script>
