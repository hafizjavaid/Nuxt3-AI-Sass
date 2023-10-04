<template>
  <div class="flex items-center p-4">
    <MobileSidebar />
    <div class="flex w-full justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline">
            <Icon name="lucide:user-circle" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-72 left-[100px]">
          <DropdownMenuLabel>Account Details</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div class="w-full flex align-items-center p-2 pl-3">
            <Avatar class="mr-2">
              <AvatarImage
                v-if="user?.user_metadata.avatar_url"
                :src="user?.user_metadata.avatar_url"
              />
              <AvatarFallback>
                {{ user?.email?.charAt(0).toUpperCase() }}
                {{ user?.email?.charAt(1).toUpperCase() }}
              </AvatarFallback>
            </Avatar>

            <div>
              <div class="font-bold">{{ user?.user_metadata.full_name }}</div>
              <div class="text-sm">{{ user?.email }}</div>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="logout">
            <Icon class="mr-2 h-4 w-4" name="i-heroicons-arrow-left-on-rectangle" />
            <span class="ml-2">Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabaseClient = useSupabaseClient();
const router = useRouter();
const menu = ref();
const toggle = (event: any) => {
  menu.value.toggle(event);
};
const logout = async () => {
  await supabaseClient.auth.signOut();
  router.push('/auth');
};
</script>

<style scoped></style>
