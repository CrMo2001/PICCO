<template>
  <div id="graphics-view"></div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as PICCO from '../grammar/index.mjs';

// 根据代码生成图形
function renderGraphics(code: string) {
  try {
    const container = document.getElementById('graphics-view')
    const func = new Function('PICCO', 'container', code);
    func(PICCO, container)
  } catch (error) {
    console.error('代码执行错误:', error)
  }
  // const ctx = canvas.value?.getContext('2d')
  // if (ctx) {
  //   ctx.clearRect(0, 0, 400, 400) // 清空画布
  //   try {
  //     // 动态执行代码（注意安全性）
  //     new Function('ctx', code)(ctx)
  //   } catch (error) {
  //     console.error('代码执行错误:', error)
  //   }
  // }
}

defineExpose({ renderGraphics })
</script>

<style scoped>
.graphics-view {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}
</style>
