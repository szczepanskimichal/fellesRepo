import type { FilesAndFolders } from "../components/FilesAndFolders";
import type { AppState, FileOrFolder } from "../types";
import { BaseComponent } from "../components/BaseComponent";


export class MyApp extends BaseComponent {
    private state: AppState = {
        filesAndFolders: [
            { id: 1, name: 'Handlelister' },
            { id: 2, name: 'Ting som skal fikses' },
            { id: 3, name: 'Oktober', parentId: 1 },
            { id: 4, name: 'Tirsdag 15.', parentId: 3, content: 'melk\nbrød\nost\n' },
            { id: 5, name: 'Bad', parentId: 2, content: 'Lekkasje, bla bla' },
            { id: 6, name: 'notater.txt', content: 'abc' },
        ],
        markedFilesAndFolders: new Set<number>(),
    };

    render() {
        // console.log(this.state.currentId);
        this.shadowRoot!.innerHTML = /*HTML*/`
        <files-and-folders></files-and-folders>
        <add-file-or-folder></add-file-or-folder>
        ${this.state.markedFilesAndFolders.size > 0 ? '<delete-file-or-folder></delete-file-or-folder>' : ''}
        `;
        const filesAndFolders = this.shadowRoot!.querySelector('files-and-folders') as FilesAndFolders;
        const currentFilesAndFolders = this.state.filesAndFolders.filter(f => f.parentId === this.state.currentId);
        filesAndFolders.set('items', currentFilesAndFolders);
        filesAndFolders.set('marked-files-and-folders', Array.from(this.state.markedFilesAndFolders));
        // filesAndFolders.set('currentId', this.state.currentId);
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
    }

    handleDelete() {
        this.state.filesAndFolders = this.state.filesAndFolders.filter(
            f => !this.state.markedFilesAndFolders.has(f.id));
            this.state.markedFilesAndFolders.clear();
        //  if (this.state.filesAndFolders.find(f => f.id == this.state.currentId) === undefined) {
        //     delete this.state.currentId;
        //  }
        this.scheduleRender();
    }

    handleCancelDelete() {
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