<template>
  <div class="data-manager">
    <el-tabs
      v-model="activeName"
      type="card"
      tabPosition="left"
      @tab-remove="handleTabRemove"
      @tab-change="handleTabChange"
      v-if="dataTables.length > 0"
    >
      <el-tab-pane
        v-for="item in dataTables"
        :key="item.name"
        :label="item.name"
        :name="item.name"
        closable
      >
        <DataTable :table-data="item.content" :columns="item.columns" :table-name="item.name" />
      </el-tab-pane>
      <!-- 添加数据标签页 -->
      <el-tab-pane :name="ADD_DATA" @click="uploadData">
        <template #label>
          <el-icon style="margin: 0 6px 0 0"><DocumentAdd /></el-icon><span>Add Data</span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <!-- 无数据时显示上传按钮 -->
    <div v-else>
      <el-empty :image-size="100" description="No data">
        <el-button type="primary" @click="uploadData">Upload Data</el-button>
      </el-empty>
    </div>
  </div>
  <!-- 上传数据弹窗 -->
  <!-- <el-dialog v-model="uploadDataPanelVisible" title="Upload data" width="70%" align-center>
    <el-upload
      drag
      action="#"
      :auto-upload="false"
      :on-change="handleFileChange"
      accept=".csv"
      multiple
      ref="uploadRef"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">support csv files only</div>
      </template>
    </el-upload>
  </el-dialog> -->
  <input
    ref="fileInput"
    type="file"
    accept=".csv"
    multiple="true"
    style="display: none"
    @change="handleFileChange"
  />
</template>

<script setup lang="ts">
// import type { UploadFile, UploadInstance } from 'element-plus'
import DataTable from './DataTable.vue'
import { ref } from 'vue'
import PaPa from 'papaparse'

export type DataTable = {
  name: string
  columns: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any[]
}

const ADD_DATA = 'Add Data'

const dataTables = ref([] as DataTable[])
const activeName = ref('data')
const uploadDataPanelVisible = ref(false)

// const uploadRef = ref<UploadInstance>()
const fileInput = ref<HTMLInputElement>()

function handleTabRemove(name: string) {
  const tags = dataTables.value
  const index = tags.findIndex((tag) => tag.name === name)
  tags.splice(index, 1)
  if (tags.length !== 0) {
    activeName.value = tags[Math.max(0, index - 1)].name
  }
  emit('data-table-change')
}

function handleTabChange(name: string) {
  if (name == ADD_DATA) {
    // prevent default tab change
    activeName.value = dataTables.value[0].name
    uploadData()
  }
}

function uploadData() {
  fileInput.value?.click()
}

function handleFileChange() {
  const target = fileInput.value
  if (!target) return
  const files = target.files
  if (!files) return
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      const content = e.target?.result as string
      addDataTable(file.name, content)
    }
    fileReader.readAsText(file)
  }
  uploadDataPanelVisible.value = false
  target.value = ''
}

function addDataTable(name: string, content: string) {
  // 解析 csv 文件
  const result = PaPa.parse(content, { header: true })

  const columns = result.meta.fields!
  const tableData = result.data
  // name 不重复
  if (dataTables.value.find((table) => table.name === name)) {
    let i = 2
    while (dataTables.value.find((table) => table.name === `${name}(${i})`)) {
      i++
    }
    name = `${name}(${i})`
  }
  // 将数字列转换为数字
  for (const column of columns) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isNumber = tableData.every((row: any) => {
      // console.log(row[column])
      return !isNaN(Number(row[column]))
    })
    // console.log(isNumber)
    if (isNumber) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tableData.forEach((row: any) => {
        row[column] = Number(row[column])
      })
    }
  }
  // console.log('add data table:', name, columns, tableData)
  dataTables.value.push({
    name,
    columns,
    content: tableData,
  })
  activeName.value = name
  emit('data-table-change')
}

function getData() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataObject = {} as any
  dataTables.value.forEach((table) => {
    dataObject[table.name] = table.content
  })
  return dataObject
}

function getDataTables() {
  return dataTables.value
}

function setDataTables(newDataTables: DataTable[]) {
  dataTables.value = newDataTables
  if (dataTables.value.length > 0) {
    activeName.value = dataTables.value[0].name
  }
  emit('data-table-change')
}

type EmitType = {
  (event: 'data-table-change'): void
}

const emit = defineEmits<EmitType>()

defineExpose({
  getData,
  getDataTables,
  setDataTables,
})
</script>

<style scoped>
.data-manager {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
