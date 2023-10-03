<template>
  <div class="flex items-center p-4">
    <MobileSidebar class="md:hidden" />
    <div class="flex w-full justify-end">
      <div
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        class="border rounded-full text-white bg-slate-600 w-8 h-8 flex justify-center items-center"
      >
        <Icon name="lucide:user-circle" />
      </div>

      <Menu ref="menu" id="overlay_menu" :popup="true" style="width: 300px">
        <template #start>
          <button
            class="w-full p-link border-b flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
          >
            <Avatar
              class="mr-2"
              shape="circle"
              v-if="user?.user_metadata.avatar_url"
              :image="user?.user_metadata.avatar_url"
            />
            <Avatar
              :label="`${user?.email?.charAt(0).toUpperCase()}${user?.email
                ?.charAt(1)
                .toUpperCase()}`"
              class="mr-2"
              shape="circle"
              v-else
            />
            <div class="">
              <div class="font-bold">{{ user?.user_metadata.full_name }}</div>
              <div class="text-sm">{{ user?.email }}</div>
            </div>
          </button>
        </template>

        <template #end>
          <Button
            class="w-full cursor-pointer p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
            @click="logout"
          >
            <Icon name="i-heroicons-arrow-left-on-rectangle" />
            <span class="ml-2">Log Out</span>
          </Button>
        </template>
      </Menu>
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
