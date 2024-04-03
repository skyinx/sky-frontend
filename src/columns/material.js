import { useMemo } from "react";

const MaterialColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );
  return { columns };
};

export default MaterialColumns;
