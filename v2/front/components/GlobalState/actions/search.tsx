export const search = {
  setQuery: (query: string) => {
    return {
      type: "SET_QUERY",
      payload: query,
    };
  },
};
