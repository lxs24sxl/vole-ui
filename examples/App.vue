<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />

    <vo-resize @resize="test2" :immediate="false" type="throttle" delay="600">
      <div style="margin: 0 10px;">{{ rect2 }}</div>
    </vo-resize>

    <HelloWorld
      v-resize.quiet="test"
      vue-resize-type="debounce"
      vue-resize-delay="600"
      msg="Welcome to Your Vue.js App"
    />
    {{ rect }}
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      rect: {},
      rect2: {}
    };
  },
  methods: {
    test(el, rect) {
      this.rect = rect;
    },
    test2(el, rect) {
      this.rect2 = rect;
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
