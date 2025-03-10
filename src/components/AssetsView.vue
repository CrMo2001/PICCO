<template>
  <el-tabs type="card" v-model="activeName" class="assets-view">
    <el-tab-pane label="Data" name="data" class="tab-pane">
      <DataManager ref="dataManager" @data-table-change="emit('assets-change')" />
    </el-tab-pane>
    <el-tab-pane label="Picture" name="picture" class="tab-pane">
      <PictureManager ref="pictureManager" @picture-change="emit('assets-change')" />
    </el-tab-pane>
    <el-tab-pane label="Log" name="log" class="tab-pane">
      <el-text :type='logType' size="large" class="log-message">
        {{ log }}
      </el-text>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import DataManager, { type DataTable } from './DataManager.vue'
import PictureManager from './PictureManager.vue'
import { ref } from 'vue'

const activeName = ref('data')
const dataManager = ref<InstanceType<typeof DataManager> | null>(null)
const pictureManager = ref<InstanceType<typeof PictureManager> | null>(null)

const log = ref('')
const logType = ref('info')

type EmitType = {
  (event: 'assets-change'): void
}

const emit = defineEmits<EmitType>()

function getAssets() {
  if (!dataManager.value || !pictureManager.value) {
    return {
      data: {},
      pictures: [],
    }
  }
  return {
    data: dataManager.value.getData(),
    pictures: pictureManager.value.getPictures(),
  }
}

function getWorkSpace() {
  const dataTables = dataManager.value?.getDataTables() || []
  const pictures = pictureManager.value?.getPictures() || []
  return {
    dataTables,
    pictures,
  }
}

function setAssets(dataTables: DataTable[], pictures: { name: string; url: string }[]) {
  if (dataManager.value && pictureManager.value) {
    dataManager.value.setDataTables(dataTables)
    pictureManager.value.setPictures(pictures)
  }
}

function setLog(message: string, type: 'info' | 'success' | 'warning' | 'danger') {
  // window.alert(message)
  log.value = message
  logType.value = type
}

defineExpose({
  getAssets,
  getWorkSpace,
  setAssets,
  setLog,
})
</script>

<style scoped>
.assets-view {
  height: 100%;
}

.tab-pane {
  height: 100%;
}

.log-message {
  padding: 20px;
}
</style>
