type AppState = {
    currentId: null | number;
    filesAndFolders: {id: number , name: string, parentId?: null | number, content?: null | string}[],
};
export type { AppState };