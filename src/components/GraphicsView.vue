<template>
  <div id="graphics-view"></div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as PICCO from '../grammar/index.mjs'

// 根据代码生成图形
async function runCode(
  code: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assets: { data: any; pictures: { name: string; url: string }[] },
) {
  try {
    const container = document.getElementById('graphics-view')
    const func = new Function('PICCO', 'container', 'data', 'pictures', code)
    func(PICCO, container, assets.data, assets.pictures)
    console.log('finished running code')
  } catch (error) {
    console.error('代码执行错误:', error)
  }
}

defineExpose({ runCode })
</script>

<style scoped>
#graphics-view {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style>
#graphics-view svg {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
