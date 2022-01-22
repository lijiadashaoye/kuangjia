<template>
  <ul v-show="show" @mouseleave="show = false">
    <li
      :class="{ select: select === t }"
      @click="changePage(t)"
      v-for="t of list"
      :key="t"
    >
      {{ t }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      show: false,
      select: "",
    };
  },
  created() {
    this.$axios.get("nav").then((res) => {
      this.list = res.list;
      this.show = res.show;
    });
  },
  methods: {
    changePage(t) {
      if (t.name !== this.$store.state.page) {
        this.select = t;
        this.$axios.get(t).then((res) => {
          this.$store.commit("chagePage", res.name);
        });
      }
    },
  },
};
</script>

<style lang="scss">
ul {
  padding: 10px;
  height: 100%;
  overflow-y: scroll;
  background: silver;
  li {
    padding: 6px 0;
    margin-bottom: 5px;
    &:hover {
      background: slateblue;
      cursor: pointer;
    }
  }
}
.select {
  background: rgb(66, 9, 9);
  color: #fff;
}
</style>