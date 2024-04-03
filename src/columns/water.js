import { useMemo } from "react";

const WaterColumns = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Color",
        accessor: "color",
      },
      {
        Header: "Material",
        accessor: "material",
        Cell: ({ row: { original } }) => {
          return (
            <div className="space-x-2 space-y-1 text-xxs">
              {original?.material?.map((m) => {
                const [[key, value]] = Object.entries(m);
                return (
                  <p
                    key={key}
                    className="bg-gray-100 rounded-full px-2 py-1 inline-block border border-gray-900"
                  >
                    {key}: {value}%
                  </p>
                );
              })}
            </div>
          );
        },
      },
    ],
    []
  );
  return { columns };
};

export default WaterColumns;
