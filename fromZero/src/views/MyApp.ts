
import { BaseComponent } from "../components/BaseComponent";
import type { FilesAndFolders } from "../components/FilesAndFolders";
import type { AppState } from "../types";

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
    };;

    render() {
        // console.log(this.state.currentId);
        this.shadowRoot!.innerHTML = /*HTML*/`
        <files-and-folders></files-and-folders>
        `;
        const filesAndFolders = this.shadowRoot!.querySelector('files-and-folders') as FilesAndFolders;
        const currentFilesAndFolders = this.state.filesAndFolders.filter(f => f.parentId === this.state.currentId);
        filesAndFolders.set('items', currentFilesAndFolders);
        // filesAndFolders.set('currentId', this.state.currentId);
// <----------------------------------------------------------------------------------------------------------------------->
        const currentFileOrFolder = this.state.filesAndFolders.find(f => f.id == this.state.currentId);
        if (currentFileOrFolder) filesAndFolders.set('parent-folder', currentFileOrFolder.parentId);

        filesAndFolders.addEventListener('selected', this.handleSelected.bind(this));
    }
    handleSelected(e: CustomEvent) {
        const customEvent = e as CustomEvent;
        this.state.currentId = customEvent.detail;
        this.render();
    }
}