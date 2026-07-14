import client from "src/apollo-client";
import type {
        TypedDocumentNode, ApolloClient, ObservableQuery, QueryOptions
      } from "@apollo/client";
import { gql } from "@apollo/client"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Delete_Users_Mutation_Response = {
  __typename?: 'Delete_users_mutation_response';
  affected_rows: Scalars['Int']['output'];
};

export type Insert_Users_Input = {
  name: Scalars['String']['input'];
  rocket?: InputMaybe<Scalars['String']['input']>;
};

export type Insert_Users_Mutation_Response = {
  __typename?: 'Insert_users_mutation_response';
  affected_rows: Scalars['Int']['output'];
  returning: Array<User>;
};

export type Launch = {
  __typename?: 'Launch';
  mission_id?: Maybe<Scalars['String']['output']>;
  mission_name?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  delete_users: Delete_Users_Mutation_Response;
  insert_users: Insert_Users_Mutation_Response;
};


export type MutationDelete_UsersArgs = {
  where?: InputMaybe<User_Bool_Exp>;
};


export type MutationInsert_UsersArgs = {
  objects: Insert_Users_Input;
};

export type Query = {
  __typename?: 'Query';
  launches: Array<Launch>;
  users: Array<User>;
};


export type QueryLaunchesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUsersArgs = {
  where?: InputMaybe<User_Bool_Exp>;
};

export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  usersAdded: Array<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  rocket?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['String']['output'];
};

export type User_Bool_Exp = {
  rocket?: InputMaybe<String_Comparison_Exp>;
};

export type AddCodegenUserMutationVariables = Exact<{
  userName: Scalars['String']['input'];
}>;


export type AddCodegenUserMutation = { __typename?: 'Mutation', insert_users: { __typename?: 'Insert_users_mutation_response', affected_rows: number } };

export type DeleteCodegenUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteCodegenUserMutation = { __typename?: 'Mutation', delete_users: { __typename?: 'Delete_users_mutation_response', affected_rows: number } };

export type UsersAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UsersAddedSubscription = { __typename?: 'Subscription', usersAdded: Array<{ __typename?: 'User', id: number, name: string, timestamp: string }> };

export type InsertUsersAndPublishMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type InsertUsersAndPublishMutation = { __typename?: 'Mutation', insert_users: { __typename?: 'Insert_users_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'User', name: string, rocket?: string | null }> } };

export type GetCodegenUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCodegenUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', name: string, timestamp: string }> };

export type GetLaunchesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLaunchesQuery = { __typename?: 'Query', launches: Array<{ __typename?: 'Launch', mission_id?: string | null, mission_name?: string | null }> };

export type GetLaunchesWithArgsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetLaunchesWithArgsQuery = { __typename?: 'Query', launches: Array<{ __typename?: 'Launch', mission_id?: string | null, mission_name?: string | null }> };


export const AddCodegenUserDoc = gql`
    mutation AddCodegenUser($userName: String!) {
  insert_users(objects: {name: $userName, rocket: "codegen"}) {
    affected_rows
  }
}
    `;
export const DeleteCodegenUserDoc = gql`
    mutation DeleteCodegenUser {
  delete_users(where: {rocket: {_eq: "codegen"}}) {
    affected_rows
  }
}
    `;
export const UsersAddedDoc = gql`
    subscription UsersAdded {
  usersAdded {
    id
    name
    timestamp
  }
}
    `;
export const InsertUsersAndPublishDoc = gql`
    mutation InsertUsersAndPublish($name: String!) {
  insert_users(objects: {name: $name, rocket: "codegen"}) {
    affected_rows
    returning {
      name
      rocket
    }
  }
}
    `;
export const GetCodegenUsersDoc = gql`
    query GetCodegenUsers {
  users(where: {rocket: {_eq: "codegen"}}) {
    name
    timestamp
  }
}
    `;
export const GetLaunchesDoc = gql`
    query GetLaunches {
  launches {
    mission_id
    mission_name
  }
}
    `;
export const GetLaunchesWithArgsDoc = gql`
    query GetLaunchesWithArgs($limit: Int) {
  launches(limit: $limit) {
    mission_id
    mission_name
  }
}
    `;
export const AddCodegenUser = (
            options: Omit<
              ApolloClient.MutateOptions<AddCodegenUserMutation, AddCodegenUserMutationVariables, any>,
              "mutation"
            >
          ) => {
            const m = client.mutate({
              mutation: AddCodegenUserDoc as TypedDocumentNode<AddCodegenUserMutation, AddCodegenUserMutationVariables>,
              ...options,
            });
            return m;
          }
export const DeleteCodegenUser = (
            options: Omit<
              ApolloClient.MutateOptions<DeleteCodegenUserMutation, DeleteCodegenUserMutationVariables, any>,
              "mutation"
            >
          ) => {
            const m = client.mutate({
              mutation: DeleteCodegenUserDoc as TypedDocumentNode<DeleteCodegenUserMutation, DeleteCodegenUserMutationVariables>,
              ...options,
            });
            return m;
          }
export const UsersAdded = (
            options: Omit<ApolloClient.SubscribeOptions<UsersAddedSubscription, UsersAddedSubscriptionVariables>, "query">
          ) => {
            const q = client.subscribe(
              {
                query: UsersAddedDoc as TypedDocumentNode<UsersAddedSubscription, UsersAddedSubscriptionVariables>,
                ...options,
              }
            )
            return q;
          }
export const InsertUsersAndPublish = (
            options: Omit<
              ApolloClient.MutateOptions<InsertUsersAndPublishMutation, InsertUsersAndPublishMutationVariables, any>,
              "mutation"
            >
          ) => {
            const m = client.mutate({
              mutation: InsertUsersAndPublishDoc as TypedDocumentNode<InsertUsersAndPublishMutation, InsertUsersAndPublishMutationVariables>,
              ...options,
            });
            return m;
          }
export const GetCodegenUsers = (
            options: Omit<
              ApolloClient.WatchQueryOptions<GetCodegenUsersQuery, GetCodegenUsersQueryVariables>,
              "query"
            >
          ) => {
            const q = client.watchQuery({
              query: GetCodegenUsersDoc as TypedDocumentNode<GetCodegenUsersQuery, GetCodegenUsersQueryVariables>,
              ...options,
            });
            let data = $state<GetCodegenUsersQuery>();
            let loading = $state(true);
            let error = $state<Error>();
            let networkStatus = $state(1);
            q.subscribe((v: ObservableQuery.Result<GetCodegenUsersQuery>) => {
              data = v.data as unknown as GetCodegenUsersQuery;
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
        
export const AsyncGetCodegenUsers = (
            options: Omit<
              ApolloClient.QueryOptions<GetCodegenUsersQuery, GetCodegenUsersQueryVariables>,
              "query"
            >
          ) => {
            return client.query({query: GetCodegenUsersDoc as TypedDocumentNode<GetCodegenUsersQuery, GetCodegenUsersQueryVariables>, ...options})
          }
        
export const GetLaunches = (
            options: Omit<
              ApolloClient.WatchQueryOptions<GetLaunchesQuery, GetLaunchesQueryVariables>,
              "query"
            >
          ) => {
            const q = client.watchQuery({
              query: GetLaunchesDoc as TypedDocumentNode<GetLaunchesQuery, GetLaunchesQueryVariables>,
              ...options,
            });
            let data = $state<GetLaunchesQuery>();
            let loading = $state(true);
            let error = $state<Error>();
            let networkStatus = $state(1);
            q.subscribe((v: ObservableQuery.Result<GetLaunchesQuery>) => {
              data = v.data as unknown as GetLaunchesQuery;
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
        
export const AsyncGetLaunches = (
            options: Omit<
              ApolloClient.QueryOptions<GetLaunchesQuery, GetLaunchesQueryVariables>,
              "query"
            >
          ) => {
            return client.query({query: GetLaunchesDoc as TypedDocumentNode<GetLaunchesQuery, GetLaunchesQueryVariables>, ...options})
          }
        
export const GetLaunchesWithArgs = (
            options: Omit<
              ApolloClient.WatchQueryOptions<GetLaunchesWithArgsQuery, GetLaunchesWithArgsQueryVariables>,
              "query"
            >
          ) => {
            const q = client.watchQuery({
              query: GetLaunchesWithArgsDoc as TypedDocumentNode<GetLaunchesWithArgsQuery, GetLaunchesWithArgsQueryVariables>,
              ...options,
            });
            let data = $state<GetLaunchesWithArgsQuery>();
            let loading = $state(true);
            let error = $state<Error>();
            let networkStatus = $state(1);
            q.subscribe((v: ObservableQuery.Result<GetLaunchesWithArgsQuery>) => {
              data = v.data as unknown as GetLaunchesWithArgsQuery;
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
        
export const AsyncGetLaunchesWithArgs = (
            options: Omit<
              ApolloClient.QueryOptions<GetLaunchesWithArgsQuery, GetLaunchesWithArgsQueryVariables>,
              "query"
            >
          ) => {
            return client.query({query: GetLaunchesWithArgsDoc as TypedDocumentNode<GetLaunchesWithArgsQuery, GetLaunchesWithArgsQueryVariables>, ...options})
          }
        