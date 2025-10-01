import { BaseComponent } from "../components/BaseComponent";
import type { FileOrFolder } from "../types";

export class FilesAndFolders extends BaseComponent {
    static props = ['items', 'parent-folder'];
    render() {
        const filesAndFolders = this.get('items') as FileOrFolder[] || [];
        const parentFolder = this.get('parent-folder') as number || false;

        this.shadowRoot!.innerHTML = /*HTML*/`
            <fieldset>
                <legend>Mapper og filer</legend>
                ${parentFolder ?/*HTML*/`
                    <div id="parent-item">
                        <div id="parent-content">
                            📁 <a href="" data-id="${parentFolder}">..</a>
                        </div>
                    </div>` : ''}
                ${filesAndFolders.filter(f => !f.hasOwnProperty('content')).map(f =>/*HTML*/`
                    <div id="folder-item-${f.id}">
                        <div id="folder-content-${f.id}">
                            📁 <a href="" data-id="${f.id}">${f.name}</a>
                        </div>
                        <span data-id="${f.id}" data-type="folder"  style="cursor: pointer;">🗑️</span>
                    </div>
                `).join('')}
                ${filesAndFolders.filter(f => f.hasOwnProperty('content')).map(f =>/*HTML*/`
                    <div id="file-item-${f.id}">
                        <div id="file-content-${f.id}">
                            🗎 <a href="" data-id="${f.id}">${f.name}</a>
                        </div>
                        <span data-id="${f.id}" data-type="file"  style="cursor: pointer;">🗑️</span>
                    </div>
                `).join('')}
            </fieldset>
        `;
        this.shadowRoot!.addEventListener('click', this.handleClick.bind(this));
        this.shadowRoot!.addEventListener('mouseover', this.handleMouseOver.bind(this));
    }

    handleMouseOver(e: Event) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'DIV' && target.id.startsWith('folder-item-')) {
            const deleteBtn = target.querySelector('[data-type="folder"]') as HTMLElement;
            if (deleteBtn) deleteBtn.style.opacity = '1';
        }
        if (target.tagName === 'DIV' && target.id.startsWith('file-item-')) {
            const deleteBtn = target.querySelector('[data-type="file"]') as HTMLElement;
            if (deleteBtn) deleteBtn.style.opacity = '1';
        }
    }

  

    handleClick(e: Event) {
        e.preventDefault();
        const target = e.target! as HTMLElement;
        
        if (target.matches('a')) {
            const aElement = e.target as HTMLAnchorElement;
            const id = aElement.getAttribute('data-id');
            const event = new CustomEvent('selected', { detail: id });
            this.dispatchEvent(event);
        }
        
        if (target.tagName === 'SPAN' && target.hasAttribute('data-type')) {
            const id = target.getAttribute('data-id');
            const type = target.getAttribute('data-type');

            if (confirm(`er du sikker på at du vil slette denne ${type === 'folder' ? 'mappen' : 'filen'}?`)) {
                //her sender jeg event to parent 
                const event = new CustomEvent('delete-item', {
                    detail: { id: parseInt(id!), type }
                });
                this.dispatchEvent(event);
            }
        }
    }
}


