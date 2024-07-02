<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { Event } from '@/types'
import { eventService } from '@/EventService'

import EventComponent from '@/components/EventComponent.vue'
import PaginationMenu from '@/components/PaginationMenu.vue'

const search = ref('')
const events = ref<Event[]>([])
const eventTypes = ref<string[]>([])
const themes = ref<string[]>([])
const years = ref<number[]>([])

const filters = ref({
  year: '',
  eventType: '',
  theme: ''
})

const pagination = ref({
  itemsLength: 0,
  itemsPerPage: 10,
  pageCount: 0,
  page: 1,
  pageStart: 0,
  pageStop: 0
})

const fetchEvents = () => {
  eventService.getAllPaginated(pagination.value.itemsPerPage, pagination.value.page, search.value, filters.value).then((res) => {
    events.value = res.results
    pagination.value.itemsLength = res.count
    pagination.value.pageCount = res.num_pages
    pagination.value.pageStart = res.start_index
    pagination.value.pageStop = Math.min(res.end_index, res.count)
    eventTypes.value = eventService.event_types
    themes.value = eventService.event_themes
    years.value = eventService.years
  })
}

onMounted(() => {
  fetchEvents()
})
</script>

<template>
  <div class="filters">
    <select v-model="filters.year" @change="fetchEvents">
      <option value="">Tous les ans</option>
      <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </select>
    <select v-model="filters.eventType" @change="fetchEvents">
      <option value="">Tous les types</option>
      <option v-for="eventType in eventTypes" :key="eventType" :value="eventType">{{ eventType }}</option>
    </select>
    <select v-model="filters.theme" @change="fetchEvents">
      <option value="">Tous les thèmes</option>
      <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
    </select>
  </div>
  <div class="container">
    <div class="header">
      <div class="search-bar">
        <span class="material-symbols-outlined search-icon">search</span>
        <input type="text" v-model="search" placeholder="Rechercher..." @keyup="fetchEvents" />
      </div>
      <PaginationMenu
        v-model:page="pagination.page"
        v-model:items-per-page="pagination.itemsPerPage"
        :pagination="pagination"
        @fetch="fetchEvents"
        :optionValues="[5, 10, 20, 50]" />
    </div>
    <div class="event-list" v-if="events.length > 0">
      <EventComponent v-for="event in events" :key="event.id" :event="event" />
    </div>
    <div v-else>
      <p>Aucun événement trouvé</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filters {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--theme-panel-secondary);
  border-radius: 5px;

  select,
  button {
    padding: 0.4rem;
    border: none;
    border-radius: 0.2rem;
    background: var(--theme-panel);
    color: var(--theme-color);

    &:focus {
      outline: none;
    }
  }

  button {
    cursor: pointer;

    &:hover {
      background-color: var(--theme-panel-secondary);
    }

    &:active {
      background-color: var(--theme-panel-tertiary);
    }
  }
}

.container {
  padding: 0 50px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: clamp(400px, 100%, 800px);
}

.header {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

input[type='text'] {
  padding: 0.4rem;
  border: none;
  border-radius: 0.2rem;
  background: transparent;
  color: var(--theme-color);

  &:focus {
    outline: none;
  }
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  border-bottom: 1px solid var(--theme-border-color);
  transition: border-color 0.2s;

  &:focus-within {
    border-color: var(--main-color);
  }

  .search-icon {
    user-select: none;
  }
}
</style>
