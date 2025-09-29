import { BaseComponent } from "../components/BaseComponent";
import type { AppState } from "../types";

export class MyApp extends BaseComponent {
    // static propNames = [];
    // state: AppState ={
    //     filesAndFolders: [
    //     {id: 1, name: 'Handlelister', parentId: null, content: null},
    //     {id: 2, name: 'Ting som skal fikses', parentId: null, content: null},
    //     {id: 3, name: 'Oktober', parentId: 1, content: null},
    //     {id: 4, name: 'Tirsdag 15.', parentId: 3, content: 'melk\nbrød\nost\n'},
    //     {id: 5, name: 'Bad', parentId: 2, content: 'Lekkasje, bla bla'},
    //     {id: 6, name: 'notater.txt', parentId: null, content: 'abc'},
    //     ]
    // }
    state: AppState = {
        currentId: null,
        filesAndFolders: [
            {id: 1, name: 'Handlelister'},
            {id: 2, name: 'Ting som skal fikses'},
            {id: 3, name: 'Oktober', parentId: 1, content: null},
            {id: 4, name: 'Tirsdag 15.', parentId: 3, content: 'melk\nbrød\nost\n'},
            {id: 5, name: 'Bad', parentId: 2, content: 'Lekkasje, bla bla'},
            {id: 6, name: 'notater.txt', parentId: null, content: 'abc'},
        ]
    }
    render() {
        this.shadowRoot!.innerHTML = `
            <fieldset>
            <legend>Filer & mapper</legend>
            <p>Du er her{this.state.currentId}</p>
            <ul>
                ${this.state.filesAndFolders.map(item => `
                    <li>
                        ${item.name} ${item.parentId ? `(i mappe ${item.parentId})` : ''}
                    </li>
                `).join('')}
            </ul>
            </fieldset>

            
        `;
    }
}