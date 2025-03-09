<script setup lang="ts">
import { defineProps } from 'vue'
// import vueMarkdown from 'vue-markdown'
defineProps<{
  example: string
}>()
</script>

<template>
  <div class="common-layout">this is the home view</div>
  <!-- <vueMarkdown>test **test**</vueMarkdown> -->
</template>
