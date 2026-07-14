<script lang="ts">
  import { GetLaunchesWithArgs } from "src/graphql/generated.svelte";

  let limit = $state(10);

  const variables = $derived({ limit });
  const query = $derived(GetLaunchesWithArgs({ variables }));
</script>

<div class="args">
  Number of Launches:
  <button class:selected={limit === 10} onclick={() => (limit = 10)}>
    10
  </button>
  <button class:selected={limit === 20} onclick={() => (limit = 20)}>
    20
  </button>
</div>

<main class="cards">
  <div class="card">
    <h2>SpaceX last {limit} launches (1)</h2>
    {#if query.loading}
      <p>...loading {limit} launches</p>
    {/if}
    {#each query.data?.launches || [] as launch (launch.mission_id)}
      <div>
        {launch.mission_id?.length === 0 || !launch.mission_id
          ? "???????"
          : launch.mission_id[0]}
        - {launch.mission_name}
      </div>
    {/each}
  </div>
  <div class="card">
    <h2>SpaceX last {limit} launches (2)</h2>
    {#if query.loading}
      <p>...loading {limit} launches</p>
    {/if}
    {#each query.data?.launches || [] as launch}
      <div>
        {launch.mission_id?.length === 0 || !launch.mission_id
          ? "???????"
          : launch.mission_id[0]}
        - {launch.mission_name}
      </div>
    {/each}
  </div>
</main>

<style>
  .args {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 10px;
  }

  button {
    margin-left: 10px;
  }

  .selected {
    background-color: #ff3e00;
  }

  .cards {
    display: flex;
    justify-content: center;
  }

  .card {
    padding: 10px;
    background-color: rgb(173, 196, 178);
    box-shadow: 10px 5px 5px #ff3e00;
    margin: 20px;
  }
</style>
