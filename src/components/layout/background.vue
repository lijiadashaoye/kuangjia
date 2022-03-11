
<template>
  <div>
    <div class="forLogo">
      <span>结合node的框架</span>
    </div>
    <!-- 软件特色介绍 -->
    <div
      v-if="systemData"
      class="mainInfoWap"
      :style="{ height: `${systemData.mainInfoData.length * 33 + 120}px` }"
    >
      <div
        class="mainInfo"
        :style="{ height: `${systemData.mainInfoData.length * 33 + 110}px` }"
      >
        <div
          class="mainInfoList"
          :style="{ height: `${systemData.mainInfoData.length * 33 + 110}px` }"
        >
          <p class="infoTitle">代码工厂总体功能建主要涵盖：</p>
          <ul>
            <li v-for="t of systemData.mainInfoData" :key="t.id">
              <i class="el-icon-check"></i>
              <span>{{ t.text }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 背景 -->
    <div class="backgroundAnimation" v-if="!time">
      <div style="positon: relative; height: 100%">
        <div class="one"></div>
        <div class="two" ref="two"></div>
        <div class="four" ref="four"></div>
        <div class="five" ref="five"></div>
      </div>
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
export default {
  data() {
    return {
      systemData: null, // 有关软件的一些数据
      time: null,
      dialog: {
        // 点击隐私政策的介绍弹框
        title: "",
        visible: false,
        content: "",
      },
    };
  },
  mounted() {
    this.aboutBackground();
  },

  methods: {
    showText(text) {
      this.dialog.title = text;
      this.dialog.content =
        text === "隐私政策" ? this.systemData.yinsi : this.systemData.xieyi;
      this.dialog.visible = true;
    },
    // 页面背景相关
    aboutBackground() {
      this.$axios.get("/system").then((res) => {
        this.systemData = res;
        this.$emit("systemDataEmit", {
          xieyi: this.systemData.xieyi,
          yinsi: this.systemData.yinsi,
          versionData: this.systemData.versionData,
        });
        this.makeBackground();
        this.$notify({
          duration: 3000,
          position: "top-right",
          showClose: false,
          dangerouslyUseHTMLString: true,
          message:
            '<div id="newChangeHTML" style="display: flex;justify-content:space-between;"></div>',
        });
        this.$nextTick(() => {
          let newChangeHTML = document.getElementById("newChangeHTML"),
            img = document.createElement("img"),
            div = document.createElement("div"),
            ul = document.createElement("ul");

          img.style = "width:100%;height:100%;";
          img.src = require("@/assets/img/juese.png");

          div.style = "width: 105px;height: 60px;flex-shrink: 0;";
          ul.style =
            "width: calc(100% - 120px);font-size: 12px;font-family: MicrosoftYaHei;color: #606c7d;line-height: 28px;";
          div.appendChild(img);
          newChangeHTML.appendChild(div);
          newChangeHTML.appendChild(ul);
          for (let i = 0; i < this.systemData.tip.length; i++) {
            let li = document.createElement("li");
            li.innerHTML = `${i + 1}、${this.systemData.tip[i]}`;
            ul.appendChild(li);
          }
        });
      });
    },
    // 画背景图
    makeBackground() {
      // 画键盘
      let two = document.createElement("div"),
        four = document.createElement("div"),
        five = document.createElement("div"),
        // 上下交错恩渐变条
        twoNum = Math.floor(this.$refs.two.offsetWidth / 5),
        left = 0;
      function random(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
      }
      for (let i = twoNum; i--; ) {
        let width = random(2, 20);
        left += random(10, 130) + width;
        if (left > this.$refs.two.offsetWidth - 30) {
          break;
        }
        let span = document.createElement("span"),
          direction = Math.trunc(Math.random() * 10) % 6;
        span.style = `
                display: inline-block;
                position:absolute;
                left:${left}px;
                width: ${width}px;
                height: ${random(3, 8) * 10}%;
                border-radius: 10px;
                top:-100%;
                background: ${
                  direction
                    ? "linear-gradient(transparent 10%, #409eff 100%)"
                    : "linear-gradient( #409eff 0%,transparent 90%)"
                };
                animation: ${
                  direction ? "toDown" : "toUp"
                } ease-in 15s  infinite;
                animation-delay:${random(0.001, 3)}s
             `;
        two.appendChild(span);
      }
      // 画从下向上的小蝌蚪
      let twoNum2 = Math.floor(this.$refs.two.offsetWidth / 100),
        left2 = 0;
      for (let i = twoNum2; i--; ) {
        let width = random(5, 15);
        left2 += random(20, 250) + width;
        if (left2 > this.$refs.four.offsetWidth - 50) {
          break;
        }
        let span = document.createElement("span");
        span.className = "pointSpan";
        span.style = `
                display: inline-block;
                position:absolute;
                left:${left2}px;
                width:${width}px;
                height:${width}px;
                background: #409eff;
                outline: 1px solid #409eff;
                outline-offset: 3px;
                border-radius: 50%;
                animation:toUp ease-in 10s infinite;
                animation-delay:${random(0.001, 5)}s;
                top:-100%;
             `;
        document.styleSheets[0].insertRule(
          `.pointSpan::after {  content: ""; position: absolute; width: 2px; 
          height: 100px; background: linear-gradient(#409eff 0, transparent 100%); left:40%; top: calc(100% + 3px);}`
        );
        four.appendChild(span);
      }
      // 画从左向右的文字条
      let bottomNum = random(20, 30);
      for (let i = this.systemData.featureList.length; i--; ) {
        let span = document.createElement("span");
        bottomNum += random(10, 20);
        span.innerHTML = this.systemData.featureList[i];
        span.style = `
                display: inline-block;
                position:absolute;
                bottom:${bottomNum}%;
                padding:5px 15px 5px 40px;
                border-radius:0 20px 20px 0;
                animation:toRight ease-in 15s infinite;
                animation-delay:${random(0.01, 3)}s;
                font-size: 18px;
                font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                font-weight: bold;
                color: #FFFFFF;
                line-height: 21px;
                  left: -30%;
                background:linear-gradient(to left, #409eff 0%, transparent 100%);
 
             `;
        five.appendChild(span);
      }
      setTimeout(() => {
        this.$refs.two.appendChild(two);
        this.$refs.four.appendChild(four);
        this.$refs.five.appendChild(five);
      }, 300);
    },
  },
};
</script>

<style scoped lang="scss">
.backgroundAnimation {
  position: absolute;
  left: 130px;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000;
  .two,
  .four {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 20px;
  }

  .one {
    position: absolute;
    right: 0;
    top: 15%;
    left: 48%;
    bottom: 0;
    // background: url("../../assets/img/logo.png") no-repeat;
    background: url("../../assets/img/package.json.jpg") no-repeat;
    background-size: 100% 100%;
  }

  .two {
    z-index: 2;
    > div {
      position: relative;
      height: 100%;
    }
  }
  .four {
    z-index: 3;
    > div {
      position: relative;
      height: 100%;
    }
  }
  .five {
    position: absolute;
    left: 0;
    top: 47%;
    bottom: 20px;
    right: 0;
    z-index: 5;
    > div {
      position: relative;
      height: 100%;
    }
  }
}
.forLogo {
  position: absolute;
  top: 30px;
  left: 130px;
  z-index: 9;
  font-size: 60px;
}
.mainInfoWap {
  display: inline-block;
  position: absolute;
  top: 120px;
  left: 130px;
  width: 447px;
  z-index: 6;
  background: linear-gradient(
    165deg,
    #87c2fc 0%,
    rgba(250, 253, 255, 0.09) 100%
  );
  box-shadow: 0px 3px 8px 0px rgba(156, 190, 227, 0.39);
  border-radius: 56px;
  border: 1px solid #ffffff;
  .mainInfo {
    display: inline-block;
    position: absolute;
    top: 27px;
    left: 33px;
    width: 552px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.51) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 37px;
    border: 1px solid #ffffff;
    .mainInfoList {
      display: inline-block;
      position: absolute;
      top: 7px;
      left: 6px;
      width: 552px;
      min-height: 160px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.51) 0%,
        rgba(255, 255, 255, 0) 100%
      );
      border-radius: 37px;
      border: 1px solid #ffffff;
      .infoTitle {
        padding: 30px 5px 5px 47px;
        font-size: 24px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #007bff;
        line-height: 31px;
        margin-bottom: 12px;
      }
      li {
        font-size: 16px;
        font-family: AppleColorEmoji;
        color: #101821;
        line-height: 30px;
        padding: 3px 0 0 47px;
      }
    }
  }
}
</style>
