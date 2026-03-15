<template>
  <div class="app">
    <h1>Конвертер валют</h1>

    <CurrencyRow
      v-for="(c, index) in selected"
      :key="c.code"
      :currency="c"
      :rate="rates[c.code]"
      :isBase="index === 0"
      :baseAmount="baseAmount"
      @updateBase="updateBase"
      @updateRate="updateRate(index, $event)"
      @remove="removeCurrency(index)"
    />

    <button class="add" @click="showSearch = true">+ добавить валюту</button>

    <CurrencySearch v-if="showSearch" @select="addCurrency" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import CurrencyRow from "./components/CurrencyRow.vue";
import CurrencySearch from "./components/CurrencySearch.vue";
import { fetchRates } from "./services/exchangeService";

const STORAGE_KEY = "currency-converter-state";

const selected = ref([]);

const rates = ref({});

const baseAmount = ref(100);

const showSearch = ref(false);

function updateBase(val) {
  baseAmount.value = val;
}

function updateRate(index, data) {
  selected.value[index].customRate = data.customRate;
  selected.value[index].manualRate = data.manualRate;
}

function removeCurrency(index) {
  selected.value.splice(index, 1);
}

async function loadRates(base) {
  rates.value = await fetchRates(base);
}

async function addCurrency(currency) {
  selected.value.push({
    code: currency.code,
    name: currency.name,
    customRate: false,
    manualRate: null,
  });

  showSearch.value = false;

  if (selected.value.length === 1) {
    await loadRates(currency.code);
  }
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      selected: selected.value,
      baseAmount: baseAmount.value,
    }),
  );
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return;

  const data = JSON.parse(saved);

  selected.value = data.selected || [];
  baseAmount.value = data.baseAmount || 100;
}

watch(
  [selected, baseAmount],
  () => {
    saveState();
  },
  { deep: true },
);

onMounted(async () => {
  loadState();

  if (selected.value.length > 0) {
    await loadRates(selected.value[0].code);
  }
});
</script>
