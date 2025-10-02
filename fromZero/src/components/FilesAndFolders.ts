import { BaseComponent } from "./BaseComponent";
import type { FileOrFolder } from "../types";

export class FilesAndFolders extends BaseComponent {
    static props=['items'];
    render() {
        const filesAndFolders = this.get('items') as FileOrFolder[];
        console.log('rendering files and folders', filesAndFolders);
        this.shadowRoot!.innerHTML = /*HTML*/`
            <fieldset>
                <legend>Mapper og filer</legend>
                ${filesAndFolders.filter(f => !f.content).map(f =>/*HTML*/`
                    📁 <a href="javascript:select(${f.id})">${f.name}</a><br/>
                `).join('')}
                ${filesAndFolders.filter(f => f.content).map(f =>/*HTML*/`
                    <span>🗎</span> <a href="javascript:select(${f.id})">${f.name}</a><br/>
                `).join('')}
            </fieldset>
        `;
    }
}