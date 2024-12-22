import Delete from "@/components/common/delete";
import { useMemo } from "react";
import { MdEdit } from "react-icons/md";

const PigmentColumns = (props) => {
  const { setEditData, setOpen, paginator } = props || {};
  const columns = useMemo(
    () => [
      {
        Header: "Sr No.",
        accessor: "no",
        Cell: ({ row: { index } }) => {
          return (
            <p className="!font-semibold !text-black">
              {paginator.slNo + index}
            </p>
          );
        },
      },
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
              <MdEdit
                className="h-5 w-5 cursor-pointer"
                onClick={() => {
                  setOpen(true), setEditData(original);
                }}
              />
              <Delete {...props} module="pigment" id={original?._id} />
            </div>
          );
        },
      },
    ],
    [paginator],
  );
  return columns;
};

export default PigmentColumns;
