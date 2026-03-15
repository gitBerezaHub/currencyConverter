<template>

  <div class="currency-row">

    <div class="header">

      <div class="title">
        {{currency.name}}
        <span>{{currency.code}}</span>
      </div>

      <input
          v-if="isBase"
          v-model.number="amount"
          class="amount"
      />

      <div v-else class="amount">
        {{converted}}
      </div>

    </div>

    <div class="rate">

      <div
          :class="{inactive: customRate}"
      >
        Официальный курс: {{ formatNumber(rate) }}
      </div>

      <label>

        <input
            type="checkbox"
            v-model="customRate"
        />

        поменять курс

      </label>

      <input
          v-if="customRate"
          v-model.number="manual"
          class="manual"
      />

    </div>

  </div>

</template>

<script setup>

import { computed, ref, watch } from "vue"
import { formatNumber } from "../utils/format"

const props = defineProps({
  currency:Object,
  rate:Number,
  baseAmount:Number,
  isBase:Boolean
})

const amount = ref(props.baseAmount)

watch(amount,val=>{
  emit("updateBase",val)
})

const customRate = ref(false)

const manual = ref(props.rate)

const emit = defineEmits(["updateBase"])

const activeRate = computed(() =>
    customRate.value ? manual.value : props.rate
)

const converted = computed(() =>
    formatNumber(props.baseAmount * activeRate.value)
)

</script>