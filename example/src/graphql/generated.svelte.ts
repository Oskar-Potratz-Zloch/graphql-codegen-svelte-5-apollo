import client from "src/apollo-client";
import type {
        TypedDocumentNode, ApolloClient, ObservableQuery
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

export type Continent = {
  __typename?: 'Continent';
  code: Scalars['ID']['output'];
  countries: Array<Country>;
  name: Scalars['String']['output'];
};

export type Country = {
  __typename?: 'Country';
  area?: Maybe<Scalars['Float']['output']>;
  callingCodes: Array<Scalars['String']['output']>;
  capital?: Maybe<Scalars['String']['output']>;
  code: Scalars['ID']['output'];
  continent: Continent;
  currencies: Array<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  demonym?: Maybe<Scalars['String']['output']>;
  emoji: Scalars['String']['output'];
  emojiU?: Maybe<Scalars['String']['output']>;
  languages: Array<Language>;
  name: Scalars['String']['output'];
  native: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  states: Array<State>;
};

export type CountryFilterInput = {
  code?: InputMaybe<StringFilterInput>;
  continent?: InputMaybe<StringFilterInput>;
  currency?: InputMaybe<StringFilterInput>;
};

export type Language = {
  __typename?: 'Language';
  code: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  native?: Maybe<Scalars['String']['output']>;
  rtl?: Maybe<Scalars['Boolean']['output']>;
};

export type LanguageFilterInput = {
  code?: InputMaybe<StringFilterInput>;
};

export type Query = {
  __typename?: 'Query';
  continent?: Maybe<Continent>;
  continents: Array<Continent>;
  countries: Array<Country>;
  country?: Maybe<Country>;
  language?: Maybe<Language>;
  languages: Array<Language>;
};


export type QueryContinentArgs = {
  code: Scalars['ID']['input'];
};


export type QueryCountriesArgs = {
  filter?: InputMaybe<CountryFilterInput>;
};


export type QueryCountryArgs = {
  code: Scalars['ID']['input'];
};


export type QueryLanguageArgs = {
  code: Scalars['ID']['input'];
};


export type QueryLanguagesArgs = {
  filter?: InputMaybe<LanguageFilterInput>;
};

export type State = {
  __typename?: 'State';
  code?: Maybe<Scalars['String']['output']>;
  country: Country;
  name: Scalars['String']['output'];
};

export type StringFilterInput = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<Scalars['String']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
};

export type GetContinentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContinentsQuery = { __typename?: 'Query', continents: Array<{ __typename?: 'Continent', code: string, name: string }> };

export type GetCountriesByContinentQueryVariables = Exact<{
  code: Scalars['ID']['input'];
}>;


export type GetCountriesByContinentQuery = { __typename?: 'Query', continent?: { __typename?: 'Continent', name: string, countries: Array<{ __typename?: 'Country', code: string, name: string, emoji: string, capital?: string | null, languages: Array<{ __typename?: 'Language', name?: string | null }> }> } | null };

export type GetCountryQueryVariables = Exact<{
  code: Scalars['ID']['input'];
}>;


export type GetCountryQuery = { __typename?: 'Query', country?: { __typename?: 'Country', code: string, name: string, native: string, capital?: string | null, emoji: string, currency?: string | null, languages: Array<{ __typename?: 'Language', code: string, name?: string | null }>, states: Array<{ __typename?: 'State', name: string }>, continent: { __typename?: 'Continent', name: string } } | null };

export type SearchCountriesQueryVariables = Exact<{
  filter?: InputMaybe<CountryFilterInput>;
}>;


export type SearchCountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', code: string, name: string, emoji: string, capital?: string | null }> };


export const GetContinentsDoc = gql`
    query GetContinents {
  continents {
    code
    name
  }
}
    `;
export const GetCountriesByContinentDoc = gql`
    query GetCountriesByContinent($code: ID!) {
  continent(code: $code) {
    name
    countries {
      code
      name
      emoji
      capital
      languages {
        name
      }
    }
  }
}
    `;
export const GetCountryDoc = gql`
    query GetCountry($code: ID!) {
  country(code: $code) {
    code
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
    states {
      name
    }
    continent {
      name
    }
  }
}
    `;
export const SearchCountriesDoc = gql`
    query SearchCountries($filter: CountryFilterInput) {
  countries(filter: $filter) {
    code
    name
    emoji
    capital
  }
}
    `;
export const GetContinents = (
            options: Omit<
              ApolloClient.WatchQueryOptions<GetContinentsQuery, GetContinentsQueryVariables>,
              "query"
            >
          ) => {
            const q = client.watchQuery({
              query: GetContinentsDoc as TypedDocumentNode<GetContinentsQuery, GetContinentsQueryVariables>,
              ...options,
            });
            let data = $state<GetContinentsQuery>();
            let loading = $state(true);
            let error = $state<Error>();
            let networkStatus = $state(1);
            q.subscribe((v: ObservableQuery.Result<GetContinentsQuery>) => {
              data = v.data as unknown as GetContinentsQuery;
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
        
export const AsyncGetContinents = (
            options: Omit<
              ApolloClient.QueryOptions<GetContinentsQuery, GetContinentsQueryVariables>,
              "query"
            >
          ) => {
            return client.query({query: GetContinentsDoc as TypedDocumentNode<GetContinentsQuery, GetContinentsQueryVariables>, ...options})
          }
        
export const GetCountriesByContinent = (
            options: Omit<
              ApolloClient.WatchQueryOptions<GetCountriesByContinentQuery, GetCountriesByContinentQueryVariables>,
              "query"
            >
          ) => {
            const q = client.watchQuery({
              query: GetCountriesByContinentDoc as TypedDocumentNode<GetCountriesByContinentQuery, GetCountriesByContinentQueryVariables>,
              ...options,
            });
            let data = $state<GetCountriesByContinentQuery>();
            let loading = $state(true);
            let error = $state<Error>();
            let networkStatus = $state(1);
            q.subscribe((v: ObservableQuery.Result<GetCountriesByContinentQuery>) => {
              data = v.data as unknown as GetCountriesByContinentQuery;
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
        
export const AsyncGetCountriesByContinent = (
            options: Omit<
              ApolloClient.QueryOptions<GetCountriesByContinentQuery, GetCountriesByContinentQueryVariables>,
              "query"
            >
          ) => {
            return client.query({query: GetCountriesByContinentDoc as TypedDocumentNode<GetCountriesByContinentQuery, GetCountriesByContinentQueryVariables>, ...options})
          }
        
export const GetCountry = (
            options: Omit<
              ApolloClient.WatchQueryOptions<GetCountryQuery, GetCountryQueryVariables>,
              "query"
            >
          ) => {
            const q = client.watchQuery({
              query: GetCountryDoc as TypedDocumentNode<GetCountryQuery, GetCountryQueryVariables>,
              ...options,
            });
            let data = $state<GetCountryQuery>();
            let loading = $state(true);
            let error = $state<Error>();
            let networkStatus = $state(1);
            q.subscribe((v: ObservableQuery.Result<GetCountryQuery>) => {
              data = v.data as unknown as GetCountryQuery;
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
        
export const AsyncGetCountry = (
            options: Omit<
              ApolloClient.QueryOptions<GetCountryQuery, GetCountryQueryVariables>,
              "query"
            >
          ) => {
            return client.query({query: GetCountryDoc as TypedDocumentNode<GetCountryQuery, GetCountryQueryVariables>, ...options})
          }
        
export const SearchCountries = (
            options: Omit<
              ApolloClient.WatchQueryOptions<SearchCountriesQuery, SearchCountriesQueryVariables>,
              "query"
            >
          ) => {
            const q = client.watchQuery({
              query: SearchCountriesDoc as TypedDocumentNode<SearchCountriesQuery, SearchCountriesQueryVariables>,
              ...options,
            });
            let data = $state<SearchCountriesQuery>();
            let loading = $state(true);
            let error = $state<Error>();
            let networkStatus = $state(1);
            q.subscribe((v: ObservableQuery.Result<SearchCountriesQuery>) => {
              data = v.data as unknown as SearchCountriesQuery;
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
        
export const AsyncSearchCountries = (
            options: Omit<
              ApolloClient.QueryOptions<SearchCountriesQuery, SearchCountriesQueryVariables>,
              "query"
            >
          ) => {
            return client.query({query: SearchCountriesDoc as TypedDocumentNode<SearchCountriesQuery, SearchCountriesQueryVariables>, ...options})
          }
        