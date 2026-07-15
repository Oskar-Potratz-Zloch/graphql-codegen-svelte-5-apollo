import type { PageLoad } from "./$types";
import { GetCountry } from "src/graphql/generated.svelte";

export const load: PageLoad = ({ params }) => {
  return {
    country: GetCountry({
      variables: { code: params.country },
    }),
  };
};
