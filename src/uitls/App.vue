<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  // 全局服务
  provide() {
    return {
      father: "father",
      provide1: "provide1",
      provide2: "provide2",
    };
  },
  mounted() {},
};
</script>

