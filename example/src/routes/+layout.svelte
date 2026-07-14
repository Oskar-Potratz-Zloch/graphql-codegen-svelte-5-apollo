<script lang="ts">
  import { page } from "$app/state";

  let { children } = $props();

  const navItems = [
    { href: "/queries", label: "Query" },
    { href: "/with-args", label: "Query (withArgs)" },
    { href: "/mutation", label: "Mutation" },
    { href: "/subscription", label: "Subscription" },
  ];
</script>

<div class="title">graphql-codegen-svelte-5-apollo</div>

<nav>
  {#each navItems as item}
    <a
      href={item.href}
      class:active={page.url.pathname === item.href}
    >
      {item.label}
    </a>
  {/each}
</nav>

{@render children()}

<style>
  .title {
    background-color: #444444;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: xx-large;
  }

  nav {
    background-color: #ff3e00;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
  }

  a {
    color: white;
    text-decoration: none;
  }

  a.active {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
