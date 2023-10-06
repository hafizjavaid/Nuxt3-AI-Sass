<template>
  <div>
    <Heading
      title="Code Generation"
      description="Generate code using descriptive text."
      icon="lucide:code"
      iconColor="text-green-700"
      bgColor="bg-green-700/10"
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
                placeholder="Simple toggle button using react headlessui/vue?"
                class="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent w-full"
              />
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

        <Empty
          v-if="messages.length === 0 && !isLoading"
          label="No conversation started."
        />

        <div class="flex flex-col-reverse gap-y-4">
          <div
            v-for="message in messages"
            :key="message.content"
            :class="`p-8 w-full flex
               items-start gap-x-8 rounded-lg ${
                 message.role === 'user'
                   ? 'bg-white border border-black/10'
                   : 'bg-slate-200'
               }`"
          >
            <UserAvatar v-if="message.role === 'user'" />
            <BotAvatar v-if="message.role === 'assistant'" />
            <div
              v-if="message.content"
              class="prose-pre:overflow-auto prose-pre:w-full prose-pre:my-2 prose-pre:bg-black/10 prose-pre:p-2 prose-pre:rounded-lg prose-code:bg-black/10 prose-code:rounded-lg prose-code:p-1 text-sm overflow-hidden leading-7"
              v-html="$mdRenderer.render(message.content)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatCompletionRequestMessage } from '~/types';
import { useProModal } from '@/store/useProModal';
const proModal = useProModal();
const prompt = ref('');
const isLoading = ref(false);
const messages = ref<ChatCompletionRequestMessage[]>([]);
const { $mdRenderer } = useNuxtApp();
const submitPrompt = async () => {
  isLoading.value = true;
  const userMessage: ChatCompletionRequestMessage = {
    role: 'user',
    content: prompt.value,
  };
  const newMessages = [...messages.value, userMessage];
  const { data, error } = await useFetch('/api/code', {
    method: 'POST',
    body: {
      messages: newMessages,
    },
  });
  if (error.value) {
    console.log(error);
    if (error.value.statusCode === 403) {
      proModal.onOpen();
    }
  }
  if (data.value) {
    messages.value = [
      ...messages.value,
      userMessage,
      {
        role: 'assistant',
        content: data.value.content as string,
      },
    ];
    await refreshNuxtData('userData');
  }
  prompt.value = '';
  isLoading.value = false;
};
</script>

<style scoped></style>
