
<template>
  <div class="one">
    <p>package.json 配置项</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.one {
  position: absolute;
  top: 5%;
  left: 5%;
  bottom: 5%;
  width: 800px;
  background: url("../../assets/img/package.json.jpg") no-repeat;
  background-size: 100% 100%;
  > p {
    text-indent: 110px;
    font-size: 18px;
    color: white;
  }
}
</style>
