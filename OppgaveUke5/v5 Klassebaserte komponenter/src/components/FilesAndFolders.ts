import { BaseComponent } from "../components/BaseComponent";
import type { FileOrFolder } from "../types";

export class FilesAndFolders extends BaseComponent {
    static props = ['items', 'parent-folder', 'selected-for-deletion'];
    render() {
        const filesAndFolders = this.get('items') as FileOrFolder[] || [];
        const parentFolder = this.get('parent-folder') as number || false;
        const selectedForDeletion = this.get('selected-for-deletion') as number;

        this.shadowRoot!.innerHTML = /*HTML*/`
            <fieldset>
                <legend>Files and Folders</legend>
                ${parentFolder ?/*HTML*/`
                    📁 <a href="" data-id="${parentFolder}">..</a><br/>` : ''}
                ${filesAndFolders.filter(f => !f.hasOwnProperty('content')).map(f =>/*HTML*/`
                    <div style="display: flex; align-items: center; margin-bottom: 5px; ${f.id === selectedForDeletion ? 'background-color: #ffebee; border: 1px solid #f44336; padding: 5px; border-radius: 3px;' : 'padding: 2px;'}">
                        <input type="checkbox" data-mark-id="${f.id}" ${f.id === selectedForDeletion ? 'checked' : ''} style="margin-right: 8px;">
                        📁 <a href="" data-id="${f.id}" style="text-decoration: none; color: #333;">${f.name}</a>
                    </div>
                `).join('')}
                ${filesAndFolders.filter(f => f.hasOwnProperty('content')).map(f =>/*HTML*/`
                    <div style="display: flex; align-items: center; margin-bottom: 5px; ${f.id === selectedForDeletion ? 'background-color: #ffebee; border: 1px solid #f44336; padding: 5px; border-radius: 3px;' : 'padding: 2px;'}">
                        <input type="checkbox" data-mark-id="${f.id}" ${f.id === selectedForDeletion ? 'checked' : ''} style="margin-right: 8px;">
                        <span>🗎</span> <a href="" data-id="${f.id}" style="text-decoration: none; color: #333; margin-left: 4px;">${f.name}</a>
                    </div>
                `).join('')}
            </fieldset>
        `;
        this.shadowRoot!.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(e: Event) {
        e.preventDefault();
        const target = e.target! as HTMLElement;
        
        if (target.matches('a')) {
            const aElement = e.target as HTMLAnchorElement;
            const id = aElement.getAttribute('data-id');
            const event = new CustomEvent('selected', { detail: id });
            this.dispatchEvent(event);
        } else if (target.matches('input[type="checkbox"]')) {
            const checkbox = target as HTMLInputElement;
            const markId = checkbox.getAttribute('data-mark-id');
            const event = new CustomEvent('mark-for-delete', { detail: { itemId: parseInt(markId!), checked: checkbox.checked } });
            this.dispatchEvent(event);
        }
    }
}


