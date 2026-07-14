import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.graphql",
  overwrite: true,
  documents: "./src/**/*.gql",
  generates: {
    "./src/graphql/generated.svelte.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "../dist/index.js",
      ],
      config: {
        clientPath: "src/apollo-client",
        asyncQuery: true,
      },
    },
  },
};

export default config;
