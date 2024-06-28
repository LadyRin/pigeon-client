<script setup lang="ts">
</script>

<template>
  <div class="container">
    <h1>Évènements</h1>
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
      <EventComponent v-for="event in events" :key="event.id" :event="event" @delete="deleteEvent(event)" />
    </div>
    <div v-else>
      <p>Aucun événement trouvé</p>
    </div>
    <PaginationMenu
      v-if="pagination.pageCount > 1"
      v-model:page="pagination.page"
      v-model:items-per-page="pagination.itemsPerPage"
      :pagination="pagination"
      @fetch="fetchEvents"
      :optionValues="[5, 10, 20, 50]" />
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 0 50px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: clamp(400px, 100%, 1000px);
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
  gap: 1rem;
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
