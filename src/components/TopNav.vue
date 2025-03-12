<template>
  <nav class="top-navbar">
    <!-- 左侧：Logo 和页面标签 -->
    <div class="left-section">
      <!-- Logo -->
      <div class="logo">
        <router-link to="/">PICCO</router-link>
      </div>

      <!-- 页面标签 -->
      <ul class="nav-links">
        <li v-for="link in links" :key="link.path">
          <router-link :to="link.path">{{ link.name }}</router-link>
        </li>
      </ul>
    </div>

    <!-- 右侧：Editor 按钮 -->
    <div class="right-section">
      <button class="editor-button" @click="handleEditorClick">Try Online</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
// 导航链接数据
const links = ref([
  { name: 'Home', path: '/' },
  // { name: 'Gallery', path: '/gallery' },
  { name: 'Documentation', path: '/documentation' },
  { name: 'Tutorial', path: '/tutorial' },
  // { name: 'About', path: '/about' },
])

// Editor 按钮点击事件
function handleEditorClick() {
  // 跳转到代码编辑器页面
  router.push('/editor')
}
</script>

<style scoped>
.top-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #2c3e50;
  color: white;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.left-section {
  display: flex;
  align-items: center;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 20px;
}

.nav-links li {
  margin-left: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #42b983;
}

.right-section {
  display: flex;
  align-items: center;
}

.editor-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.editor-button:hover {
  background-color: #3aa876;
}
</style>
