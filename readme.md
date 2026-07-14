# graphql-codegen-svelte-apollo

A [GraphQL Code Generator](https://www.graphql-code-generator.com) plugin that generates fully typed Svelte 5 runes-based Apollo Client v4 hooks. Queries, mutations, and subscriptions are emitted as reactive getters with `$state` runes, giving you full TypeScript support out of the box.

Forked from [ticruz38/graphql-codegen-svelte-apollo](https://github.com/ticruz38/graphql-codegen-svelte-apollo) and updated for **Apollo Client v4** and **Svelte 5 runes**.

## Quick Start

Install dependencies:

<details>
<summary>bun</summary>

```sh
bun add graphql @apollo/client
bun add -d @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations graphql-codegen-svelte-apollo
```

</details>

<details>
<summary>pnpm</summary>

```sh
pnpm add graphql @apollo/client
pnpm add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations graphql-codegen-svelte-apollo
```

</details>

<details>
<summary>yarn</summary>

```sh
yarn add graphql @apollo/client
yarn add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations graphql-codegen-svelte-apollo
```

</details>

<details>
<summary>npm</summary>

```sh
npm i -S graphql @apollo/client
npm i -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations graphql-codegen-svelte-apollo
```

</details>

Create `codegen.ts`:

```ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "path/to/schema.graphql",
  documents: "./src/**/*.graphql",
  generates: {
    "./src/lib/generated.ts": {
      plugins: ["typescript", "typescript-operations", "graphql-codegen-svelte-apollo"],
      config: {
        clientPath: "./apollo-client", // must default-export an ApolloClient instance
      },
    },
  },
};

export default config;
```

Run codegen:

<details>
<summary>bun</summary>

```sh
bunx graphql-codegen
```

</details>

<details>
<summary>pnpm</summary>

```sh
pnpm exec graphql-codegen
```

</details>

<details>
<summary>yarn</summary>

```sh
yarn graphql-codegen
```

</details>

<details>
<summary>npm</summary>

```sh
npx graphql-codegen
```

</details>

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
  import { GetUser } from "$lib/generated";

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
  import { CreateUser } from "$lib/generated";

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
  import { OnMessageAdded } from "$lib/generated";

  const result = OnMessageAdded();
</script>
```

## API Reference

### `clientPath`

| | |
|---|---|
| type | `string` |
| required | **yes** |

Path to the Apollo Client default export.

### `asyncQuery`

| | |
|---|---|
| type | `boolean` |
| default | `false` |

When `true`, generates promise-based `Async*` helpers alongside observable hooks.

## Contributing

1. Fork and clone the repo
2. Install dependencies: `bun install`
3. Build the plugin: `bun run compile`
4. Run codegen to validate: `cd example && bun run types`
5. Submit a pull request

Plugin source lives in `src/index.ts` — after editing, run `bun run compile` to rebuild `dist/index.js`.

## License

MIT
