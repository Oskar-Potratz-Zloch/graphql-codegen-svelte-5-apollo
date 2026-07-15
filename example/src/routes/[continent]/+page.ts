import type { PageLoad } from "./$types";
import { GetCountriesByContinent } from "src/graphql/generated.svelte";

export const load: PageLoad = ({ params }) => {
  return {
    continent: params.continent,
    countries: GetCountriesByContinent({
      variables: { code: params.continent },
    }),
  };
};
