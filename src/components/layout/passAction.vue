<template>
  <div class="passWap">
    <div class="inputInfo">
      <p class="inputInfo_title">重置密码</p>
      <el-input
        class="userName"
        v-model="userName"
        placeholder="请输入用户名"
        size="small"
        clearable
      ></el-input>
      <p class="userName_tip">{{ userName_tip }}</p>
      <el-input
        size="small"
        class="password"
        v-model="password1"
        placeholder="请输入密码"
        :type="canSee ? 'text' : 'password'"
      >
        <i
          style="top: 20px"
          class="iconfont inputType"
          slot="suffix"
          v-if="!canSee"
          @click="canSee = !canSee"
          >&#xe6cb;</i
        >
        <i
          style="top: 20px"
          v-else
          class="iconfont inputType"
          slot="suffix"
          @click="canSee = !canSee"
          >&#xe674;</i
        >
      </el-input>
      <p class="password_tip">{{ password1_tip }}</p>
      <el-input
        size="small"
        class="password"
        v-model="password2"
        placeholder="请再次输入密码"
        :type="canSee ? 'text' : 'password'"
      >
        <i
          style="top: 20px"
          class="iconfont inputType"
          slot="suffix"
          v-if="!canSee"
          @click="canSee = !canSee"
          >&#xe6cb;</i
        >
        <i
          style="top: 20px"
          v-else
          class="iconfont inputType"
          slot="suffix"
          @click="canSee = !canSee"
          >&#xe674;</i
        >
      </el-input>

      <p class="password_tip">{{ password2_tip }}</p>
      <div class="aboutPass">
        <p
          @click="rember = !rember"
          :style="{ color: rember ? '#409EFF' : '#b9bec5' }"
        >
          <span style="font-weight: bold" class="el-icon-circle-check"></span>
          <span>记住密码</span>
        </p>
      </div>
      <div class="loginBtn">
        <el-button
          type="info"
          size="small"
          style="width: 80px"
          @click="toLogin(false)"
          >取 消</el-button
        >
        <el-button
          type="primary"
          size="small"
          style="width: 80px"
          @click="toLogin(true)"
          >确 定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      password1: "",
      password2: "",
      userName_tip: "",
      password1_tip: "",
      password2_tip: "",
      rember: false,
      canSee: false,
    };
  },
  computed: {
    type() {
      return this.$route.query.type === "forget";
    },
  },
  created() {},
  methods: {
    // 登录按钮
    toLogin(type) {
      let that = this;
      function toHidden() {
        setTimeout(() => {
          that.userName_tip = "";
          that.password1_tip = "";
          that.password2_tip = "";
        }, 3000);
      }
      if (type) {
        if (!this.userName) {
          this.userName_tip = "请输入用户名";
          toHidden();
          return;
        }
        if (!this.password1) {
          this.password1_tip = "请输入密码";
          toHidden();
          return;
        }
        if (!this.password2) {
          this.password2_tip = "请再次输入密码";
          toHidden();
          return;
        }
        if (this.password1 !== this.password2) {
          this.password2_tip = "两次密码输入不一致，请重新输入";
          toHidden();
          return;
        }
        if (this.rember) {
          this.$loStorage.set("userInfo", {
            userName: this.userName,
            password: this.password1,
            rember: true,
          });
        } else {
          this.$loStorage.clear("userInfo");
        }
        this.$router.push({
          name: "login",
        });
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.passWap {
  padding-top: 120px;
}
.inputInfo {
  margin: 0 auto;
  width: 360px;
  height: 300px;
  background: #ffffff;
  border-radius: 2px;
  padding: 30px 30px 0 30px;
  .inputInfo_title {
    font-size: 30px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #007bff;
    line-height: 30px;
    text-align: center;
    padding-bottom: 40px;
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
    padding-top: 10px;
    cursor: pointer;
  }
  .loginBtn {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .aboutPass {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #b9bec5;
    line-height: 16px;
    margin-bottom: 22px;
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
    }
  }
}
</style>