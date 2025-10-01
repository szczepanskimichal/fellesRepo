import { BaseComponent } from "./BaseComponent";
import type { FileOrFolder } from "../types";

export class FilesAndFolders extends BaseComponent {
    static props: string[] = ['items',  'parent-folder'];

    render() {
        const filesAndFolders: FileOrFolder[] = this.get('items') || [];

        this.shadowRoot!.innerHTML = /*html*/`
            <fieldset>
                <legend>Filer & mapper</legend>
                ${filesAndFolders.filter(f => !f.content).map(f => /*html*/`
                    📁 <a href="" data-id="${f.id}">${f.name}</a><br/>`)
                    .join('')}
            </fieldset>
            `;
        }
    }



