"use client";
import { FileType } from "@/typings";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { useCollection } from "react-firebase-hooks/firestore";

import { columns } from "./columns";
import { useAuth, useUser } from "@clerk/nextjs";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  const { user } = useUser();

  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [initialFiles, setinitialFiles] = useState<FileType[]>([]);

  const [docs, loading] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;
    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      fullName: doc.data().fullName,
      fileName: doc.data().fileName || doc.id,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      downloadURL: doc.data().downloadURL,
      type: doc.data().type,
      size: doc.data().size,
    }));

    setinitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined) {
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12">
            {skeletonFiles.map((file) => {
              return (
                <div className="" key={file.id}>
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-full" />
                </div>
              );
            })}

            {skeletonFiles.length == 0 && (
              <div className="flex items-center space-x-4 p-5 w-full">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={() => setSort(sort == "desc" ? "asc" : "desc")}>
        Sort by {sort == "desc" ? "Newest" : "Oldest"}
      </Button>
      <div className="mt-10">
        <DataTable columns={columns} data={initialFiles} />
      </div>
    </div>
  );
};

export default TableWrapper;
