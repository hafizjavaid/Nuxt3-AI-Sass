<template>
  <div class="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
    <div class="px-3 py-2 flex-1">
      <NuxtLink to="/dashboard" class="flex items-center pl-3 mb-14">
        <div class="relative h-8 w-8 mr-4">
          <img alt="Logo" src="/logo.svg" />
        </div>
        <h1 class="text-2xl font-bold">MultiGeniX</h1>
      </NuxtLink>
      <div class="space-y-1">
        <NuxtLink
          v-for="route in routes"
          :key="route.link"
          :to="route.link"
          class="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
          :class="{
            'text-white bg-white/10': currentRoute.path === route.link,
            'text-zinc-400': currentRoute.path !== route.link,
          }"
        >
          <div class="flex items-center flex-1">
            <Icon :name="route.icon" :class="`h-5 w-5 mr-3 ${route.color}`" />
            {{ route.label }}
          </div>
        </NuxtLink>
      </div>
    </div>
    <!-- Free Counter -->
  </div>
</template>

<script setup lang="ts">
const currentRoute = useRoute();
const routes = ref(dashboardRoutes);
</script>

<style scoped></style>
