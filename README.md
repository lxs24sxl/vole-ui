# vole-ui
A Vue.js 2.0 Easy UI Toolkit for Web


## Install
```shell
npm install vole-ui -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import VoleUI from 'vole-ui'

Vue.use(VoleUI)
```

## components

### resize (directive and component) （[Document](https://github.com/lxs24sxl/vole-ui/blob/master/examples/docs/zh-CN/resize.md)）

```html
<template>
  <div class="test-wrap">
    <vo-resize 
      @resize="handleResizeEvent" 
      :immediate="false"
      :delay="500"
      :type="throttle">
      <div>{{rect}}</div>
    </vo-resize>

    <div 
      v-resize.quiet="handleResizeEvent" 
      vue-resize-delay="600" 
      vue-resize-type="debounce">
      {{rect}}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Test extends Vue {
  rect = {};

  oldRect = {};

  handleResizeEvent (el, rect, oldRect) {
    this.rect = rect
    this.oldRect = oldRect
  }
}
</script>
```
