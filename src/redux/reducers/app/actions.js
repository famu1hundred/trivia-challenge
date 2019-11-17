import { LOADING, ERROR } from "./types";

export const loading = bool => ({
  type: LOADING,
  loading: bool
});

