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
    <div class="copyleft">
      <p>🄯 Copyleft <a href="https://ladyrin.dev">Alex Letellier</a></p>
    </div>
  </main>
</template>

<style scoped lang="scss">
.copyleft {
  position: fixed;
  bottom: 0;
  right: 10px;
  color: var(--theme-text-color);
  font-size: 0.7rem;

  a {
    color: var(--theme--color);

    &:visited {
      color: var(--theme-text-color);
    }
  }
}
</style>
