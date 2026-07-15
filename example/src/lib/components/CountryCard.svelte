<script lang="ts">
  import type { GetCountriesByContinentQuery } from "src/graphql/generated.svelte";

  let { country, href }: { country: GetCountriesByContinentQuery["continent"]["countries"][number]; href: string } = $props();
</script>

<a {href} class="flex items-center gap-3 rounded-container bg-surface-700 p-4 transition-colors hover:bg-primary-900/50 hover:ring-2 hover:ring-primary-500">
  <span class="text-2xl">{country.emoji}</span>
  <div>
    <span class="block text-surface-50">{country.name}</span>
    <span class="text-sm text-surface-400">{country.capital || "N/A"}</span>
  </div>
</a>
