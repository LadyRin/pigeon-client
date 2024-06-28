<script setup lang="ts">
import EventListView from '@/components/EventListView.vue'
import { onMounted } from 'vue'

onMounted(() => {
  document.body.className = 'light'
})
</script>

<template>
  <main>
    <EventListView />
  </main>
</template>

<style scoped lang="scss"></style>
