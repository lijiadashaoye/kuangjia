<template>
  <div class="wap" v-if="hasLogin">
    <div class="title">
      <p @click="toMainPage">
        <img src="@/assets/img/tt.svg" />
        <span>欢迎使用</span>
      </p>
      <div class="titlt_right">
        <i class="el-icon-question questionIcon" title="常见问题解答"></i>
        <el-dropdown @command="toWhere">
          <div class="dropDown">
            <el-avatar
              style="margin: 0 12px"
              :size="35"
              :src="require(`@/assets/img/user.png`)"
            ></el-avatar>
            <span>{{ user }}</span>
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="passAction">修改密码</el-dropdown-item>
            <el-dropdown-item command="login">退 出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="content">
      <component :is="navComType"></component>
      <div class="showContent">
        <router-view></router-view>
      </div>
    </div>
    <el-dialog
      title="提示"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="30%"
    >
      <span>是否清除当前登录用户的数据？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="danger" @click="dialogFn(false)"
          >清除数据</el-button
        >
        <el-button size="small" type="primary" @click="dialogFn(true)"
          >保留数据</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasLogin: false, // 没有登录或者token过期的话不会显示页面内容
      dialogVisible: false,
    };
  },
  computed: {
    user() {
      return this.$seStorage.get("username");
    },
    navComType() {
      if (this.$seStorage.get("navCom") === "menu") {
        return () => import("./nav.menu.vue");
      } else {
        return () => import("./nav.tree.vue");
      }
    },
  },
  created() {
    if (!this.$seStorage.get("token")) {
      this.$message.error("请登录！");
      setTimeout(() => {
        this.$router.push({ name: "login" });
      }, 300);
    } else {
      this.hasLogin = true;
    }
  },
  watch: {
    "$store.state.page": function (navId) {
      if (navId !== "login") {
        this.$router.push({
          name: navId,
        });
      }
    },
  },
  methods: {
    // 右上角退出、修改密码弹框的显示、隐藏
    // mouseenter:当鼠标移入某元素时触发，即使有子元素。推荐使用
    // mouseleave:当鼠标移出某元素时触发，即使有子元素。推荐使用
    // mouseover:当鼠标移入某元素时触发，移入和移出其子元素时也会触发。会闪
    // mouseout:当鼠标移出某元素时触发，移入和移出其子元素时也会触发。会闪
    // mousemove:鼠标在某元素上移动时触发，即使在其子元素上也会触发。触发的频率很高
    // 右上角退出、修改密码
    toWhere(name) {
      if (name === "login" && this.$seStorage.get("userInfo")) {
        this.dialogVisible = true;
      } else {
        this.$router.push({
          name: name,
        });
      }
    },
    dialogFn(type) {
      if (!type) {
        this.$seStorage.clear("userInfo");
      }
      this.$router.push({
        name: "login",
      });
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
.wap {
  height: 100%;
  display: grid;
  grid-template-rows: 50px calc(100% - 50px);
  .content {
    display: flex;
  }
}
.title {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 2px 0 rgb(209, 208, 208);
  > p {
    height: 40px;
    margin-left: 20px;
    cursor: pointer;
    > img {
      height: 100%;
      vertical-align: -6px;
      margin-right: 10px;
    }
    > span {
      font-size: 30px;
      font-weight: bold;
      display: inline-block;
    }
    &:hover span {
      transform: scale(0.95);
    }
  }

  .titlt_right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 14px;
    height: 100%;
    position: relative;
    .dropDown {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
      & :hover {
        cursor: pointer;
      }
      &:hover > span {
        color: #7eb6f3;
      }
    }

    .questionIcon {
      color: #007bff;
      cursor: pointer;
    }
  }
}
.content {
  height: 100%;
  display: flex;
  .showContent {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.pages {
  height: 100%;
  overflow-y: auto;
}
</style>
