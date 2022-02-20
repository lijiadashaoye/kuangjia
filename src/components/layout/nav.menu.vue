<template>
  <div
    class="navWap"
    :style="{ width: $store.state.showNav ? '240px' : '65px' }"
  >
    <div class="changeNavShow">
      <div v-show="$store.state.showNav">
        <span @click="toMainPage">代码工厂框架</span>
      </div>
      <div>
        <i
          class="el-icon-s-fold"
          v-if="$store.state.showNav"
          @click="$store.commit('showNavFn', false)"
        ></i>
        <i
          class="el-icon-s-unfold"
          v-else
          @click="$store.commit('showNavFn', true)"
        ></i>
      </div>
    </div>

    <el-menu
      :default-active="$store.state.page"
      class="elMenu"
      text-color="#8a8888"
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
      return this.$sessionSto.get("navList");
    },
  },
  methods: {
    selectFn(t) {
      console.log(t);
      // $store.commit("chagePage", t);
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
::-webkit-scrollbar {
  width: 4px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px rgba(236, 234, 234, 0.3);
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: rgb(112, 170, 252);
}
// 所以用scss变量
$height: 40px;
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
  > div:nth-of-type(1) {
    width: 100%;
    padding-left: 10px;
    > span {
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
    padding: 0 5px;
    flex-shrink: 0;
  }
}
.elMenu {
  flex-shrink: 0;
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
  padding: 10px 0 20px 0;
  width:100%;
}
</style>