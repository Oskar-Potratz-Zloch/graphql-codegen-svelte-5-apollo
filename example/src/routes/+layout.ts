import type { LayoutLoad } from "./$types";
import { GetContinents } from "src/graphql/generated.svelte";

export const load: LayoutLoad = () => {
  return {
    continents: GetContinents({}),
  };
};
