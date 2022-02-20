<template>
  <div>
    <template v-for="item in navList">
      <el-submenu :key="item.id" :index="item.id" v-if="item.children">
        <template slot="title">
          <!-- v-show="$store.state.showNav" -->
          <i :class="item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <Submenu :navList="item.children"></Submenu>
      </el-submenu>
      <!-- 情况二：没子集的情况 -->
      <el-menu-item :key="item.id" v-else :index="item.id">
        <i :class="item.icon"></i>
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