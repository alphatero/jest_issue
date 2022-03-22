<template>
  <div class="flex justify-between rounded-lg border-2 border-gray-400">
    <button
      v-if="control"
      @click="decrement"
      :disabled="Number(modelValue) <= min"
      class="mb-1 mt-0.5 ml-0.5 rounded-l-lg px-3 text-center text-white"
      :class="[
        Number(modelValue) <= min
          ? 'shadow-disabled pointer-events-none bg-gray-200'
          : ' bg-gray-400 shadow-dark hover:bg-gray-600 active:bg-gray-600 active:shadow-none',
      ]"
      tabindex="-1"
    >
      -
    </button>
    <input
      id="numberInput"
      class="w-full rounded-lg px-2 text-center focus:outline-none"
      ref="input"
      :name="name"
      :value="modelValue"
      type="text"
      :max="max"
      :min="min"
      :precision="precision"
      :step="step"
      @input="handleEmit"
    />
    <button
      v-if="control"
      @click="increment"
      class="mb-1 mt-0.5 mr-0.5 rounded-r-lg bg-gray-400 px-3 text-center text-white shadow-dark hover:bg-gray-600 active:bg-gray-600 active:shadow-none"
      :class="[
        Number(modelValue) >= max
          ? 'shadow-disabled pointer-events-none bg-gray-200'
          : ' bg-gray-400 shadow-dark hover:bg-gray-600 active:bg-gray-600 active:shadow-none',
      ]"
      tabindex="-1"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, defineEmits, watch, ref, onUpdated } from "vue";

const props = defineProps({
  name: String,
  modelValue: {
    default: 0,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  precision: {
    type: Number,
    validator(val: Number) {
      return val >= 0 && Number.isInteger(val);
    },
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  },
  control: {
    type: Boolean,
    default: false,
  },
  change: {
    type: Boolean,
    default: true,
  },
  isNegtive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const input = document.getElementById("numberInput") as HTMLInputElement;

const state = reactive({
  numericValue: 0,
  handler: Function,
});

const step = ref(props.step);

const newValue = ref(props.modelValue.toString());

function decrement() {
  let value = 0;
  if (!isNaN(Number(props.modelValue))) {
    value = Number(props.modelValue);
  }
  let newNumber = toPrecision((value -= props.step), props.precision);
  if (newNumber >= props.max) {
    newNumber = props.max;
  }
  if (newNumber <= props.min) {
    newNumber = props.min;
  }
  emit("update:modelValue", newNumber);
}

function increment() {
  let value = 0;
  if (!isNaN(Number(props.modelValue))) {
    value = Number(props.modelValue);
  }
  let newNumber = toPrecision((value += props.step), props.precision);
  if (newNumber >= props.max) {
    newNumber = props.max;
  }
  if (newNumber <= props.min) {
    newNumber = props.min;
  }
  emit("update:modelValue", newNumber);
}

function toPrecision(val: number, precision: number) {
  const newPrecision = precision + 1;
  return newPrecision !== undefined
    ? parseFloat(val.toFixed(newPrecision).slice(0, -1))
    : val;
}

function negativeValidate(val: string) {
  return /(?!.*(.).*\1)\-?0?(?!.*(.).*\1)\.?0?0?/g.test(val);
}

function filterPrecicion(target: HTMLInputElement) {
  if (target.value.includes(".") && Number(target.value)) {
    console.log("this", Number(target.value));
    const precv = target.value.split(".")[1].length;
    if (precv > 2) {
      target.value = target.value.slice(0, -1);
    }
  }
  return;
}

function filterRange(target: HTMLInputElement) {
  console.log("num", Number(target.value));
  if (Number(target.value) > props.max) {
    target.value = props.max.toString();
  }
  if (Number(target.value) < props.min) {
    target.value = props.min.toString();
  }
}

function handleNegative(target: HTMLInputElement) {
  if (negativeValidate(target.value)) {
    console.log("neg");
    if (target.value === "" || Number(target.value)) {
      console.log("hi");
      filterPrecicion(target);
    } else {
      console.log("yo");
      return true;
    }
  }
}

function handleEmit(e: Event) {
  const target = <HTMLInputElement>e.target;
  console.log(target.value);
  if (props.isNegtive) {
    console.log("ne");
    if (handleNegative(target)) return;
  }
  filterPrecicion(target);
  console.log("out");
  filterRange(target);

  console.log("end", target.value);
  if (isNaN(Number(target.value)) && target.value.length > 0) {
    console.log("slice");
    target.value = target.value.slice(0, -1);
  }
  emit("update:modelValue", Number(target.value));
}
</script>
