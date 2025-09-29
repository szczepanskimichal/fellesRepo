import { BaseComponent } from "../components/BaseComponent";
import type { AppState } from "../types";

export class MyApp extends BaseComponent {
    static propNames: string[] = [];

    state: AppState = {
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
            <fieldset>
            <legend>Filer & mapper</legend>
            <p>Du er her ${this.state.currentId}</p>
            <ol>
                ${this.state.filesAndFolders.map(item => `
                    <li>
                        ${item.name} ${item.parentId ? `(i mappe ${item.parentId})` : ''}
                    </li>
                `).join('')}
            </ol>
            //vise komponent here!!!
            </fieldset>

            
        `;
    }
}