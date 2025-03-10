<template>
  <div class="editor-container">
    <div class="tool-bar">
      <div class="editor-title">PICCO Editor</div>
      <el-button class="tool-bar-button" @click="handleOpen">Open</el-button>
      <el-dropdown>
        <el-button class="tool-bar-button">
          Export<el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExportWorkspace">Workspace</el-dropdown-item>
            <el-dropdown-item @click="handleExportSVG">as SVG</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button class="tool-bar-button" @click="handleRun">Run</el-button>
      <el-button class="tool-bar-button" @click="handleBack">Quit</el-button>
    </div>
    <div class="editor-page">
      <!-- 左侧容器 -->
      <div class="left-container" :style="{ width: leftWidth + 'px' }">
        <!-- 左上角：图形显示 -->
        <div class="graphics-section" :style="{ height: graphicsHeight + 'px' }">
          <GraphicsView ref="graphicsView" @compileFinish="handleCompileFinish" />
        </div>

        <!-- 上下拖动条 -->
        <div class="horizontal-drag-bar" @mousedown="startVerticalDrag"></div>

        <!-- 左下角：素材管理与日志显示 -->
        <!-- <div class="assets-section"> -->
        <div
          class="assets-section"
          :style="{ height: pageHeight - graphicsHeight - 8 - 48 + 'px' }"
        >
          <AssetsView ref="assetsView" @assets-change="handleAssetsChange" />
        </div>
      </div>

      <!-- 左右拖动条 -->
      <div class="vertical-drag-bar" @mousedown="startHorizontalDrag"></div>

      <!-- 右侧：代码编辑器 -->
      <div class="editor-section" :style="{ width: pageWidth - leftWidth - 8 + 'px' }">
        <!-- <div class="editor-section"> -->
        <CodeEditor @code-change="handleCodeChange" ref="codeEditor" />
      </div>
    </div>
  </div>
  <el-dialog v-model="openDialogVisible" title="Open" width="65%">
    <div style="padding: 10px">Open Examples</div>
    <div class="example-card-container">
      <el-card
        v-for="example in exampleList"
        :key="example.name"
        shadow="hover"
        class="example-card"
        body-class="example-card-body"
        @click="openWorkspaceByUrl(example.workspace)"
      >
        <img class="example-image" :src="example.image" />
        <div>{{ example.name }}</div>
      </el-card>
    </div>

    <el-divider></el-divider>
    <div style="padding: 10px">Or Open From File</div>

    <el-upload
      ref="workspaceUpload"
      multiple
      :on-change="handleFileChange"
      accept=".json"
      auto-upload="false"
      drag
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    </el-upload>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import GraphicsView from '../components/GraphicsView.vue'
import AssetsView from '../components/AssetsView.vue'
import CodeEditor from '../components/CodeEditor.vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import type { DataTable } from '@/components/DataManager.vue'
import { examplesInfo, exampleWorkspaces } from '@/examples'
import type { ElUpload, UploadFile } from 'element-plus'

const graphicsView = ref<InstanceType<typeof GraphicsView> | null>(null)
const assetsView = ref<InstanceType<typeof AssetsView> | null>(null)
const codeEditor = ref<InstanceType<typeof CodeEditor> | null>(null)
const workspaceUpload = ref<InstanceType<typeof ElUpload> | null>(null)
const openDialogVisible = ref(false)

const router = useRouter()

const exampleList = ref(examplesInfo)

// 页面高度
const pageHeight = ref(window.innerHeight)
const pageWidth = ref(window.innerWidth)

// 左侧容器宽度（初始为页面高度的 50%）
const leftWidth = ref(pageWidth.value * 0.5)
const isHorizontalDragging = ref(false)

// 图形显示区域高度（初始为页面高度的 50%）
const graphicsHeight = ref(pageHeight.value * 0.5)
const isVerticalDragging = ref(false)

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
  // leftWidth.value = Math.min(leftWidth.value, pageWidth.value - 100)
  // graphicsHeight.value = Math.min(graphicsHeight.value, pageHeight.value - 100)
}

function handleOpen() {
  openDialogVisible.value = true
  return
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const workspace = JSON.parse(content)
        openWorkspace(workspace)
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

function handleFileChange(uploadFile: UploadFile) {
  if (uploadFile.raw === undefined) {
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target?.result as string
    const workspace = JSON.parse(content)
    openWorkspace(workspace)
  }
  reader.readAsText(uploadFile.raw)
  openDialogVisible.value = false

  if (workspaceUpload.value) {
    workspaceUpload.value.clearFiles()
  }
}

function openWorkspaceByUrl(url: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exampleWorkspaces[url]().then((workspace: any) => {
    openWorkspace(workspace)
  })
  openDialogVisible.value = false
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function openWorkspace(workspace: any) {
  if (assetsView.value === null || codeEditor.value === null) {
    return
  }
  const assets = workspace.assets as {
    dataTables: DataTable[]
    pictures: { name: string; url: string }[]
  }
  assetsView.value.setAssets(assets.dataTables, assets.pictures)
  codeEditor.value.setCode(workspace.code)
}

function handleExportSVG() {
  const element = document.getElementById('graphics-view')
  const svgElement = element?.querySelector('svg')
  if (svgElement) {
    const svg = svgElement.outerHTML
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'graphics.svg'
    a.click()
    URL.revokeObjectURL(url)
  }
}

function handleExportWorkspace() {
  if (assetsView.value === null || codeEditor.value === null) {
    return
  }
  const assets = assetsView.value.getWorkSpace()
  const code = codeEditor.value.getCode()
  const workspace = {
    assets,
    code,
  }
  const json = JSON.stringify(workspace, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'workspace.json'
  a.click()
  URL.revokeObjectURL(url)
}

function handleRun() {
  RunCode()
}

function handleBack() {
  console.log(router)
  router.push('/')
}

function RunCode() {
  if (assetsView.value === null || codeEditor.value === null) {
    return
  }
  if (graphicsView.value === null) {
    return
  }
  const assets = assetsView.value.getAssets()
  const code = codeEditor.value.getCode()
  graphicsView.value.runCode(code, assets)
}

let timer: NodeJS.Timeout | null = null
function proposeRun() {
  if (timer !== null) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    RunCode()
  }, 500)
}

function handleCompileFinish(message: string, success: boolean) {
  if (success) {
    assetsView.value?.setLog('Run successfully', 'success')
  } else {
    assetsView.value?.setLog(message, 'danger')
  }
}

function handleAssetsChange() {
  proposeRun()
}

function handleCodeChange() {
  proposeRun()
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

.tool-bar-button-right {
  margin-left: auto;
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

.example-card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  /* padding: 10px; */
  max-height: 300px;
  overflow-y: auto;
}

.example-card {
  width: calc(25% - 20px);
  cursor: pointer;
}

.example-image {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
<style>
.example-card-body {
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
