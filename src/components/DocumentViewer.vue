<template>
  <div class="markdown-page">
    <!-- 左侧导航栏 -->
    <div class="sidebar">
      <!-- <div v-for="fileDir in fileNames" :key="fileDir.category"> -->
      <!-- <div class="list-title">{{ fileDir.category }}</div> -->
      <ul>
        <li
          v-for="file in files"
          :key="file.name"
          @click="selectFile({ name: file.name })"
          :class="{ active: selectedFile === file.name }"
        >
          {{ file.name }}
        </li>
      </ul>
      <!-- </div> -->
    </div>

    <!-- 右侧 Markdown 内容 -->
    <div class="content">
      <component :is="selectedComponent" v-if="selectedComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import '../assets/css/markdown-theme.css'
import { ref, computed, defineAsyncComponent } from 'vue'

type Props = {
  fileRecords: Record<string, () => Promise<typeof import('*.md')>>
}

const props = defineProps<Props>()

const pathToName = (path: string) => {
  return path.match(/\/\d+([^\/]*)\.md$/)?.[1] || ''
}

// const fileCategorys = [
//   { category: 'API References', files: import.meta.glob('../static/apiReference/*.md') },
//   { category: 'Tutorial', files: import.meta.glob('../static/tutorial/*.md') },
// ]
// const fileRecords = import.meta.glob('../static/**/*.md')

// const fileNames: { category: string; files: string[] }[] = []
const files = Object.keys(props.fileRecords).map((path) => {
  const name = pathToName(path)
  return {
    name,
    component: defineAsyncComponent(() => props.fileRecords[path]() as Promise<typeof import('*.md')>),
  }
})

// const files = fileCategorys
//   .map((fileCategory) => {
//     const fileList = Object.keys(fileCategory.files).map((path) => {
//       const name = pathToName(path)
//       return {
//         name,
//         component: defineAsyncComponent(
//           () => fileCategory.files[path]() as Promise<typeof import('*.md')>,
//         ),
//       }
//     })
//     fileNames.push({ category: fileCategory.category, files: fileList.map((file) => file.name) })
//     return fileList
//   })
//   .flat()

const selectedFile = ref(files[0].name) // 默认选中第一个文件
const selectedComponent = computed(() => {
  return files.find((file) => file.name === selectedFile.value)?.component
})

function selectFile(file: { name: string }) {
  selectedFile.value = file.name
}
</script>

<style scoped>
.markdown-page {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar .list-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.sidebar li {
  margin-bottom: 10px;
  cursor: pointer;
}

.sidebar li.active {
  font-weight: bold;
  color: #42b983;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
