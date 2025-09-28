export type FileData = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  hash: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteModel = {
  isOpen: boolean;
  fileId: string;
  fileName: string;
  isDeleting: boolean;
};
