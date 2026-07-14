<script lang="ts">
  import { fade } from "svelte/transition";
  import { GetLaunches, type Launch } from "src/graphql/generated.svelte";

  const query = GetLaunches({});
</script>

<main class="cards">
  <div class="card">
    <h2>SpaceX all launches</h2>
    {#if query.loading}
      <p>Loading...</p>
    {/if}
    {#each query.data?.launches || [] as launch (launch.mission_id)}
      <div transition:fade>
        <div>
          {launch.mission_id?.length === 0 || !launch.mission_id
            ? "???????"
            : launch.mission_id[0]}
          - {launch.mission_name}
        </div>
      </div>
    {/each}
  </div>
</main>

<style>
  .cards {
    display: flex;
    justify-content: space-around;
  }

  .card {
    padding: 10px;
    background-color: rgb(173, 196, 178);
    box-shadow: 10px 5px 5px #ff3e00;
  }
</style>
