<template>
  <DocumentViewer :fileRecords="fileRecords"/>
</template>

<script setup lang="ts">
import DocumentViewer from '@/components/DocumentViewer.vue'
const fileRecords = import.meta.glob('../static/apiReference/*.md') as Record<string, () => Promise<typeof import('*.md')>>
</script>
