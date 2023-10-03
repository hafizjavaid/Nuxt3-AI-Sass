<script setup lang="ts">
import { ref } from 'vue';
const openLeft = ref(false);
</script>

<template>
  <div v-bind="$attrs">
    <div class="flex flex-col items-center justify-center mx-auto space-y-3">
      <Button
        @click="openLeft = !openLeft"
        class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700 md:hidden"
      >
        <Icon name="lucide:menu" />
      </Button>
    </div>
    <SideMenu class="b bg-[#111827]" v-model:visible="openLeft">
      <Sidebar class="p-0" />
    </SideMenu>
  </div>
</template>
