# graphql-codegen-svelte-5-apollo

A [GraphQL Code Generator](https://www.graphql-code-generator.com) plugin that generates fully typed Svelte 5 runes-based Apollo Client v4 hooks. Queries, mutations, and subscriptions are emitted as reactive getters with `$state` runes, giving you full TypeScript support out of the box.

Forked from [ticruz38/graphql-codegen-svelte-5-apollo](https://github.com/ticruz38/graphql-codegen-svelte-5-apollo) and updated for **Apollo Client v4** and **Svelte 5 runes**.

## Quick Start

Install dependencies:

```sh
pnpm add graphql @apollo/client
pnpm add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations graphql-codegen-svelte-5-apollo
```

Create `codegen.ts`:

```ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "path/to/schema.graphql", // path or URL to your GraphQL schema
  documents: "./src/**/*.graphql",   // glob for your query/mutation/subscription files
  generates: {
    "./src/lib/generated.svelte.ts": {      // MUST be .svelte.ts — $state runes won't compile in .ts files
      plugins: [
        "typescript",                          // generates TS types from schema
        "typescript-operations",               // generates types for your operations
        "graphql-codegen-svelte-5-apollo",       // this plugin — generates Svelte hooks
      ],
      config: {
        clientPath: "./apollo-client", // path to file that default-exports an ApolloClient instance
        // asyncQuery: true,           // uncomment to also generate promise-based async helpers
      },
    },
  },
};

export default config;
```

Run codegen:

```sh
pnpm exec graphql-codegen
```

## Usage

### Observable Queries

For a given GraphQL operation:

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
  }
}
```

The plugin generates a reactive hook returning `{ get data(), get loading(), get error(), get query() }`. In your Svelte component:

```svelte
<script lang="ts">
  import { GetUser } from "$lib/generated.svelte";

  const userId = $state("1");
  const result = GetUser({ id: userId });
</script>

{#if result.loading}
  <p>Loading...</p>
{:else if result.error}
  <p>Error: {result.error.message}</p>
{:else}
  <h1>{result.data?.user.name}</h1>
{/if}
```

When the variable changes, Apollo re-fetches automatically.

### Async Queries

Enable with `asyncQuery: true` in your codegen config:

```ts
config: {
  clientPath: "./apollo-client";
  asyncQuery: true;
}
```

This generates promise-based helpers (e.g. `AsyncGetUser`) usable with Svelte's `{#await}` blocks.

### Mutations

```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) { id }
}
```

```svelte
<script lang="ts">
  import { CreateUser } from "$lib/generated.svelte";

  const mutate = CreateUser;
</script>

<button onclick={() => mutate({ input: { name: "Alice" } })}>
  Create User
</button>
```

### Subscriptions

```graphql
subscription OnMessageAdded {
  messageAdded { id text }
}
```

```svelte
<script lang="ts">
  import { OnMessageAdded } from "$lib/generated.svelte";

  const result = OnMessageAdded();
</script>
```

## Contributing

1. Fork and clone the repo
2. Install dependencies: `bun install`
3. Build the plugin: `bun run compile`
4. Run codegen to validate: `cd example && bun run types`
5. Submit a pull request

Plugin source lives in `src/index.ts` — after editing, run `bun run compile` to rebuild `dist/index.js`.

## License

MIT
