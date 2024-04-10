import Delete from "@/components/common/delete";
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
        accessor: "pigment.data.name",
      },
      {
        Header: "Products",
        accessor: "products.length",
        Cell: ({ row: { original } }) => {
          return (
            <p className="bg-opacity-10 text-primary w-6 h-6 flex items-center justify-center rounded-full bg-primary">
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
                className="w-5 h-5 cursor-pointer"
                onClick={() => {
                  setOpen(true), setEditData(original);
                }}
              />
              <Delete {...props} module="ink" id={original?._id} />
            </div>
          );
        },
      },
    ],
    []
  );
  return columns;
};

export default InkColumns;
