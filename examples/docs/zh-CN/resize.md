##  Resize 屏幕调整监听

调整窗口大小并观察值的变化

### 1.1 指令用法

#### 1.1.1 用法
在需要监听屏幕改变的节点上添加`v-resize`，并赋值相应的加载方法, 可实现监听屏幕改变时自动执行方法
:::demo
```html
<template>
  <div 
    class="resize-wrap"
    v-resize.quiet="handleResizeEvent" 
    vue-resize-delay="600" 
    vue-resize-type="debounce">
    {{rect}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      rect: {},
      oldRect: {}
    }
  },

  methods: {
    /**
     * 监听节点事件
     * @parmas {DOM} el 当前节点
     * @params {Object} rect 节点属性
     * @params {Object} oldRect 变化前的节点属性
     */
    handleResizeEvent(el, rect, oldRect) {
      this.rect = rect
      this.oldRect = oldRect
    }
  }
}
</script>
```

#### 1.1.2 Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| v-resize  | 调用窗口大小调整的函数(.quiet修饰符:是否立即执行回调函数) | function | — | - |
| vue-resize-delay     | 回调方法 的延迟事件 | string    | — | 400 |
| vue-resize-type      | 回调方法 的类型 | string    | none/throttle/debounce | none |




### 1.2 节点用法

#### 1.2.1 用法
需要将监听屏幕改变到节点用 `vo-resize` 包裹起来, 只允许包裹一个节点, 否则将会报错
```html
<template>
  <vo-resize 
    @resize="handleResizeEvent" 
    :immediate="false"
    :delay="500"
    :type="throttle">
    <div>{{rect}}</div>
  </vo-resize>
</template>

<script>
export default {
  data () {
    return {
      rect: {},
      oldRect: {}
    }
  },

  methods: {
    /**
     * 监听节点事件
     * @parmas {DOM} el 当前节点
     * @params {Object} oldRect 变化前的节点属性
     */
    handleResizeEvent(el, rect, oldRect) {
      this.rect = rect
      this.oldRect = oldRect
    }
  }
}
</script>
```

#### 1.2.2 Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| immediate   | 是否立即执行回调函数 | boolean | — | false |
| delay     | 回调方法 的延迟事件 | string    | — | 400 |
| type      | 回调方法 的类型 | string    | none/throttle/debounce | none |

#### 1.2.3 Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| resize  | 节点改变后回调方法 | el(当前节点)/rect(节点属性)/oldRect(旧节点属性) |