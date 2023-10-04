<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
  <Sheet>
    <SheetTrigger as-child >
      <Button variant="outline" class="md:hidden pr-4 hover:opacity-75 transition">
        <Icon name="lucide:menu" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left"  class="p-0 bg-white">
      <Sidebar  />
    </SheetContent>
  </Sheet>
</template>
