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
        const data: any;
        const pictures: { name: string; url: string }[];
      }`,
      'ts:filename/globals.d.ts',
    )

    // console.log(monaco.languages.typescript.typescriptDefaults.getExtraLibs())
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      allowNonTsExtensions: true,
      // allowJs: true,
      // checkJs: true,
      noEmit: true,
      // strict: true,
      // typeRoots: ['node_modules/@types'],
    })

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      diagnosticCodesToIgnore: [1375],
    })

    editor = monaco.editor.create(editorContainer.value, {
      value: 
`await PICCO.show([
    // objects to show
], container, { pictures });
`, // 初始代码
      language: 'typescript', // 编程语言
      theme: 'vs',
      // theme: 'light', // 编辑器主题
      automaticLayout: true, // 自动调整布局
      minimap: { enabled: false }, // 关闭缩略图
    })

    // 监听代码变化
    editor.onDidChangeModelContent(() => {
      emit('code-change')
    })
  }
})

function getCode() {
  const tsCode = editor?.getValue()
  if (!tsCode) return ''
  console.log('tsCode', tsCode)
  const jsCode = typescript.transpileModule(tsCode, {
    compilerOptions: {
      module: typescript.ModuleKind.CommonJS,
      target: typescript.ScriptTarget.ESNext,
    },
  }).outputText
  console.log('jsCode', jsCode)
  return jsCode
}

function setCode(code: string) {
  editor?.setValue(code)
  emit('code-change')
}

type EmitType = {
  (event: 'code-change'): void
}

const emit = defineEmits<EmitType>()

defineExpose({
  getCode,
  setCode,
})
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
