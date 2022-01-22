<template>
  <router-view />
</template>
<script>
function provide1() {
  return "provide1";
}

export default {
  provide() {
    return {
      father: (() => "father")(),
      provide1: provide1(),
      provide2: this.provide2(),
    };
  },
  data() {
    return {};
  },
  methods: {
    provide2() {
      return "provide2";
    },
  },
};
</script>

<style lang="scss">
body,
html,
ul,
p {
  padding: 0;
  margin: 0;
  list-style: none;
}
html,
body {
  height: 100%;
}
.wap {
  height: 100%;
  display: grid;
  grid-template-rows: 30px calc(100% - 30px);
}
.title {
  height: 30px;
  background: palegoldenrod;
}
.content {
  height: 100%;
  position: relative;
}
.right {
  height: 100%;
  overflow: hidden;
  background: seagreen;
}
.nav {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  z-index: 3;
}
.pages {
  height: 100%;
  overflow-y: auto;
}
.linkActive {
  color:red;
}
</style>
