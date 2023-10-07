<template>
  <div>
    <div
      v-if="isLoading || pending"
      class="p-8 rounded-lg w-full flex items-center justify-center bg-muted"
    >
      <Loader />
      <!-- <div class="text-red-900 text-5xl">Loading....</div> -->
    </div>
    <div v-else class="px-4 lg:px-8 space-y-4">
      <div class="text-muted-foreground text-sm">
        {{
          isPro ? 'You are currently on a Pro plan.' : 'You are currently on a free plan.'
        }}
      </div>
      <Button
        class="shadow-none bg-gray-950 text-white"
        v-if="isPro"
        :disabled="isLoading || pending"
        @click="manageSubscription"
      >
        Manage Subscription
      </Button>
      <Button
        v-else
        variant="premium"
        :disabled="isLoading || pending"
        @click="manageSubscription"
      >
        Upgrade
        <Icon name="lucide:zap" class="w-4 h-4 ml-2 fill-white" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(false);
// const isPro = ref(false);
const manageSubscription = async () => {
  isLoading.value = true;
  const { data } = await useFetch('/api/stripe');
  console.log(data.value?.url);

  if (data.value) {
    // @ts-ignore
    window.location.href = data.value.url;
  }
  console.log('DONE WITH URL');

  isLoading.value = false;
};

const { data: isPro, pending } = await useFetch('/api/stripe/checkStatus');
</script>

<style scoped></style>
