<template>
  <div id="login">
    <!-- 画背景组件，可以不用 -->
    <BackGround />
    <!-- 登录表单区域 -->
    <div class="inputInfo">
      <p class="inputInfo_title">欢迎登录</p>
      <!-- 登录表单区域 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="手机、邮箱、用户名"
            class="userName"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            class="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            :type="canSee ? 'text' : 'password'"
          >
            <span
              class="iconfont inputType"
              slot="suffix"
              v-if="!canSee"
              @click="canSee = !canSee"
              >&#xe6cb;</span
            >
            <span
              v-else
              class="iconfont inputType"
              slot="suffix"
              @click="canSee = !canSee"
              >&#xe674;</span
            >
          </el-input>
        </el-form-item>
      </el-form>
      <div class="aboutPass">
        <p
          @click="rember = !rember"
          :style="{ color: rember ? '#409EFF' : '#b9bec5' }"
        >
          <i style="font-weight: bold" class="el-icon-circle-check"></i>
          <span>记住密码</span>
        </p>

        <p>
          <span @click="forgetPass">忘记密码</span>
        </p>
      </div>
      <el-button
        type="primary"
        class="loginBtn"
        @click="login"
        @keyup.enter="login"
        >登 陆</el-button
      >

      <p class="argument" :style="{ color: argument ? '#409EFF' : '#b9bec5' }">
        <i
          @click="argument = !argument"
          class="el-icon-circle-check"
          :style="{ color: argument ? '#409EFF' : '', 'font-weight': 'bold' }"
        ></i>
        <span @click="showText('隐私政策')">《隐私政策》</span>|
        <span @click="showText('用户服务协议')">《用户服务协议》</span>
      </p>
    </div>

    <el-dialog
      :append-to-body="true"
      :show-close="false"
      :close-on-click-modal="false"
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="600"
    >
      <div>
        {{ dialog.content }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog.visible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BackGround from "./background.vue";
export default {
  components: { BackGround },
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      // 表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
      },
      rember: true, // 是否记住用户密码数据
      argument: true, // 隐私政策是否已勾选
      canSee: false, // 切换密码的可见性
      dialog: {
        // 点击隐私政策的介绍弹框
        title: "",
        visible: false,
        content: "",
      },
    };
  },
  beforeCreate() {
    // 重置数据
    this.$store.commit("resetDatas");
  },
  mounted() {
    let userInfo = this.$seStorage.get("userInfo");
    if (userInfo) {
      this.loginForm.username = userInfo.username;
      this.loginForm.password = userInfo.password;
      this.rember = userInfo.rember;
    }
    // 绑定enter的登录事件
    window.addEventListener("keydown", this.keyDown);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keyDown);
  },
  methods: {
    showText(text) {
      this.dialog.title = text;
      this.dialog.content = text;
      this.dialog.visible = true;
    },
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.login();
      }
    },
    // 执行登录
    login() {
      if (this.argument) {
        this.$refs.loginFormRef.validate((valid) => {
          if (valid) {
            let params = {
              username: this.loginForm.username,
              password: this.loginForm.password,
            };
            this.$axios({
              method: "post",
              url: this.$url.login,
              data: params,
            })
              .then((res) => {
                return this.$axios({
                  method: "post",
                  url: this.$url.navList,
                  data: params,
                }).then((navList) => {
                  return { ...res, navList };
                });
              })
              .then((res) => {
                if (res) {
                  this.$seStorage.set("navList", res.navList);
                  this.$seStorage.set("token", res.token);
                  this.$seStorage.set("username", res.username);
                  // 根据服务器返回的数据决定使用的nav组件类型
                  if (this.rember) {
                    this.$seStorage.set("userInfo", {
                      password: res.password,
                      username: res.username,
                      rember: this.rember,
                    });
                  }
                  this.$confirm(
                    "使用基于 elemtntUI 组件的什么类型的导航？",
                    "提示",
                    {
                      confirmButtonText: "NavMenu 导航菜单",
                      cancelButtonText: "Tree 树形控件",
                      closeOnClickModal: false,
                      showClose: false,
                    }
                  )
                    .then(() => {
                      this.$seStorage.set("navCom", "menu");
                      this.$router.push({
                        name: "content",
                      });
                    })
                    .catch(() => {
                      this.$seStorage.set("navCom", "tree");
                      this.$router.push({
                        name: "content",
                      });
                    });
                }
              });
          }
        });
      } else {
        this.$message.error("请阅读并勾选《隐私政策》、《用户服务协议》");
      }
    },
    // 忘记密码
    forgetPass() {
      this.$router.push({
        name: "passAction",
        query: {
          type: "forget",
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
#login {
  height: 100%;
  background-color: #f6f8ff;
  overflow: hidden;
  position: relative;
}
.inputInfo {
  position: absolute;
  top: 80px;
  right: 200px;
  width: 300px;
  z-index: 10;
  background: #ffffff;
  box-shadow: 0px 3px 8px 0px rgba(0, 123, 255, 0.26);
  border-radius: 5px;
  padding: 30px;
  .inputInfo_title {
    font-size: 30px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #007bff;
    line-height: 40px;
    text-align: center;
    padding: 10px 0;
  }
  .inputInfo_subTitle {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #b9bec5;
    line-height: 16px;
    text-align: center;
    margin-bottom: 26px;
  }
  .userName,
  .password {
    width: 100%;
  }
  .userName_tip,
  .password_tip {
    height: 20px;
    color: red;
    font-size: 12px;
    line-height: 20px;
  }
  .inputType {
    cursor: pointer;
  }
  .loginBtn {
    width: 100%;
  }
  .aboutPass {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #b9bec5;
    line-height: 16px;
    margin-bottom: 10px;
    > p {
      cursor: pointer;

      > span {
        margin-left: 3px;
      }
    }
    > p:hover {
      color: #409eff !important;
    }
    > p:nth-of-type(1) {
      display: flex;
      align-items: center;
      > img {
        margin-right: 5px;
      }
    }
  }
  .argument {
    cursor: pointer;
    border-top: 1px solid #f1f2f4;
    font-size: 12px;
    padding-top: 20px;
    display: flex;
    align-items: center;
    > img {
      margin-right: 3px;
    }
  }
  .argument span:hover {
    color: #409eff !important;
  }
}
</style>