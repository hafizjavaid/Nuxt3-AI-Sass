<template>
  <div class="w-full min-h-screen flex items-center">
    <div class="max-w-[800px] w-full mx-auto items-center">
      <Card>
        <template #title>
          <div class="text-center py-4">Welcome to MultiGeniX</div>
        </template>
        <!-- <template #subtitle> Card subtitle </template> -->
        <template #content>
          <Auth
            :appearance="{
              theme: ThemeSupa,
              style: {
                button: {
                  borderRadius: borderRadius,
                  borderColor: 'rgba(0,0,0,0.1)',
                },
                input: {
                  borderRadius: borderRadius,
                },
              },
              variables: {
                default: {
                  colors: {
                    brand: brandColor,
                    brandAccent: `gray`,
                  },
                },
              },
            }"
            :supabaseClient="supabaseClient"
            :providers="['github', 'google']"
            :socialLayout="socialLayout"
            show-links
            redirect-to="/"
          />
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import predefined theme
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@nuxtbase/auth-ui-vue';

const supabaseClient = useSupabaseClient();

const radii = ['5px', '10px', '20px'] as const;
const colors = [
  'rgb(16, 185, 129)',
  'rgb(139, 92, 246)',
  'rgb(217, 70, 239)',
  'rgb(14, 165, 233)',
  'rgb(245, 158, 11)',
] as const;

const socialAlignments = ['horizontal', 'vertical'] as const;

const brandColor = ref(colors[0]);
const borderRadius = ref(radii[0]);
const socialLayout = ref(socialAlignments[0]);
definePageMeta({
  layout: 'home',
});
</script>

<style scoped></style>
