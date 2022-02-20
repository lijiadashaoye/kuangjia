<template>
  <div
    class="navWap"
    :style="{
      'flex-shrink': 0,
      width: $store.state.showNav ? '250px' : '60px',
    }"
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
      highlight-current
      @node-click="handleNodeClick"
      icon-class="el-icon-circle-plus-outline"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  computed: {
    navList() {
      return this.$sessionSto.get("navList");
    },
  },
  mounted() {
    // .el-tree-node__content
  },
  methods: {
    handleNodeClick(...node) {
      if (node[1].level === 1 && !node[1].isLeaf) {
        this.$nextTick(() => {
          let father = node[2].$el.children[0],
            span = document.createElement("span");
          father.removeChild(father.children[0]);
          if (node[1].expanded) {
            span.className =
              "expanded el-tree-node__expand-icon el-icon-circle-plus-outline hasExpend";
          } else {
            span.className =
              "expanded el-tree-node__expand-icon el-icon-circle-plus-outline noExpend";
          }
          father.insertBefore(span, father.children[0]);
        });
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
  align-items: center;
  border-right: 1px solid rgb(228, 225, 225);
  border-bottom: 1px solid rgb(228, 225, 225);
  box-sizing: border-box;
  cursor: pointer;
  padding-left: 10px;
  color: rgb(97, 96, 96);
  width: 100%;
  > span:nth-child(1) {
    font-size: 22px;
    font-weight: bold;
    &:hover {
      color: black;
    }
  }
}
</style>
<style lang="scss">
.navList {
  > div {
    .el-tree-node__content {
      height: 30px;
      padding: 4px 0;
    }
    .el-tree-node__label {
      font-size: 16px !important;
    }
  }
  .el-tree-node__expand-icon.expanded {
    transform: rotate(0) !important;
    padding: 0 5px;
    font-weight: bold;
  }
  .el-tree-node__expand-icon {
    font-size: 16px;
  }
  .hasExpend::before {
    content: "\e722";
  }
  .noExpend::before {
    content: "\e723";
  }
}
</style>