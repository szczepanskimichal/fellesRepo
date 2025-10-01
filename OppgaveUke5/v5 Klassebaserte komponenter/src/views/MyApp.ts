import { BaseComponent } from "../components/BaseComponent";
import type { FilesAndFolders } from "../components/FilesAndFolders";
import type { AppState, FileOrFolder, DeleteEvent } from "../types";

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
    };

    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`
            <files-and-folders></files-and-folders>
            <add-file-or-folder></add-file-or-folder>
        `;
        const filesAndFolders = this.shadowRoot!.querySelector('files-and-folders') as FilesAndFolders;
        const currentFilesAndFolders = this.state.filesAndFolders.filter(f => f.parentId == this.state.currentId);
        filesAndFolders.set('items', currentFilesAndFolders);
        const currentFileOrFolder = this.state.filesAndFolders.find(f => f.id == this.state.currentId);
        if (currentFileOrFolder) {
            const folderId = currentFileOrFolder!.parentId ?? -1;
            filesAndFolders.set('parent-folder', folderId);
        }

        filesAndFolders.addEventListener('selected', this.handleSelected.bind(this));
        filesAndFolders.addEventListener('delete-item', this.handleDeleteItem.bind(this));

        const addFileOrFolder = this.shadowRoot!.querySelector('add-file-or-folder');
        addFileOrFolder?.addEventListener('content-added', this.handleContentAdded.bind(this))
    }

    handleDeleteItem(e: Event) {
        const customEvent = e as CustomEvent;
        const deleteData = customEvent.detail as DeleteEvent;
        const itemToDelete = this.state.filesAndFolders.find(f => f.id === deleteData.id);
        
        if (!itemToDelete) return;

        if (deleteData.type === 'folder') {
            this.deleteItemAndChildren(deleteData.id);
        } else {
            this.state.filesAndFolders = this.state.filesAndFolders.filter(f => f.id !== deleteData.id);
        }

        if (this.state.currentId === deleteData.id) {
            this.state.currentId = itemToDelete.parentId;
        }

        console.log('element deleted:', deleteData);
        console.log('Current state:', this.state);
        this.render();
    }

    private deleteItemAndChildren(itemId: number) {
        const children = this.state.filesAndFolders.filter(f => f.parentId === itemId);
        
        children.forEach(child => {
            if (!child.hasOwnProperty('content')) {
                this.deleteItemAndChildren(child.id);
            }
        });
        this.state.filesAndFolders = this.state.filesAndFolders.filter(f => f.id !== itemId);
    }

    handleContentAdded(e: Event) {
        const customEvent = e as CustomEvent;
        const newContent: FileOrFolder = {
            id: Math.max(...this.state.filesAndFolders.map(f => f.id)) + 1,
            name: customEvent.detail.name,
        };
        const current = this.state.filesAndFolders.find(f => f.id == this.state.currentId)!;
        if (current) {
            newContent.parentId = current.hasOwnProperty('content') ? current?.parentId : current.id;
        }
        if (customEvent.detail.isFile) newContent.content = '';
        this.state.filesAndFolders.push(newContent);
        console.log(this.state);
        this.render();
    }

    handleSelected(e: Event) {
        const customEvent = e as CustomEvent;
        if (customEvent.detail == '-1') {
            delete this.state.currentId;
        } else {
            this.state.currentId = parseInt(customEvent.detail);
        }
        this.render();
    }
}


