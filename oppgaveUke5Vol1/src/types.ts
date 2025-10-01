interface AppState  {
    currentId: null | number;
    filesAndFolders: FileOrFolder[],
    }

interface FileOrFolder {
    id: number;
    name: string;
    parentId?: null | number;
    content?: null | string;
}

export type { AppState, FileOrFolder };