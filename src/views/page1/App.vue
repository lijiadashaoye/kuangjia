<template>
  <div class="app">
    <nav>
      <router-link to="/content/page1/home">Home</router-link> |
      <router-link to="/content/page1/about">About</router-link> |
      <router-link to="/content/page1">page1</router-link>
    </nav>
    <p>读取page1的state：{{ $store.state.page1.page }}</p>
    <div>
      <el-button size="small" @click="changePage">变更状态</el-button>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  created() {},
  methods: {
    changePage() {
      this.$store.commit(
        "page1/changePage",
        this.$store.state.page1.page == "changePage" ? "page1" : "changePage"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
