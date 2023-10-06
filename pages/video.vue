<template>
  <div>
    <Heading
      title="Video Generation"
      description="Turn your prompt into video."
      icon="lucide:file-audio"
      iconColor="text-orange-700"
      bgColor="bg-orange-700/10"
    />
    <div class="px-4 lg:px-8">
      <div>
        <form
          @submit.prevent="submitPrompt"
          class="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
        >
          <div class="col-span-12 lg:col-span-10">
            <div class="m-0 p-0">
              <input
                v-model="prompt"
                placeholder="An astronaut riding a horse"
                class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full"
              />
              <!-- An astronaut riding a horse -->
              <!-- Clown fish swimming in a coral reef -->
            </div>
          </div>
          <Button
            class="col-span-12 lg:col-span-2 w-full shadow-none bg-gray-950 text-white"
            type="submit"
            :disabled="!prompt || isLoading"
          >
            Generate
          </Button>
        </form>
      </div>
      <div class="space-y-4 mt-4">
        <div
          v-if="isLoading"
          class="p-8 rounded-lg w-full flex items-center justify-center bg-muted"
        >
          <Loader />
        </div>

        <Empty v-if="!video && !isLoading" label="No video files generated." />

        <video
          v-if="video"
          controls
          class="w-full aspect-video mt-8 rounded-lg border bg-black"
        >
          <source :src="video" />
        </video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProModal } from '@/store/useProModal';
const proModal = useProModal();
const prompt = ref('');
const isLoading = ref(false);
const video = ref<string>();
const submitPrompt = async () => {
  isLoading.value = true;
  video.value = undefined;
  const { data, error } = await useFetch<string[]>('/api/video', {
    method: 'POST',
    body: {
      prompt: prompt.value,
    },
  });
  if (error.value) {
    console.log(error);
    if (error.value.statusCode === 403) {
      proModal.onOpen();
    }
  }
  if (data.value) {
    video.value = data.value[0];
    await refreshNuxtData('userData');
  }
  prompt.value = '';
  isLoading.value = false;
};
</script>
