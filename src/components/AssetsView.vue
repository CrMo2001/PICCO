<template>
  <el-tabs type="card" v-model="activeName" class="assets-view">
    <el-tab-pane label="Data" name="data" class="tab-pane">
      <DataManager />
    </el-tab-pane>
    <el-tab-pane label="Picture" name="picture" class="tab-pane">
      <PictureManager />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import DataManager from './DataManager.vue'
import PictureManager from './PictureManager.vue'
import { ref } from 'vue'

const activeName = ref('data');

</script>

<style scoped>
.assets-view {
  height: 100%;
}

.tab-pane {
  height: 100%;
}
</style>
