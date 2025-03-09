<template>
  <div class="editor-container">
    <div class="tool-bar">
      <div class="editor-title">PICCO Editor</div>
      <el-button class="tool-bar-button" @click="handleLoad">Load</el-button>
      <el-button class="tool-bar-button" @click="handleSave">Save</el-button>
      <el-button class="tool-bar-button" @click="handleRun">Run</el-button>
      <el-button class="tool-bar-button" @click="handleBack">Back</el-button>
    </div>
    <div class="editor-page">
      <!-- 左侧容器 -->
      <div class="left-container" :style="{ width: leftWidth + 'px' }">
        <!-- 左上角：图形显示 -->
        <div class="graphics-section" :style="{ height: graphicsHeight + 'px' }">
          <GraphicsView ref="graphicsView" />
        </div>

        <!-- 上下拖动条 -->
        <div class="horizontal-drag-bar" @mousedown="startVerticalDrag"></div>

        <!-- 左下角：日志显示 -->
        <!-- <div class="assets-section"> -->
        <div
          class="assets-section"
          :style="{ height: pageHeight - graphicsHeight - 8 - 48 + 'px' }"
        >
          <AssetsView ref="assetsView" />
        </div>
      </div>

      <!-- 左右拖动条 -->
      <div class="vertical-drag-bar" @mousedown="startHorizontalDrag"></div>

      <!-- 右侧：代码编辑器 -->
      <div class="editor-section" :style="{ width: pageWidth - leftWidth - 8 + 'px' }">
        <!-- <div class="editor-section"> -->
        <CodeEditor @code-change="handleCodeChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import GraphicsView from '../components/GraphicsView.vue'
import AssetsView from '../components/AssetsView.vue'
import CodeEditor from '../components/CodeEditor.vue'
import { useRouter } from 'vue-router'

const graphicsView = ref<InstanceType<typeof GraphicsView> | null>(null)
const assetsView = ref<InstanceType<typeof AssetsView> | null>(null)

// 页面高度
const pageHeight = ref(window.innerHeight)
const pageWidth = ref(window.innerWidth)

// 左侧容器宽度（初始为页面高度的 60%）
const leftWidth = ref(pageWidth.value * 0.6)
const isHorizontalDragging = ref(false)

// 图形显示区域高度（初始为页面高度的 60%）
const graphicsHeight = ref(pageHeight.value * 0.5)
const isVerticalDragging = ref(false)

// 处理代码变化
function handleCodeChange(code: string) {
  if (graphicsView.value) {
    graphicsView.value.renderGraphics(code) // 更新图形
  }
  if (assetsView.value) {
    // logView.value.addLog(`代码更新: ${code}`) // 添加日志
  }
}

// 开始水平拖动（调整宽度）
function startHorizontalDrag() {
  isHorizontalDragging.value = true
  document.addEventListener('mousemove', onHorizontalDrag)
  document.addEventListener('mouseup', stopHorizontalDrag)
}

// 水平拖动中
function onHorizontalDrag(event: MouseEvent) {
  console.log(event)
  if (isHorizontalDragging.value) {
    leftWidth.value = event.clientX // 根据鼠标位置调整宽度
  }
}

// 停止水平拖动
function stopHorizontalDrag() {
  isHorizontalDragging.value = false
  document.removeEventListener('mousemove', onHorizontalDrag)
  document.removeEventListener('mouseup', stopHorizontalDrag)
}

// 开始垂直拖动（调整高度）
function startVerticalDrag() {
  isVerticalDragging.value = true
  document.addEventListener('mousemove', onVerticalDrag)
  document.addEventListener('mouseup', stopVerticalDrag)
}

// 垂直拖动中
function onVerticalDrag(event: MouseEvent) {
  if (isVerticalDragging.value) {
    graphicsHeight.value = event.clientY // 根据鼠标位置调整高度
  }
}

// 停止垂直拖动
function stopVerticalDrag() {
  isVerticalDragging.value = false
  document.removeEventListener('mousemove', onVerticalDrag)
  document.removeEventListener('mouseup', stopVerticalDrag)
}

function handleResize() {
  pageHeight.value = window.innerHeight
  pageWidth.value = window.innerWidth

  // 限制左侧容器宽度和图形显示区域高度
  leftWidth.value = Math.min(leftWidth.value, pageWidth.value - 100)
  graphicsHeight.value = Math.min(graphicsHeight.value, pageHeight.value - 100)
}

function handleLoad() {}

function handleSave() {}

function handleRun() {}

function handleBack() {
  const router = useRouter()
  router.push('/')
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.editor-container {
  /* display: flex;
  flex-direction: column; */
  height: 100vh;
}

.tool-bar {
  display: flex;
  gap: 8px;
  padding: 6px;
  /* background-color: #f0f0f0; */
  border-bottom: 4px solid #eee;
  flex: 0 0 auto;
}

.editor-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
  padding: 2px;
  /* border-bottom: 2px solid #409eff; */
  color: #777;
}

.tool-bar-button {
  margin: 0;
  border-radius: 0;
}

.editor-page {
  display: flex;
  height: calc(100vh - 48px);
}

.left-container {
  min-width: 200px;
  display: flex;
  flex-direction: column;
}

.graphics-section {
  border: 1px solid #ccc;
  min-height: 200px;
}

.assets-section {
  flex: 1;
  border: 1px solid #ccc;
  min-height: 200px;
  /* background-color: #ccc; */
}

.horizontal-drag-bar {
  height: 4px;
  flex-shrink: 0;
  background-color: #eee;
  cursor: ns-resize; /* 鼠标样式 */
}

.vertical-drag-bar {
  width: 4px;
  flex-shrink: 0;
  background-color: #eee;
  cursor: ew-resize; /* 鼠标样式 */
}

.editor-section {
  min-width: 400px;
  flex: 1;
  border: 1px solid #ccc;
}
</style>
