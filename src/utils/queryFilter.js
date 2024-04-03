export const getFilterQuery = async (query) => {
  if (
    query &&
    query.search &&
    query.search !== "" &&
    query.searchColumns?.length
  ) {
    const searchQuery = query.searchColumns.map((column) => {
      return {
        [column]: {
          $regex: query.search.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&"),
          $options: "i",
        },
      };
    });
    if (query["$or"] !== undefined) {
      query["$or"] = { ...query["$or"], ...searchQuery };
    } else {
      query["$or"] = searchQuery;
    }
    delete query.search;
    delete query.searchColumns;
  }
  return query;
};
