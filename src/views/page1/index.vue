<template>
  <div class="table">
    page1

    <div>
      <button @click="lskdfl(1)">page1</button>
      <button @click="lskdfl(2)">page2</button>
      <button @click="bus">$bus</button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    
  },
  methods: {
    lskdfl(num) {
      this.$router.push({
        name: `page1-page${num}`,
        query: { fff: "fff" },
      });
    },
    bus() {
      this.$bus.$emit("busEmit", "busEmit");
    },
  },
};
</script>

<style scoped>
.table {
  background: rgb(205, 170, 238);
}
</style>