<template>
  <Dialog :open="proModal.isOpen" @update:open="proModal.onClose">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="flex justify-center items-center flex-col gap-y-4 pb-2">
          <div class="flex items-center gap-x-2 font-bold text-xl">
            Upgrade to Genius
            <Badge variant="premium" class="uppercase text-sm py-1"> pro </Badge>
          </div>
        </DialogTitle>
        <DialogDescription class="text-center pt-2 space-y-2 text-zinc-900 font-medium">
          <Card
            v-for="tool in tools"
            :key="tool.link"
            @click="navigateTo(`${tool.link}`)"
            class="p-3 border-black/5 flex items-center justify-between"
          >
            <div class="flex items-center gap-x-4">
              <div :class="`p-2 w-fit rounded-md ${tool.bgColor}`">
                <Icon :name="tool.icon" :class="`w-8 h-8 ${tool.color}`" />
              </div>

              <div class="font-semibold">{{ tool.label }}</div>
            </div>
            <Icon name="lucide:check" class="w-5 h-5 text-primary" />
          </Card>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button size="lg" variant="premium" class="w-full">
          Upgrade
          <Icon name="lucide:zap" class="w-4 h-4 ml-2 fill-white" />
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
const proModal = useProModal();
</script>

<style scoped></style>
