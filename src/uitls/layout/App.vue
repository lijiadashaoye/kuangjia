<template>
  <router-view v-if="hasInit" />
</template>
<script>
export default {
  data() {
    return {
      hasInit: false,
    };
  },
  created() {
    let pubFn = require("../pubFn").default,
      allUrl = require("../allUrl").default,
      proto = Object.getPrototypeOf(this.$root);
    Object.entries(pubFn).forEach((arr) => {
      proto[`$${arr[0]}`] = arr[1];
    });
    proto["$url"] = allUrl;
    this.hasInit = true;
  },
};
</script>

