<script setup lang="ts">
import type { Event } from '@/types'
import { computed, ref } from 'vue'
import EventModalComponent from '@/components/EventModalComponent.vue'

import { formatTime, formatDate } from '@/FormatUtils'

const props = defineProps<{
  event: Event
}>()

const showDetails = ref(false)

const timeStatus = computed(() => {
  const now = new Date()
  const start = new Date(props.event.date + 'T' + props.event.start_time)
  const end = new Date(props.event.date + 'T' + props.event.end_time)
  if (now < start) return 'future'
  if (now > end) return 'past'
  return 'current'
})
</script>

<template>
  <div class="event" :class="{ past: timeStatus == 'past' }">
    <div class="info">
      <div>
        <span class="material-symbols-outlined"> calendar_month </span>
        {{ formatDate(event.date) }}
        <div>
          <span class="material-symbols-outlined"> schedule </span>
          {{ formatTime(event.start_time) }} - {{ formatTime(event.end_time) }}
        </div>
        <span v-if="timeStatus == 'current'">(En cours)</span>
        <span v-else-if="timeStatus == 'future'">(À venir)</span>
        <span v-else-if="timeStatus == 'past'">(Passé)</span>
      </div>
      <button class="material-symbols-outlined details-button" @click="showDetails = true">info</button>
    </div>

    <h1>{{ event.event_type }}: {{ event.title }}</h1>
    <h2>
      <span class="speaker">{{ event.speaker_last_name.toUpperCase() }} {{ event.speaker_first_name }} </span>
      <span v-if="event.speaker_from != ''"> ({{ event.speaker_from }}) </span>
    </h2>
    <p class="theme">({{ event.theme }})</p>
    <Transition>
      <EventModalComponent v-if="showDetails" :event="event" @close="showDetails = false" />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.event {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background-color: var(--theme-panel);
  border: 1px solid var(--theme-border-color);
  border-radius: 5px;
  width: 100%;
  gap: 0.1rem;
  font-size: 0.8rem;

  &.past {
    background-color: var(--theme-panel-secondary);

    button {
      background-color: var(--theme-panel-tertiary);

      &:hover {
        background-color: var(--theme-panel);
      }
    }

    .actions button,
    .actions a {
      background-color: transparent;

      &:hover {
        background-color: var(--theme-panel);
      }
    }
  }

  button {
    background-color: var(--theme-panel-secondary);
    color: var(--theme-text);
    border: none;
    border-radius: 5px;
    font-size: 0.8rem;
    cursor: pointer;

    &:hover {
      background-color: var(--theme-panel-tertiary);
    }
  }

  .info {
    display: flex;
    align-self: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    gap: 0.2rem;
    font-size: 0.8rem;

    .material-symbols-outlined {
      font-size: 1.2rem;
    }

    .details-button {
      font-size: 1.2rem;
      border-radius: 50%;
      background-color: transparent;

      &.material-symbols-outlined {
        font-size: 1.4rem;
      }
    }

    div {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.2rem;
      margin: 0;
    }

    &.right {
      left: auto;
      right: 10px;
    }
  }

  h1 {
    text-align: center;
    text-wrap: wrap;
    margin: 0;
    font-size: 1rem;
  }

  h2 {
    margin: 0;
    font-size: 0.9rem;

    .speaker {
      font-weight: bold;
      color: var(--main-color);
    }
  }

  h3 {
    margin: 0;
    font-size: 0.9rem;
  }
}
</style>
