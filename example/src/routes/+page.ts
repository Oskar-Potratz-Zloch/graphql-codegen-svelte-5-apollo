import type { PageLoad } from "./$types";
import { GetContinents } from "src/graphql/generated.svelte";

export const load: PageLoad = () => {
  return {
    continents: GetContinents({}),
  };
};
