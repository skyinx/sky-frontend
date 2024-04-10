import Delete from "@/components/common/delete";
import { useMemo } from "react";
import { MdEdit } from "react-icons/md";

const ProductColumns = (props) => {
  const { setEditData, setOpen } = props || {};
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
        Header: "Sub Products",
        accessor: "products.length",
        Cell: ({ row: { original } }) => {
          return original.products.length > 0 ? (
            <p className="bg-opacity-10 text-primary w-6 h-6 flex items-center justify-center rounded-full bg-primary">
              {original.products.length}
            </p>
          ) : (
            "-"
          );
        },
      },
      {
        Header: "Percentage",
        accessor: "percentage",
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
              <Delete {...props} module="product" id={original?._id} />
            </div>
          );
        },
      },
    ],
    []
  );
  return columns;
};

export default ProductColumns;
