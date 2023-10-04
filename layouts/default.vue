<template>
  <div class="h-full relative">
    <div
      class="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80"
    >
      <Sidebar />
    </div>
    <main class="md:pl-72 pb-10">
      <Navbar />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
