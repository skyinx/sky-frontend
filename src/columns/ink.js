import Delete from "@/components/common/delete";
import GetNeededMaterial from "@/components/ink/GetNeededMaterial";
import { useMemo } from "react";
import { MdEdit } from "react-icons/md";

const InkColumns = (props) => {
  const { setEditData, setOpen } = props || {};
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Pigment",
        accessor: "pigments.length",
        Cell: ({ row: { original } }) => {
          return (
            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary">
              {original.pigments.length}
            </p>
          );
        },
      },
      {
        Header: "Products",
        accessor: "products.length",
        Cell: ({ row: { original } }) => {
          return (
            <p className="flex h-6 w-6 items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary">
              {original.products.length}
            </p>
          );
        },
      },
      {
        Header: "Percentage (%)",
        accessor: "percentage",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex items-center justify-start gap-1">
              <MdEdit
                className="h-5 w-5 cursor-pointer"
                onClick={() => {
                  setOpen(true), setEditData(original);
                }}
              />
              <Delete {...props} module="ink" id={original?._id} />
              <GetNeededMaterial data={original} />
            </div>
          );
        },
      },
    ],
    [],
  );
  return columns;
};

export default InkColumns;
