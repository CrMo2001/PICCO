<template>
  <div>
    <el-table :data="tableData" border>
      <el-table-column
        v-for="column in columns"
        :key="column"
        :prop="column"
        :label="column"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'

// 定义组件的 Props
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData: any[]
  columns: string[]
  tableName: string
}

// 定义 Props
defineProps<Props>();
// const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped></style>
