"use client";
import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SONG_DATA } from "@/app/data";
import moment from "moment";
import { SortAsc } from "lucide-react";

// songName: "Electric Feel",
// artist: "MGMT",
// dateStreamed: "2024-02-01",
// usersThatStreamedSong: [
//  {
//   id: '1',
//   datesStreamed: [1639172876, 1639172876, 1639172876, 1639172876, 1639172876]
//  },
//  {
//   id: '2',
//   datesStreamed: [1639172876, 1639172876, 1639172876, 1639172876, 1639172876]
//  },
//  {
//   id: '3',
//   datesStreamed: [1639172876, 1639172876, 1639172876, 1639172876, 1639172876]
//  }
// ]
// }

export const columns = [
  {
    accessorKey: "songName",
    header: "Song Name",
  },
  {
    accessorKey: "artist",
    header: "Artist",
  },
  {
    accessorKey: "usersThatStreamedSong",
    header: "User ID",
    cell: ({ row }) => {
      const rowData = row.original?.usersThatStreamedSong || [];

      return rowData.map((row) => (
        <div className="flex space-between w-full">
          <p className="mr-2">{row.id}</p>
          {/* {row?.datesStreamed?.map(date => (
                        <>
                        <p>{moment.unix(date).format("MM/DD/YYYY")}, </p>
                        </>
                    ))} */}
        </div>
      ));
    },
  },
  {
    accessorKey: "usersThatStreamedSong",
    header: "Dates Streamed",
    cell: ({ row }) => {
      const rowData = row.original?.usersThatStreamedSong || [];

      return rowData.map((row) => (
        <div className="flex space-between w-full">
          {row?.datesStreamed?.map((date) => (
            <>
              <p>{moment.unix(date).format("MM/DD/YYYY")}, </p>
            </>
          ))}
        </div>
      ));
    },
  },
  {
    accessorKey: "totalStreams",
    header: "Total Streams",
    cell: ({ row }) => {
      const rowData = row.original?.usersThatStreamedSong || [];
      // console.log("row: ", row.original?.usersThatStreamedSong);

      let total = 0;

      for (let i = 0; i < row.original.usersThatStreamedSong.length; i++) {
        total += row?.original.usersThatStreamedSong[i]?.datesStreamed?.length;
      }

      return <p>{total}</p>;
    },
  },
];

const DataTable = () => {
  const table = useReactTable({
    data: SONG_DATA,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
