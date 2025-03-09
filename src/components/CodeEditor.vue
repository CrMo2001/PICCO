<template>
  <div ref="editorContainer" class="code-editor"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as monaco from 'monaco-editor'
import * as typescript from 'typescript'
import PICCODeclartion from '../grammar/index.d.ts?raw'

const editorContainer = ref<HTMLElement | null>(null)
let editor: monaco.editor.IStandaloneCodeEditor | null = null

onMounted(async () => {
  if (editorContainer.value) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      PICCODeclartion,
      'ts:filename/PICCO.d.ts',
    )

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `
      import * as picco from 'PICCO';
      declare global {
        const container: HTMLElement;
        const PICCO: typeof picco;
      }`,
      'ts:filename/globals.d.ts',
    )

    console.log(monaco.languages.typescript.typescriptDefaults.getExtraLibs())

    editor = monaco.editor.create(editorContainer.value, {
      value: '', // 初始代码
      language: 'typescript', // 编程语言
      theme: 'vs',
      // theme: 'light', // 编辑器主题
      automaticLayout: true, // 自动调整布局
    })

    // 监听代码变化
    editor.onDidChangeModelContent(() => {
      const tsCode = editor?.getValue()
      if (!tsCode) return
      const jsCode = typescript.transpileModule(tsCode, {
        compilerOptions: { module: typescript.ModuleKind.CommonJS },
      }).outputText
      emit('code-change', jsCode)
    })
  }
})

const emit = defineEmits(['code-change'])
</script>

<style scoped>
.code-editor {
  width: 100%;
  height: 100%;
}

.code-editor.disable-events {
  pointer-events: none;
}
</style>
