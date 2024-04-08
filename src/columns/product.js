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
        Header: "Action",
        accessor: "action",
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex items-center justify-start gap-1">
              {/* <MdEdit
                className="w-5 h-5 cursor-pointer"
                onClick={() => {
                  setOpen(true), setEditData(original);
                }}
              /> */}
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
