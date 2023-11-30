import Dropzone from "@/components/Dropzone";
import TableWrapper from "@/components/Table/TableWrapper";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

async function DashBoard() {
  const { userId } = auth();

  const docResults = await getDocs(collection(db, "users", userId!, "files"));

  const skeletonFiles: FileType[] = docResults.docs.map((doc) => ({
    id: doc.id,
    fullName: doc.data().fullName,
    fileName: doc.data().fileName || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  console.log(skeletonFiles);

  return (
    <div>
      <Dropzone />

      <section className=" container space-y-5">
        <h2 className="font-bold">All Files</h2>
        <div className="mt-20">
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
}

export default DashBoard;
