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
          console.log("original: ", original);
          return (
            <div className="space-x-2 space-y-1">
              {original?.materials?.map((m, key) => {
                const { material, percentage } = m;
                return (
                  <p
                    key={key}
                    className="text-xs bg-gray-100 rounded-full px-2 py-1 inline-block border border-gray-900"
                  >
                    {material?.name}: {percentage}%
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
