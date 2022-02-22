<template>
  <div class="page">
    page1--page1
    <p>全局的依赖注入</p>
    <p>{{ father }}</p>
    <p>{{ provide1 }}</p>
    <p>{{ provide2 }}</p>
     <el-button @click="readExcel">读取excel文件</el-button>
  </div>
</template>

<script>

export default {
  inject: ["father", "provide1", "provide2"],
  created() {
    this.$bus.$on("busEmit", (t) => {
      console.log(t);
    });
  },
  methods: {
    readExcel(){
      
    }
  },
};
</script>

<style scoped>
.page {
  color: blue;
  height:1000px;
}
</style>