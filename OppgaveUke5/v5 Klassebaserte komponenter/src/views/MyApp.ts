import { BaseComponent } from "../components/BaseComponent";
import type { FilesAndFolders } from "../components/FilesAndFolders";
import type { AppState, FileOrFolder } from "../types";

export class MyApp extends BaseComponent {
    private state: AppState = {
        selectedForDeletion: undefined,
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
            <delete-file-or-folder></delete-file-or-folder>
        `;
        const filesAndFolders = this.shadowRoot!.querySelector('files-and-folders') as FilesAndFolders;
        const currentFilesAndFolders = this.state.filesAndFolders.filter(f => f.parentId == this.state.currentId);
        filesAndFolders.set('items', currentFilesAndFolders);
        filesAndFolders.set('selected-for-deletion', this.state.selectedForDeletion);
        const currentFileOrFolder = this.state.filesAndFolders.find(f => f.id == this.state.currentId);
        if (currentFileOrFolder) {
            const folderId = currentFileOrFolder!.parentId ?? -1;
            filesAndFolders.set('parent-folder', folderId);
        }

        filesAndFolders.addEventListener('selected', this.handleSelected.bind(this));
        filesAndFolders.addEventListener('mark-for-delete', this.handleMarkForDelete.bind(this));

        const addFileOrFolder = this.shadowRoot!.querySelector('add-file-or-folder');
        addFileOrFolder?.addEventListener('content-added', this.handleContentAdded.bind(this));

        const deleteFileOrFolder = this.shadowRoot!.querySelector('delete-file-or-folder');
        deleteFileOrFolder?.addEventListener('item-deleted', this.handleItemDeleted.bind(this));
        deleteFileOrFolder?.addEventListener('clear-selection', this.handleClearSelection.bind(this));
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

    handleMarkForDelete(e: Event) {
        const customEvent = e as CustomEvent;
        const itemId = customEvent.detail.itemId;
        const isChecked = customEvent.detail.checked;
        
        console.log('handleMarkForDelete called with itemId:', itemId, 'checked:', isChecked);
        
        // Set selection based on checkbox state
        if (isChecked) {
            this.state.selectedForDeletion = itemId;
            console.log('Marking item for deletion');
        } else {
            this.state.selectedForDeletion = undefined;
            console.log('Unmarking item');
        }
        
        // Update the delete component
        const deleteComponent = this.shadowRoot!.querySelector('delete-file-or-folder') as any;
        console.log('Delete component found:', !!deleteComponent);
        
        if (this.state.selectedForDeletion) {
            const selectedItem = this.state.filesAndFolders.find(f => f.id === this.state.selectedForDeletion);
            console.log('Selected item:', selectedItem);
            if (deleteComponent && deleteComponent.setSelectedItem) {
                deleteComponent.setSelectedItem(this.state.selectedForDeletion, selectedItem?.name || 'Unknown');
                console.log('Called setSelectedItem on delete component');
            }
        } else {
            if (deleteComponent && deleteComponent.clearSelection) {
                deleteComponent.clearSelection();
                console.log('Called clearSelection on delete component');
            }
        }
        
        console.log('About to render with selectedForDeletion:', this.state.selectedForDeletion);
        this.render();
    }

    handleItemDeleted(e: Event) {
        const customEvent = e as CustomEvent;
        const itemIdToDelete = customEvent.detail.itemId;
        
        // Function to recursively delete an item and all its children
        const deleteItemAndChildren = (id: number) => {
            // Find all children of this item
            const children = this.state.filesAndFolders.filter(f => f.parentId === id);
            
            // Recursively delete all children first
            children.forEach(child => deleteItemAndChildren(child.id));
            
            // Remove the item itself
            this.state.filesAndFolders = this.state.filesAndFolders.filter(f => f.id !== id);
        };

        deleteItemAndChildren(itemIdToDelete);
        
        // Clear the selection and reset currentId if needed
        this.state.selectedForDeletion = undefined;
        if (this.state.currentId === itemIdToDelete) {
            delete this.state.currentId;
        }
        
        console.log('Item deleted:', itemIdToDelete);
        console.log('Updated state:', this.state);
        this.render();
    }

    handleClearSelection() {
        this.state.selectedForDeletion = undefined;
        this.render();
    }
}


