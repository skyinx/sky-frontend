import React from "react";
import { useTable } from "react-table";

import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import Loader from "@/widgets/Loader";

const Pagination = ({
  page,
  limit,
  totalPages,
  count,
  pageLimit,
  getData,
  setPageLimit,
  showRecords = false,
}) => {
  const gotoPreviousPage = () => {
    getData(page - 1);
  };

  const gotoNextPage = () => {
    getData(page + 1);
  };

  const handleLimitChange = (event) => {
    setPageLimit(Number(event.target.value));
  };

  const goToPage = (event) => {
    event.target.value = event.target.value.replaceAll(/\D/gi, "");
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        {showRecords ? <span className="text-xs">View</span> : ""}
        <select
          defaultValue={10}
          value={pageLimit}
          className="px-2 py-2 text-xs bg-transparent border rounded-xl outline-none h-11 border-gray-300"
          onChange={handleLimitChange}
        >
          {[10, 15, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        {showRecords ? <span className="text-xs">Records per page</span> : ""}
      </div>

      <div className="flex items-center gap-3">
        {showRecords && page ? (
          <span className="text-xs">
            Showing {(page - 1) * limit + 1 || 0} to {limit || 0} of{" "}
            {count || 0} records
          </span>
        ) : (
          ""
        )}
        <Button onClick={gotoPreviousPage} disabled={page === 1}>
          Previous
        </Button>
        <div className="flex items-center gap-1 text-xs">
          Page
          <Input
            className="h-11 flex items-center justify-center py-2 text-base text-center border rounded-md outline-none !w-12 border-gray-300"
            onChange={(event) => goToPage(event)}
            value={page}
            disabled
          />
          of
        </div>
        <span className="text-sm font-medium text-black">{totalPages}</span>
        <Button onClick={gotoNextPage} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

const Table = ({
  columns = [],
  data = [],
  loading = false,
  noDataText = "NO DATA FOUND",
  pagination = true,
  className = "",
  paginator = {},
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({ columns, data });

  return (
    <div className="relative overflow-hidden bg-white border rounded-lg border-gray-300 flex flex-col justify-between">
      <div className={`overflow-y-auto h-[565px] ${className}`}>
        {loading && <Loader relative />}
        <table className="w-full text-sm" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, newIndex) => (
                  <th
                    key={newIndex}
                    className="text-xs p-3 h-11 text-left text-white bg-primary border-b border-r last:border-r-0 border-white visible font-semibold whitespace-nowrap sticky top-0 z-10"
                    style={column.style}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows?.length ? (
              rows.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr
                    key={rowIndex}
                    {...row.getRowProps()}
                    className="border-b border-gray-300"
                  >
                    {row.cells.map((cell, cellIndex) => {
                      return (
                        <td
                          key={cellIndex}
                          className="relative text-xs h-10 last:border-r-0 text-gray-700 font-medium px-3 py-2.5 border-r border-gray-300"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr className="min-h-[80px]">
                <td className="w-full font-bold no-data">
                  {loading ? "" : noDataText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination ? (
        <div className="border-t border-gray-300">
          <Pagination {...paginator} showRecords={false} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Table;
