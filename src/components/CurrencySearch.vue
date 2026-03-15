<template>
  <div class="search-overlay">
    <input
      v-model="query"
      placeholder="Введите валюту..."
      class="search-input"
    />

    <div class="results">
      <div
        v-for="item in filtered"
        :key="item.code"
        class="result"
        @click="select(item)"
      >
        {{ item.name }}
        <span class="code">{{ item.code }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { currencies } from "../data/currencies";

const emit = defineEmits(["select"]);

const query = ref("");

const filtered = computed(() => {
  return Object.entries(currencies)
    .map(([code, name]) => ({ code, name }))
    .filter((c) => c.name.toLowerCase().includes(query.value.toLowerCase()));
});

function select(item) {
  emit("select", item);
}
</script>
