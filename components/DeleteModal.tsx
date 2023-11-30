"usec client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export function DeleteModal() {
  const { user } = useUser();

  const [isDeleteModalOpen, setisDeleteModalOpen, fileId, fileName] =
    useAppStore((state) => [
      state.isDeleteModalOpen,
      state.setisDeleteModalOpen,
      state.fileId,
      state.fileName,
    ]);

  async function deleteFile() {
    if (!user || !fileId) return;

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      deleteObject(fileRef).then(async () => {
        await deleteDoc(doc(db, "users", user.id, "files", fileId))
          .then(() => {
            console.log("deleted file");
          })
          .finally(() => {
            setisDeleteModalOpen(false);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setisDeleteModalOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete File</DialogTitle>
          <DialogDescription>
            Are you sure you wanna delete this file? This cannot be undone
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 py-3">
          <Button
            size={"sm"}
            onClick={() => setisDeleteModalOpen(false)}
            className="px-3 flex-1"
            variant={"ghost"}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            size={"sm"}
            onClick={deleteFile}
            className="px-3 flex-1"
            variant={"outline"}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
