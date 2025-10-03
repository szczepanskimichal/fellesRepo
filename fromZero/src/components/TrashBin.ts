import { BaseComponent } from "./BaseComponent";
import type { FileOrFolder } from "../types";

export class TrashBin extends BaseComponent {
  static props = ['items', 'marked-files-and-folders'];


  render() {
    const filesAndFolders: FileOrFolder[] = this.get('items') || [];
    const markedFilesAndFolders = this.get('marked-files-and-folders') || [];
    console.log('rendering trash bin', filesAndFolders);
    this.shadowRoot!.innerHTML = /*HTML*/
    `<fieldset>
        <legend>Papirkurv <img src="./src/components/trash-svgrepo-com.svg" alt="Trash Icon" style="width: 24px; height: 24px; vertical-align: middle;" />
          (${filesAndFolders.filter(f => f.isTrash).length}) </legend>
        ${filesAndFolders.length === 0 ? '<p>Tom papirkurv</p>' : ''}
           <button id="empty-trash">Tøm papirkurv</button>
        </fieldset>`;

    // filesAndFolders.addEventListener('click', (e) => {
      this.shadowRoot!.querySelectorAll('button[data-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt((e.target as HTMLElement).dataset.id!);
          const event = new CustomEvent('restore-item', { detail: id });
          this.dispatchEvent(event);
        });
      });

      const emptyTrashBtn = this.shadowRoot!.querySelector('#empty-trash');
      emptyTrashBtn?.addEventListener('click', () => {
        const event = new CustomEvent('empty-trash');
        this.dispatchEvent(event);
      });
    }
  }
