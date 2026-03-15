<template>
  <div class="currency-row">
    <div class="header">
      <div class="title">
        {{ currency.name }}
        <span>{{ currency.code }}</span>
      </div>

      <button class="remove" @click="$emit('remove')">✕</button>

      <input v-if="isBase" v-model.number="amount" class="amount" />

      <div v-else class="amount">
        {{ converted }}
      </div>
    </div>

    <div class="rate">
      <div :class="{ inactive: localCustomRate }">
        Официальный курс: {{ formatNumber(rate) }}
      </div>

      <label>
        <input type="checkbox" v-model="localCustomRate" @change="emitRate" />

        поменять курс
      </label>

      <input
        v-if="localCustomRate"
        v-model.number="localManualRate"
        class="manual"
        @input="emitRate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { formatNumber } from "../utils/format";

const props = defineProps({
  currency: Object,
  rate: Number,
  baseAmount: Number,
  isBase: Boolean,
});

const emit = defineEmits(["updateBase", "updateRate", "remove"]);

const amount = ref(props.baseAmount);

watch(amount, (val) => {
  emit("updateBase", val);
});

const localCustomRate = ref(props.currency.customRate);
const localManualRate = ref(props.currency.manualRate || props.rate);

function emitRate() {
  emit("updateRate", {
    customRate: localCustomRate.value,
    manualRate: localManualRate.value,
  });
}

const activeRate = computed(() => {
  return localCustomRate.value ? localManualRate.value : props.rate;
});

const converted = computed(() => {
  return formatNumber(props.baseAmount * activeRate.value);
});
</script>
