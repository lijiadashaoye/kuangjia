<template>
  <div id="login" class="login">
    <h3>登陆页面</h3>
    <button @click="toLogin">登陆</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
   
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: "content",
      });
    },
  },
};
</script>

<style scoped>
</style>