import { BaseComponent } from "./BaseComponent";
import type { FileOrFolder } from "../types";

export class FilesAndFolders extends BaseComponent {
    static props=['items', 'parent-folder'];
    render() {
        const filesAndFolders = this.get('items') as FileOrFolder[];
        const parentFolder = this.get('parent-folder') as FileOrFolder || false
        console.log('rendering files and folders', filesAndFolders);
        this.shadowRoot!.innerHTML = /*HTML*/`
            <fieldset>
                <legend>Mapper og filer</legend>
                ${parentFolder ? /*HTML*/`
                     📁 <a href="" data-id="${parentFolder}">...</a>
                    ` : ''}
                ${filesAndFolders.filter(f => !f.content).map(f =>/*HTML*/`
                    📁 <a href="" data-id="${f.id}">${f.name}</a><br/>
                `).join('')}
                ${filesAndFolders.filter(f => f.content).map(f =>/*HTML*/`
                    <span>🗎</span> <a href="" data-id="${f.id}">${f.name}</a><br/>
                `).join('')}
            </fieldset>
        `;
        this.shadowRoot!.addEventListener('click', (e:Event) => {
            e.preventDefault();
            if(e.target!.matches('a')){
                const aElement = e.target as HTMLAnchorElement;
                const id = aElement.getAttribute('data-id');
                const Event = new CustomEvent('selected', { detail:id });
                this.dispatchEvent(Event);
            }
        });
    }
}