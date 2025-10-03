import { BaseComponent } from "./BaseComponent";

export class TrashBin extends BaseComponent {
    private items: any[] = [];
    private isExpanded = false;

    set(property: string, value: any) {
        if (property === 'items') {
            this.items = value;
            this.scheduleRender();
        }
    }

    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`
            <div>
                <button id="trash-icon" style="font-size: 24px; cursor: pointer; background: none; border: none;">
                    🗑️ (${this.items.length})
                </button>
                ${this.isExpanded ? /*HTML*/`
                    <fieldset>
                        <legend>Papirkurv</legend>
                        ${this.items.length === 0 ? '<p>Papirkurven er tom.</p>' : /*HTML*/`
                            <ul>
                                ${this.items.map(item => /*HTML*/`
                                    <li>
                                        ${item.name} ${item.content !== undefined ? '(fil)' : '(mappe)'}
                                        <button data-id="${item.id}">tilbake</button>
                                    </li>
                                `).join('')}
                            </ul>
                            <button id="empty-trash">Tøm papirkurv</button>
                        `}
                    </fieldset>
                ` : ''}
            </div>
        `;

        // Event listener dla ikony kosza
        const trashIcon = this.shadowRoot!.querySelector('#trash-icon');
        trashIcon?.addEventListener('click', () => {
            this.isExpanded = !this.isExpanded;
            this.scheduleRender();
        });

        if (this.isExpanded) {
            // Event listeners dla przycisków przywracania
            this.shadowRoot!.querySelectorAll('button[data-id]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt((e.target as HTMLElement).dataset.id!);
                    const event = new CustomEvent('restore-item', { detail: id });
                    this.dispatchEvent(event);
                });
            });

            // Event listener dla opróżnienia kosza
            const emptyTrashBtn = this.shadowRoot!.querySelector('#empty-trash');
            emptyTrashBtn?.addEventListener('click', () => {
                const event = new CustomEvent('empty-trash');
                this.dispatchEvent(event);
            });
        }
    }
}