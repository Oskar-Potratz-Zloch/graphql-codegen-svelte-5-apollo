<script lang="ts">
  import type { GetContinentsQuery } from "src/graphql/generated.svelte";

  let { continent, href }: { continent: GetContinentsQuery["continents"][number]; href: string } = $props();
</script>

<a {href} class="flex items-center gap-3 rounded-container bg-surface-700 p-4 transition-colors hover:bg-primary-900/50 hover:ring-2 hover:ring-primary-500">
  <span class="text-2xl font-bold text-primary-500">{continent.code}</span>
  <span class="text-surface-100">{continent.name}</span>
</a>
