import type { FilesAndFolders } from "../components/FilesAndFolders";
import type { AppState, FileOrFolder } from "../types";
import { BaseComponent } from "../components/BaseComponent";
import type { TrashBin } from "../components/TrashBin";


export class MyApp extends BaseComponent {
    private state: AppState = {
        filesAndFolders: [
            { id: 1, name: 'Handlelister', isTrash: false },
            { id: 2, name: 'Ting som skal fikses', isTrash: false },
            { id: 3, name: 'Oktober', parentId: 1 , isTrash: false},
            { id: 4, name: 'Tirsdag 15.', parentId: 3, content: 'melk\nbrød\nost\n' , isTrash: false},
            { id: 5, name: 'Bad', parentId: 2, content: 'Lekkasje, bla bla' , isTrash: false},
            { id: 6, name: 'notater.txt', content: 'abc' , isTrash: false},
            { id: 8, name: 'Januar', parentId: 1, content: 'test', isTrash: false},
        ],
        markedFilesAndFolders: new Set<number>(),
        trashedItems: [] = [],
    };

    render() {
        // console.log(this.state.currentId);
        this.shadowRoot!.innerHTML = /*HTML*/`
        <files-and-folders></files-and-folders>
        <add-file-or-folder></add-file-or-folder>
        ${this.state.markedFilesAndFolders.size > 0 ? '<delete-file-or-folder></delete-file-or-folder>' : ''}
        <trash-bin></trash-bin>
        `;
        const filesAndFolders = this.shadowRoot!.querySelector('files-and-folders') as FilesAndFolders;
        const currentFilesAndFolders = this.state.filesAndFolders.filter(f => f.parentId === this.state.currentId);
        filesAndFolders.set('items', currentFilesAndFolders);
        filesAndFolders.set('marked-files-and-folders', Array.from(this.state.markedFilesAndFolders));
// <----------------------------------------------------------------------------------------------------------------------->
        const currentFileOrFolder = this.state.filesAndFolders.find(f => f.id == this.state.currentId);
        if (currentFileOrFolder) {
            const folderId = currentFileOrFolder!.parentId ?? -1;
            filesAndFolders.set('parent-folder', folderId);
        }

        filesAndFolders.addEventListener('selected', this.handleSelected.bind(this));
        filesAndFolders.addEventListener('marked-file-or-folder-changed', this.handleMarkedFileOrFolderChanged.bind(this));
// <----------------------------------------------------------------------------------------------------------------------->
        const addFileOrFolder = this.shadowRoot!.querySelector('add-file-or-folder');
        addFileOrFolder?.addEventListener('content-added', this.handleContentAdded.bind(this));

        const deleteFileOrFolder = this.shadowRoot!.querySelector('delete-file-or-folder');
        if (deleteFileOrFolder) {
            deleteFileOrFolder.addEventListener('delete-file-or-folder', this.handleDelete.bind(this));
            deleteFileOrFolder.addEventListener('cancel-delete', this.handleCancelDelete.bind(this));
        }

        const trashBin = this.shadowRoot!.querySelector('trash-bin') as TrashBin;
        if (trashBin) {
            trashBin.set('items', this.state.trashedItems);
            trashBin.addEventListener('restore-item', this.handleRestoreItem.bind(this));
            trashBin.addEventListener('empty-trash', this.handleEmptyTrash.bind(this));
        }
    }

    handleDelete() {
        const itemsToTrash = this.state.filesAndFolders.filter(
            f => this.state.markedFilesAndFolders.has(f.id)
        );
        
        this.state.trashedItems.push(...itemsToTrash);
        this.state.filesAndFolders = this.state.filesAndFolders.filter(
            f => !this.state.markedFilesAndFolders.has(f.id)
        );
        this.state.markedFilesAndFolders.clear();
        this.scheduleRender();
    }

    handleCancelDelete() {
        // Anuluj usuwanie - po prostu odznacz elementy
        this.state.markedFilesAndFolders.clear();
        this.scheduleRender();
    }
    

    handleContentAdded(e: Event) {
        const customEvent = e as CustomEvent;
        const newContent : FileOrFolder ={
            id: Math.max(...this.state.filesAndFolders.map(f => f.id)) + 1,
            name: customEvent.detail.name,
            
            // parentId: this.state.currentId,
        }
        const current = this.state.filesAndFolders.find(f => f.id == this.state.currentId)!;
        if (current) {
            newContent.parentId = current.hasOwnProperty('content') ? current?.parentId : current.id;
        }
        if (customEvent.detail.isFile) newContent.content = '';
        this.state.filesAndFolders.push(newContent);
        console.log(this.state);
        this.scheduleRender();
    }
    handleRestoreItem(e: Event) {
        const customEvent = e as CustomEvent;
        const itemId = customEvent.detail;
        
        const itemToRestore = this.state.trashedItems.find(item => item.id === itemId);
        if (itemToRestore) {
            this.state.filesAndFolders.push(itemToRestore);
            this.state.trashedItems = this.state.trashedItems.filter((item: FileOrFolder) => item.id !== itemId);
            this.scheduleRender();
        }
    }

    handleEmptyTrash() {
        this.state.trashedItems = [];
        this.scheduleRender();
    }

    handleSelected(e: Event) {
        const customEvent = e as CustomEvent;
        const selectedFileOrFolder = this.state.filesAndFolders.find(f => f.id == parseInt(customEvent.detail));
        if (selectedFileOrFolder === undefined) {
            delete this.state.currentId;
        } else {
            this.state.currentId = selectedFileOrFolder.id;
        }
        this.scheduleRender();
    }
    
    handleMarkedFileOrFolderChanged(e: Event) {
        const customEvent = e as CustomEvent;
        const { id, isChecked } = customEvent.detail;
        if (isChecked) this.state.markedFilesAndFolders.add(id);
        else this.state.markedFilesAndFolders.delete(id);
        this.scheduleRender();
    }
}