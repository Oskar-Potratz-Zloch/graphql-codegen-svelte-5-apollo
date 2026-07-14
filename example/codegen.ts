import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./schema.graphql",
  overwrite: true,
  documents: "./src/**/*.gql",
  generates: {
    "./src/codegen.svelte.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "../dist/index.js",
      ],
      config: {
        clientPath: "./apollo-client",
        asyncQuery: true,
      },
    },
  },
};

export default config;
