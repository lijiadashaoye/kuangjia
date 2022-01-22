<template>
  <div class="table">
    page2

    <div>
      <button @click="lskdfl(1)">page1</button>
      <button @click="lskdfl(2)">page2</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    lskdfl(num) {
      this.$router.push({
        name: `page2-page${num}`,
      });
    },
  },
};
</script>

<style scoped>
.table {
  background: rgb(170, 238, 210);
}
</style>