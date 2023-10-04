<template>
  <div class="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
    <div :class="`p-2 w-fit rounded-md ${bgColor}`">
      <Icon :name="icon" :class="`w-10 h-10 ${iconColor}`" />
    </div>
    <div>
      <h2 class="text-3xl font-bold">{{ title }}</h2>
      <p class="text-sm text-muted-foreground">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface HeadingProps {
  title: string;
  description: string;
  icon: string;
  iconColor?: string;
  bgColor?: string;
}
defineProps<HeadingProps>();
</script>
