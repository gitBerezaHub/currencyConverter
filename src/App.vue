<template>

  <div class="app">

    <h1>Конвертер валют</h1>

    <CurrencyRow
        v-for="(c,index) in selected"
        :key="c.code"
        :currency="c"
        :rate="rates[c.code]"
        :isBase="index===0"
        :baseAmount="baseAmount"
        @updateBase="updateBase"
    />

    <button
        class="add"
        @click="showSearch=true"
    >

      + добавить валюту

    </button>

    <CurrencySearch
        v-if="showSearch"
        @select="addCurrency"
    />

  </div>

</template>

<script setup>

import { ref, onMounted } from "vue"

import CurrencyRow from "./components/CurrencyRow.vue"
import CurrencySearch from "./components/CurrencySearch.vue"

import { fetchRates } from "./services/exchangeService"

const selected = ref([])

const rates = ref({})

const showSearch = ref(false)

const baseAmount = ref(100)

function updateBase(val){
  baseAmount.value = val
}

async function loadRates(base){

  rates.value = await fetchRates(base)

}

async function addCurrency(currency){

  selected.value.push(currency)

  showSearch.value=false

  if(selected.value.length === 1){

    await loadRates(currency.code)

  }

}

onMounted(()=>{})

</script>