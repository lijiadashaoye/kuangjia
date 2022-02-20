<template>
  <div
    class="navWap"
    :style="{ width: $store.state.showNav ? '200px' : '60px' }"
  >
    <div class="changeNavShow">
      <span @click="toMainPage">代码工厂框架</span>
    </div>

    <el-tree
      class="navList"
      :data="navList"
      :props="{
        children: 'children',
        label: 'label',
      }"
      node-key="id"
      :highlight-current="true"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
export default {
  computed: {
    navList() {
      return this.$sessionSto.get("navList");
    },
  },
  methods: {
    handleNodeClick(...data) {
      let node = data[1];
      if (node.isLeaf) {
        this.$store.commit("chagePage", node.data.id);
      }
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
  align-items: center;
  border-right: 1px solid rgb(228, 225, 225);
  border-bottom: 1px solid rgb(228, 225, 225);
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: rgb(140, 138, 138);
  padding-left: 10px;
  &:hover {
    color: black;
  }
}
</style>