<template>
  <div
    class="navWap"
    :style="{
      'flex-shrink': 0,
      width: $store.state.showNav ? '250px' : '64px',
    }"
  >
    <div class="changeNavShow">
      <div v-show="$store.state.showNav">
        <span @click="toMainPage">代码工厂框架</span>
      </div>
      <div
        @click="$store.commit('showNavFn')"
        :title="$store.state.showNav ? '缩小导航' : '放大导航'"
      >
        <i class="el-icon-s-fold" v-if="$store.state.showNav"></i>
        <i class="el-icon-s-unfold" v-else></i>
      </div>
    </div>

    <el-menu
      :default-active="$store.state.page"
      class="elMenu"
      text-color="#8a8886"
      active-text-color="#f58585"
      :collapse="!$store.state.showNav"
      @select="selectFn"
    >
      <Submenu :navList="navList"></Submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: { Submenu: () => import("./submenu") },
  computed: {
    navList() {
      return this.$seStorage.get("navList");
    },
  },
  methods: {
    selectFn(t) {
      this.$store.commit("chagePage", t);
    },
    toMainPage() {
      this.$confirm(
        "退出并清空所有之前的操作，使页面回到刚登录状态！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "初始化",
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>

// 使用用scss变量
$height: 50px;
.navWap {
  display: grid;
  grid-template-rows: $height calc(100% - #{$height});
  .navList {
    width: 100%;
    height: 100%;
    border-right: 1px solid rgb(228, 225, 225);
    box-sizing: border-box;
  }
}
.changeNavShow {
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgb(228, 225, 225);
  border-bottom: 1px solid rgb(228, 225, 225);
  box-sizing: border-box;
  vertical-align: text-bottom;
  > div:nth-of-type(1) {
    width: 100%;
    padding-left: 10px;
    > span:nth-child(1) {
      cursor: pointer;
      font-size: 22px;
      font-weight: bold;
      color: rgb(97, 96, 96);
      &:hover {
        color: black;
      }
    }
  }
  > div:nth-of-type(2) {
    cursor: pointer;
    padding: 5px 10px;
    flex-shrink: 0;
    border-radius: 3px;
    &:hover {
      background: rgb(212, 209, 209);
    }
  }
}
.elMenu {
  flex-shrink: 0;
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
  padding: 10px 0 20px 0;
  width: 100%;
}
</style>