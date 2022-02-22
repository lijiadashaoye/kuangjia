<template>
  <div class="ereryPage">
    <div class="pageHeader">
      <span>page1,页面头部</span>
      <el-button @click="toRoute">跳转子页面</el-button>
    </div>
    <div class="pageContent">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: "1-1",
    };
  },
  created() {},
  methods: {
    toRoute() {
      this.$router.push({
        name: this.page === "1-1" ? "1-2" : "1-1",
      });
      this.page = this.page === "1-1" ? "1-2" : "1-1";
    },
  },
};
</script>

<style scoped lang="scss">
$pageHeaderHeight: 80px;
.ereryPage {
  background: rgb(205, 170, 238);
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: $pageHeaderHeight calc(100% - #{$pageHeaderHeight});
}
.pageHeader {
  background: rgb(170, 238, 185);
}
.pageContent {
  height: 100%;
  overflow-y: auto;
}
</style>