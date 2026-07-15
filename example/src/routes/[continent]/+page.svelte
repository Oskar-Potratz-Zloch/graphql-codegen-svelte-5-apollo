<script lang="ts">
  import { resolve } from "$app/paths";
  import CountryCard from "src/lib/components/CountryCard.svelte";

  let { data } = $props();
</script>

<header>
  <h1 class="h2 font-bold text-primary-500">
    {data.countries.data?.continent?.name || "Loading..."}
  </h1>
  <hr class="border-t-2 mb-8 border-surface-800" />
</header>

{#if data.countries.loading}
  <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {#each Array(8) as _}
      <div class="h-24 animate-pulse rounded-container bg-surface-700"></div>
    {/each}
  </div>
{:else if data.countries.error}
  <p class="text-error-500">{data.countries.error.message}</p>
{:else}
  <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {#each data.countries.data?.continent?.countries || [] as country (country.code)}
      <CountryCard
        {country}
        href={resolve("/[continent]/[country]", {
          continent: data.continent,
          country: country.code,
        })}
      />
    {/each}
  </div>
{/if}
