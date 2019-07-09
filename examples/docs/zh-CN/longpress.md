##  Longpress 长按指令

长按指令

### 1.1 指令用法

#### 1.1.1 用法
在需要长按指令的节点上添加`v-longpress`，并赋值相应的加载方法, 可实现长按时长结束时，自动执行方法
:::demo
```html
<template>
  <button 
    class="longpress-wrap"
    v-longpress="handleLongpressEvent">
    button
  </button>
</template>

<script>
export default {
  data () {
    return {
      options: {
        endStamp: 1562638917679,
        rangeOfTime: 1001,
        startStamp: 1562638916678
      }
    }
  },

  methods: {
    /**
     * 监听长按事件
     * @params {Object} options 返回参数
     */
    handleLongpressEvent(options) {
      this.options = options || {}
    }
  }
}
</script>
```

#### 1.1.2 Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| v-longpress  | 长按结束回调的函数 | function | — | - |
| vue-longpress-duration     | 长按时间 | string    | — | 2000 |

#### 1.1.3 Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| longpress  | 长按结束回调的函数 | {startStamp(开始时间戳)/endStamp(结束时间戳)/rangeOfTime(实际使用时间)} |