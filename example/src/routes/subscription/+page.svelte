<script lang="ts">
  import {
    DeleteCodegenUser,
    GetCodegenUsers,
    GetCodegenUsersDoc,
    InsertUsersAndPublish,
    UsersAdded,
  } from "src/graphql/generated.svelte";

  let userName = $state("");
  const query = GetCodegenUsers({});
  const subscription = UsersAdded({});
</script>

<main class="cards">
  <div class="card">
    <h2>Add User</h2>
    <input placeholder="User name..." bind:value={userName} />
    <button
      disabled={userName.length === 0}
      onclick={() => {
        InsertUsersAndPublish({
          variables: { name: userName },
          refetchQueries: [{ query: GetCodegenUsersDoc }],
        });
        userName = "";
      }}>Add</button
    >
  </div>
  <div class="card">
    <h2>Last user added</h2>
    <div>
      <pre>{subscription?.data?.usersAdded}</pre>
    </div>
  </div>
  <div class="card">
    <h2>List of Codegen Users</h2>
    {#if query.loading}
      <p>...loading users</p>
    {:else}
      {#if query.data?.users.length === 0}
        <p>No User (Add some!)</p>
      {/if}
      {#each query.data?.users || [] as user}
        <div>{user.name}</div>
      {/each}
      <button
        style="float: right"
        onclick={() => {
          DeleteCodegenUser({
            refetchQueries: [{ query: GetCodegenUsersDoc }],
          });
        }}>Delete all</button
      >
    {/if}
  </div>
</main>

<style>
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
