const getQuery = (searchFields, searchValue = "") => {
  const query = {
    $or: [],
  };

  searchFields.forEach((field) => {
    const fieldQuery = {
      [field]: {
        $regex: searchValue,
        $options: "i",
      },
    };

    query.$or.push(fieldQuery);
  });

  return query;
};

export { getQuery };
