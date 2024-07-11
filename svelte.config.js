import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
    $app: '/node_modules/@sveltejs/kit/assets/app',
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}
