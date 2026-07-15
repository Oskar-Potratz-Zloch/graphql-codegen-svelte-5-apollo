import { CodegenPlugin } from "@graphql-codegen/plugin-helpers";
import {
  ClientSideBaseVisitor,
  LoadedFragment,
} from "@graphql-codegen/visitor-plugin-common";
import {
  concatAST,
  FragmentDefinitionNode,
  Kind,
  OperationDefinitionNode,
  visit,
} from "graphql";
import { pascalCase } from "pascal-case";

module.exports = {
  plugin: (schema, documents, config, info) => {
    const allAst = concatAST(documents.map((d) => d.document).filter((doc): doc is NonNullable<typeof doc> => doc != null));

    const allFragments: LoadedFragment[] = [
      ...(
        allAst.definitions.filter(
          (d) => d.kind === Kind.FRAGMENT_DEFINITION
        ) as FragmentDefinitionNode[]
      ).map((fragmentDef) => ({
        node: fragmentDef,
        name: fragmentDef.name.value,
        onType: fragmentDef.typeCondition.name.value,
        isExternal: false,
      })),
      ...(config.externalFragments || []),
    ];

    const visitor = new ClientSideBaseVisitor(
      schema,
      allFragments,
      {},
      { documentVariableSuffix: "Doc" },
      documents
    );
    const visitorResult = visit(allAst, visitor);

    const operations = allAst.definitions.filter(
      (d) => d.kind === Kind.OPERATION_DEFINITION
    ) as OperationDefinitionNode[];

    const hasMutations = operations.some((o) => o.operation === "mutation");
    const hasQueries = operations.some((o) => o.operation === "query");

    const typeImports = [
      "TypedDocumentNode",
      "ApolloClient",
      "ObservableQuery",
    ];

    const valueImports = ["gql", ...(hasMutations ? ["InMemoryCache"] : [])];

    const imports = [
      `import client from "${config.clientPath}";`,
      `import type {
        ${typeImports.join(", ")}
      } from "@apollo/client";`,
      `import { ${valueImports.join(", ")} } from "@apollo/client"`,
    ];

    const ops = operations
      .map((o) => {
        const dsl = `export const ${o.name!.value}Doc = gql\`${
          documents.find((d) =>
            d.rawSDL?.includes(`${o.operation} ${o.name!.value}`)
          )?.rawSDL ?? ""
        }\``;
        const op = `${pascalCase(o.name!.value)}${pascalCase(o.operation)}`;
        const opv = `${op}Variables`;
        let operation;
        if (o.operation == "query") {
          operation = `export const ${o.name!.value} = (
            options: Omit<
              ApolloClient.WatchQueryOptions<${op}, ${opv}>,
              "query"
            >
          ) => {
            const q = client.watchQuery({
              query: ${pascalCase(o.name!.value)}Doc as TypedDocumentNode<${op}, ${opv}>,
              ...options,
            });
            let data = $state<${op}>();
            let loading = $state(true);
            let error = $state<Error>();
            let networkStatus = $state(1);
            q.subscribe((v: ObservableQuery.Result<${op}>) => {
              data = v.data as unknown as ${op};
              loading = v.loading;
              error = v.error;
              networkStatus = v.networkStatus;
            });
            return {
              get data() { return data; },
              get loading() { return loading; },
              get error() { return error; },
              get networkStatus() { return networkStatus; },
              get query() { return q; },
            };
          }
        `;
          if (config.asyncQuery) {
            operation =
              operation +
              `
export const Async${o.name!.value} = (
            options: Omit<
              ApolloClient.QueryOptions<${op}, ${opv}>,
              "query"
            >
          ) => {
            return client.query({query: ${pascalCase(o.name!.value)}Doc as TypedDocumentNode<${op}, ${opv}>, ...options})
          }
        `;
          }
        }
        if (o.operation == "mutation") {
          operation = `export const ${o.name!.value} = (
            options: Omit<
              ApolloClient.MutateOptions<${op}, ${opv}, InMemoryCache>,
              "mutation"
            >
          ) => {
            const m = client.mutate({
              mutation: ${pascalCase(o.name!.value)}Doc as TypedDocumentNode<${op}, ${opv}>,
              ...options,
            });
            return m;
          }`;
        }
        if (o.operation == "subscription") {
          operation = `export const ${o.name!.value} = (
            options: Omit<ApolloClient.SubscribeOptions<${op}, ${opv}>, "query">
          ) => {
            const q = client.subscribe(
              {
                query: ${pascalCase(o.name!.value)}Doc as TypedDocumentNode<${op}, ${opv}>,
                ...options,
              }
            )
            return q;
          }`;
        }
        return operation;
      })
      .join("\n");
    return {
      prepend: imports,
      content: [
        visitor.fragments,
        ...visitorResult.definitions.filter((t) => typeof t == "string"),
        ops,
      ].join("\n"),
    };
  },
  validate: (schema, documents, config, outputFile, allPlugins) => {
    if (!config.clientPath) {
      console.warn("Client path is not present in config");
    }
  },
} as CodegenPlugin;
