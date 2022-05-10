<template>
  <div class="page404">
    <span>4</span>
    <span>0</span>
    <span>4</span>
    <div>
      <el-button size="small" @click="back(1)">返回上一页</el-button>
      <el-button size="small" @click="back(2)">返回主页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back(num) {
      if (num === 1) {
        history.go(-1);
      } else {
        this.$router.push({
          name: "content",
        });
      }
    },
  },
};
</script>

<style scoped lang='scss'>
$left: 39%;
.page404 {
  height: 100%;
  position: relative;
  overflow: hidden;
  > span {
    position: absolute;
    font-size: 150px;
    top: 30%;
  }
  > span:nth-child(1) {
    animation: span1 3s;
    left: $left;
  }
  > span:nth-child(2) {
    animation: span2 5s;
    left: calc(#{$left} + 105px);
  }
  > span:nth-child(3) {
    animation: span3 4s;
    left: calc(#{$left} + 205px);
  }
  > div {
    position: absolute;
    top: 55%;
    left: calc(#{$left} + 52px);
  }
}
@keyframes span1 {
  0% {
    left: -200px;
  }
  25% {
    left: 15%;
    transform: rotate(50deg);
  }
  50% {
    left: 25%;
    transform: rotate(150deg);
  }
  75% {
    left: 42%;
    transform: rotate(30deg);
  }
  100% {
    left: $left;
  }
}
@keyframes span2 {
  0% {
    top: -10%;
  }
  25% {
    top: 60%;
    transform: scale(0.8);
  }
  50% {
    top: 20%;
    transform: scale(2.5);
  }
  75% {
    top: 50%;
    transform: scale(0.5);
  }
  100% {
    top: 30%;
  }
}
@keyframes span3 {
  0% {
    left: calc(100% + 200px);
  }
  25% {
    left: 80%;
    transform: rotate(-50deg);
  }
  50% {
    left: 30%;
    transform: rotate(-250deg);
  }
  75% {
    left: 70%;
    transform: rotate(50deg);
  }
  100% {
    left: calc(#{$left} + 200px);
  }
}
</style>