<template>
  <div class="wap" v-if="hasLogin">
    <div class="title">
      <img :src="require('@/assets/img/logo.png')" />
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasLogin: false, // 没有登录或者token过期的话不会显示页面内容
    };
  },
  computed: {
    user() {
      return this.$route.query.username;
    },
    navComType() {
      if (this.$route.query.navCom === "menu") {
        return () => import("./nav.menu.vue");
      } else {
        return () => import("./nav.tree.vue");
      }
    },
  },
  created() {
    if (!this.$sessionSto.get("token")) {
      this.$message.error("请登录！");
      setTimeout(() => {
        this.$router.push({ name: "login" });
      }, 300);
    } else {
      this.hasLogin = true;
    }
  },
  watch: {
    "$store.state.page": function (t) {
      if (t !== "login") {
        this.$router.push({
          path: `/content/${t}`,
          query: {
            com: t.name,
          },
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
      if (name === "login" && this.$localSto.get("userInfo")) {
        this.$confirm("是否清除当前登录用户的数据？", "提示", {
          confirmButtonText: "保留数据",
          cancelButtonText: "清除数据",
          closeOnClickModal: false,
          showClose: false,
        })
          .then(() => {
            this.$router.push({
              name: name,
            });
          })
          .catch(() => {
            this.$localSto.clear("userInfo");
            this.$router.push({
              name: name,
            });
          });
      } else {
        this.$router.push({
          name: name,
        });
      }
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
  > img {
    height: 35px;
    margin-left: 20px;
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
    overflow-y: auto;
  }
}
.pages {
  height: 100%;
  overflow-y: auto;
}
</style>
