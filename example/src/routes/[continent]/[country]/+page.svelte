<script lang="ts">
  let { data } = $props();
</script>

{#if data.country.loading}
  <div class="h-64 animate-pulse rounded-container bg-surface-700"></div>
{:else if data.country.error}
  <p class="text-error-500">{data.country.error.message}</p>
{:else if data.country.data?.country}
  {@const country = data.country.data.country}
  <article class="rounded-container bg-surface-700 p-6">
    <div class="mb-4 flex items-center gap-4">
      <span class="text-5xl">{country.emoji}</span>
      <div>
        <h1 class="text-2xl font-bold text-surface-50">{country.name}</h1>
        <p class="text-surface-400">{country.native}</p>
      </div>
    </div>

    <hr class="mb-4 border-t-2 border-surface-600" />

    <dl class="grid grid-cols-2 gap-3 text-sm">
      <dt class="font-semibold text-surface-400">Capital</dt>
      <dd class="text-surface-100">{country.capital || "N/A"}</dd>

      <dt class="font-semibold text-surface-400">Currency</dt>
      <dd class="text-surface-100">{country.currency || "N/A"}</dd>

      <dt class="font-semibold text-surface-400">Continent</dt>
      <dd class="text-surface-100">{country.continent.name}</dd>

      <dt class="font-semibold text-surface-400">Languages</dt>
      <dd class="text-surface-100">
        {country.languages.map((l) => l.name).join(", ")}
      </dd>

      <dt class="font-semibold text-surface-400">States/Provinces</dt>
      <dd class="text-surface-100">{country.states.length}</dd>
    </dl>
  </article>
{/if}
