<template>
  <div class="table">
    page1

    <el-button @click="toRoute">跳转子页面</el-button>
    <router-view />
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

<style scoped>
.table {
  background: rgb(205, 170, 238);
}
</style>