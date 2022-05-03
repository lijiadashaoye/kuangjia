<template>
  <div
    :class="{
      subMenu: !$store.state.showNav,
    }"
  >
    <template v-for="item in navList">
      <el-submenu :key="item.id" :index="item.id" v-if="item.children">
        <template>
          <i :class="item.icon" slot="title" style="margin-right: 0"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <Submenu :navList="item.children"></Submenu>
      </el-submenu>

      <!-- 情况二：没子集的情况 -->
      <el-menu-item :key="item.id" v-else :index="item.id">
        <i :class="item.icon" style="margin-right: 0"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  // vue允许组件模板调用自身，此时我们就可以根据组件的 name 属性来指定为标签。
  name: "Submenu",
  props: ["navList"],
};
</script>

<style lang="scss">
.elMenu {
  .subMenu {
    .el-submenu__title {
      text-align: center;
    }
    i {
      margin: 0 !important;
    }
    .el-submenu__icon-arrow {
      display: none !important;
    }

    .el-submenu__title span {
      display: none !important;
    }

    .el-submenu__title .el-icon-location {
      margin: 0;
    }
  }
}
.el-menu--vertical .subMenu .el-submenu__title span {
  display: inline-block !important;
}
</style>