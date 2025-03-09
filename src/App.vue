<template>
  <header>
    <div class="wrapper">
      <TopNav v-if="showTopNav" />
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import TopNav from './components/TopNav.vue'

const route = useRoute()
const showTopNav = computed(() => route.path !== '/editor')
</script>
