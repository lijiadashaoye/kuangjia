<template>
  <div class="wap">
    <div class="title">
      <button @click="showNav">导航</button>
      <button @click="toLogin">登陆</button>
    </div>
    <div class="content">
      <navCom class="nav" ref="nav" />
      <router-view style="height: 100%; overflow-y: auto"></router-view>
    </div>
  </div>
</template>
<script>
import navCom from "@/components/nav.vue";
export default {
  components: {
    navCom,
  },
  data() {
    return {
      father: "父组件",
    };
  },
  created() {
    this.$bus.$on("busEmit", (t) => {
      console.log(t);
    });
  },
  watch: {
    "$store.state.page": function (t) {
      if (t !== "login") {
        this.$router.push({
          path: `/content/${t}`,
          params: {
            com: t.name,
          },
        });
      }
    },
  },
  methods: {
    showNav() {
      this.$refs.nav.show = !this.$refs.nav.show;
    },
    toLogin() {
      this.$router.push({
        name: "login",
      });
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
</style>
