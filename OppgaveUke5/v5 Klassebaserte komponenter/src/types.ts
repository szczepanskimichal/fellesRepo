export interface AppState{
    currentId?: number;
    selectedForDeletion?: number;
    filesAndFolders: FileOrFolder[];
}

export interface FileOrFolder{
    id: number;
    name: string;
    content?: string;
    parentId?: number;
}