"use client";

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
import { Button } from "../ui/button";
import { CopyIcon, PencilIcon, ShareIcon, TrashIcon } from "lucide-react";
import { FileType } from "@/typings";
import { useAppStore } from "@/store";
import { DeleteModal } from "../DeleteModal";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [setisDeleteModalOpen, setFileId, setFileName, setisRenameModalOpen] =
    useAppStore((state) => [
      state.setisDeleteModalOpen,
      state.setFileId,
      state.setFileName,
      state.setisRenameModalOpen,
    ]);

  const openDeleteModal = (fileId: string) => {
    setFileId(fileId);
    setisDeleteModalOpen(true);
  };

  const openRenameModal = (fileId: string, fileName: string) => {
    setFileId(fileId);
    setFileName(fileName);
    setisRenameModalOpen(true);
  };
  const [copyText, setcopyText] = useState("");
  const handleCopyClick = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;

    // Append the textarea to the DOM
    document.body.appendChild(textarea);

    // Select the text and copy it
    textarea.select();
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(textarea);
    toast("Shareable Link has been Copied");
  };

  return (
    <div className="rounded-md border">
      <ToastContainer />
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
                <DeleteModal />
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      openDeleteModal((row.original as FileType).id);
                    }}
                    className=""
                  >
                    <TrashIcon size={20} />
                  </Button>
                </TableCell>

                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      console.log((row.original as FileType).downloadURL);
                      handleCopyClick((row.original as FileType).downloadURL);
                    }}
                    className=""
                  >
                    <CopyIcon size={20} />
                  </Button>
                </TableCell>
                {/* <TableCell key={(row.original as FileType).downloadURL}>
                  <Button variant={"outline"} onClick={() => {

                  }} className="">
                    <ShareIcon size={20} />
                  </Button>
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                You have no files
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
