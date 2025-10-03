export interface AppState{
    currentId?: number;
    filesAndFolders: FileOrFolder[];
    markedFilesAndFolders: Set<number>;
    // trashedItems: FileOrFolder[];
}

export interface FileOrFolder{
    id: number;
    name: string;
    content?: string;
    parentId?: number;
    isTrash: boolean;
    isChecked?: boolean; 
}