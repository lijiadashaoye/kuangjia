<template>
  <div class="table">
    page1
    <el-button>默认按钮</el-button>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.table {
  background: rgb(205, 170, 238);
}
</style>