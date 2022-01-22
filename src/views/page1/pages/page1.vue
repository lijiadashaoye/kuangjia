<template>
  <div class="page">
    page1
    <p>{{ father }}</p>
    <p>{{ provide1 }}</p>
    <p>{{ provide2 }}</p>

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
   
  },
};
</script>

<style scoped>
.page {
  color: blue;
}
</style>