<template>
  <Avatar v-if="user?.user_metadata.avatar_url" class="mr-2">
    <AvatarImage :src="user?.user_metadata.avatar_url" />
    <AvatarFallback>
      {{ user?.email?.charAt(0).toUpperCase() }}
      {{ user?.email?.charAt(1).toUpperCase() }}
    </AvatarFallback>
  </Avatar>
  <Avatar v-else-if="user?.user_metadata.full_name" class="mr-2">
    {{
      user.user_metadata.full_name.split(' ')[0].charAt(0).toUpperCase() +
      ' ' +
      user.user_metadata.full_name.split(' ')[1].charAt(0).toUpperCase()
    }}
  </Avatar>
  <Avatar v-else class="mr-2">
    {{ user?.email?.charAt(0).toUpperCase() }}
    {{ user?.email?.charAt(1).toUpperCase() }}
  </Avatar>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
</script>

<style scoped></style>
