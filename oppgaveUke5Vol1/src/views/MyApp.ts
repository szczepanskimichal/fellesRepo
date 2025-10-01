import { BaseComponent } from "../components/BaseComponent";
import type { AppState } from "../types";
import type { FilesAndFolders } from "../components/FilesAndFolders";

export class MyApp extends BaseComponent {
    static props: string[] = [];

    private state: AppState = {
        currentId: null,
        filesAndFolders: [
            {id: 1, name: 'Ting som skal fikses'},
            {id: 2, name: 'Handlelister'},
            {id: 3, name: 'Oktober', parentId: 2, content: null},
            {id: 4, name: 'Tirsdag 15.', parentId: 3, content: 'melk\nbrød\nost\n'},
            {id: 5, name: 'Bad', parentId: 1, content: 'Lekkasje, bla bla'},
            {id: 6, name: 'notater.txt', content: 'abc'},
        ]
    }
    render() {
        this.shadowRoot!.innerHTML = `
        <files-and-folders></files-and-folders>
        `;

        const filesAndFolders = this.shadowRoot!.querySelector('files-and-folders') as FilesAndFolders;
        filesAndFolders.set('items', this.state.filesAndFolders);

    }
}