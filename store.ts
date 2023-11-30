import { create } from "zustand";

interface AppState {
  isDeleteModalOpen: boolean;
  setisDeleteModalOpen: (open: boolean) => void;

  isRenameModalOpen: boolean;
  setisRenameModalOpen: (open: boolean) => void;

  fileId: string | null;
  setFileId: (fileId: string) => void;

  fileName: string | null;
  setFileName: (fileName: string) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  fileId: "",
  setFileId: (fileId: string) => set((state) => ({ fileId })),

  fileName: "",
  setFileName: (fileName: string) => set((state) => ({ fileName })),

  isDeleteModalOpen: false,
  setisDeleteModalOpen: (open) => set((state) => ({ isDeleteModalOpen: open })),
  isRenameModalOpen: false,
  setisRenameModalOpen: (open) => set((state) => ({ isRenameModalOpen: open })),
}));
