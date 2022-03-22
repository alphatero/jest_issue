<template>
  <div class="flex justify-center">
    <Card :title="$t('Correction')" class="w-full lg:w-9/12">
      <div class="rounded-b-md bg-white p-2 sm:p-10">
        <div
          class="mx-auto mb-16 grid max-w-lg grid-cols-4 gap-1 text-base lg:gap-10 lg:text-lg"
        >
          <div
            v-for="(item, key) in steps"
            :key="key"
            :class="[
              'py-2',
              $route.name === item.path
                ? 'border-b-4 kemp:border-kemp hr:border-highright lucent:border-lucent'
                : '',
            ]"
          >
            <p
              :class="[
                'px-2 text-center font-bold uppercase',
                $route.name === item.path
                  ? 'kemp:text-kemp hr:text-highright lucent:text-lucent'
                  : 'text-gray-400',
              ]"
            >
              {{ item.title }}
            </p>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
const steps = [
  {
    path: "CorrectionStep1",
    title: "Step1",
  },
  {
    path: "CorrectionStep2",
    title: "Step2",
  },
  {
    path: "CorrectionStep3",
    title: "Step3",
  },
  {
    path: "CorrectionStep4",
    title: "Step4",
  },
];
</script>
