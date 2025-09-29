import { BaseComponent } from "./BaseComponent";
import type { AppState } from "../types";

export class List extends BaseComponent {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.render();
    }

    
    render() {
        const state: AppState = this.get('state') || { currentId: null, filesAndFolders: [] };
        this.shadowRoot!.innerHTML = `
        <div>
        <p>Mapper og filer</p>
            <ul>
            ${state.filesAndFolders.map(item => `
                <li>
                    <h2>${item.name}</h2>
                    ${item.parentId ? `<small>(w folderze ${item.parentId})</small>` : ''}
                </li>
            `).join('')}
            </ul>
        </div>`
        }
    }