import moment from "moment-timezone";
import { useMemo } from "react";
import { MdDownload } from "react-icons/md";

const HistoryColumns = (props) => {
  const { handlePrint, paginator } = props || {};
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
        Cell: ({ row: { original } }) => {
          return (
            <p className="!font-semibold capitalize !text-black">
              {original.type === "label"
                ? original?.label?.name
                : original?.group?.name}
            </p>
          );
        },
      },
      {
        Header: "Date",
        accessor: "type",
        Cell: ({ row: { original } }) => {
          return (
            <p className="!font-semibold capitalize !text-black">
              {moment(original.createdAt)
                .tz("Asia/Kolkata")
                .format("DD-MM-YYYY ( hh:mm A )")}
            </p>
          );
        },
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: ({ row: { original } }) => {
          return (
            <p className="!font-semibold capitalize !text-black">
              {original.type}
            </p>
          );
        },
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex items-center justify-start gap-1">
              <MdDownload
                className="h-5 w-5 cursor-pointer"
                onClick={() => handlePrint(original)}
              />
            </div>
          );
        },
      },
    ],
    [paginator],
  );
  return columns;
};

export default HistoryColumns;
