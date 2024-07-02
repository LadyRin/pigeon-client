<script setup lang="ts">
import { formatDate, formatTime } from '@/FormatUtils'
import type { Event } from '@/types'
import { computed } from 'vue'
const props = defineProps<{
  event: Event
}>()

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
  <div class="background">
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
      </div>

      <h1>{{ event.event_type }}: {{ event.title }}</h1>
      <h2>
        <span class="speaker">{{ event.speaker_last_name.toUpperCase() }} {{ event.speaker_first_name }} </span>
        <span v-if="event.speaker_from != ''"> ({{ event.speaker_from }}) </span>
      </h2>
      <p class="theme">({{ event.theme }})</p>

      <div class="description" v-if="event.description != ''">
        <h3>Sommaire:</h3>
        <p>{{ event.description }}</p>
      </div>
      <button class="material-symbols-outlined close-icon" @click="$emit('close')">close</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;
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
  width: clamp(400px, 100%, 800px);
  gap: 0.2rem;
  font-size: 1rem;

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
    padding: 0.3rem;
    font-size: 0.8rem;
    cursor: pointer;

    &:hover {
      background-color: var(--theme-panel-tertiary);
    }

    &.close-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      border-radius: 50%;
      font-size: 1.4rem;

      &:hover {
        background-color: var(--theme-panel-tertiary);
        color: var(--main-color);
      }
    }
  }

  .info {
    display: flex;
    align-self: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    gap: 0.4rem;

    div {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.4rem;
      margin: 0;
    }

    &.right {
      left: auto;
      right: 10px;
    }
  }

  .description {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    font-size: 0.8rem;

    h3 {
      text-align: center;
      margin: 0;
      font-size: 1rem;
    }

    p {
      margin: 0;
      font-size: 1rem;
    }
  }

  h1 {
    text-align: center;
    text-wrap: wrap;
    margin: 0;
    font-size: 1.2rem;
  }

  h2 {
    margin: 0;
    font-size: 1rem;

    .speaker {
      font-weight: bold;
      color: var(--main-color);
    }
  }

  h3 {
    margin: 0;
    font-size: 1rem;
  }
}
</style>
