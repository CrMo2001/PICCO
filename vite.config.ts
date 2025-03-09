import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import monacoEditorPluginModule from 'vite-plugin-monaco-editor';
import markdown from 'unplugin-vue-markdown/vite'
import copy from 'rollup-plugin-copy';

const isObjectWithDefaultFunction = (module: unknown): module is { default: typeof monacoEditorPluginModule } => (
  module != null &&
  typeof module === 'object' &&
  'default' in module &&
  typeof module.default === 'function'
)

const monacoEditorPlugin = isObjectWithDefaultFunction(monacoEditorPluginModule)
  ? monacoEditorPluginModule.default
  : monacoEditorPluginModule


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/], // <-- allows Vue to compile Markdown files
      }),
      vueDevTools(),
      monacoEditorPlugin({}),
      markdown({}),
      copy({
        targets: [
          { src: 'src/grammar/grammar.mjs', dest: 'dist' },
        ],
        hook: 'writeBundle',
      }),
    ],
    base: mode === 'development' ? '/' : '/PICCO/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
