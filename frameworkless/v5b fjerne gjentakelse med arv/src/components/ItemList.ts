import { BaseComponent } from './BaseComponent';
import type { Item } from '../types';

export class ItemList extends BaseComponent {
    propNames = ['items'];
    render() {
        const items = this.get('items') as Item[] ?? [];
        console.log(items);
        this.shadowRoot!.innerHTML = /*HTML*/`
            <fieldset> 
                <legend>Alle punktene:</legend>           
                    ${items.length == 0 ?/*HTML*/`
                        &lt;<i>ingen punkter</i>&gt;
                    `:/*HTML*/`
                    <ul>
                        ${items.map((item, index) => /*HTML*/`
                            <li>
                                <span class="item-count">${item.count}</span> - 
                                <span class="item-description" data-index="${index}" style="cursor: pointer; text-decoration: underline;">${item.description}</span>
                                <button data-index="${index}" class="edit-btn">Rediger</button>
                                <button data-index="${index}" class="delete-btn">Slett</button>
                            </li>
                        `).join('')}
                    </ul>                       
                    `}
            </fieldset>
        `;

        // Add delete event listeners
        this.shadowRoot!.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt((e.target as HTMLElement).dataset.index!);
                this.dispatchDeleteItem(index);
            });
        });

        // Add edit event listeners
        this.shadowRoot!.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt((e.target as HTMLElement).dataset.index!);
                this.startEdit(index);
            });
        });

        // Add click to edit functionality for description
        this.shadowRoot!.querySelectorAll('.item-description').forEach(span => {
            span.addEventListener('click', (e) => {
                const index = parseInt((e.target as HTMLElement).dataset.index!);
                this.startEdit(index);
            });
        });
    }

    private startEdit(index: number) {
        const items = this.get('items') as Item[] ?? [];
        const item = items[index];
        
        const listItem = this.shadowRoot!.querySelector(`li:nth-child(${index + 1})`);
        if (listItem) {
            listItem.innerHTML = /*HTML*/`
                <span class="item-count">${item.count}</span> - 
                <input type="text" class="edit-input" value="${item.description}" data-index="${index}" />
                <button data-index="${index}" class="save-btn">Lagre</button>
                <button data-index="${index}" class="cancel-btn">Avbryt</button>
                <button data-index="${index}" class="delete-btn">Slett</button>
            `;

            // Add save event listener
            listItem.querySelector('.save-btn')?.addEventListener('click', (e) => {
                const idx = parseInt((e.target as HTMLElement).dataset.index!);
                const input = listItem.querySelector('.edit-input') as HTMLInputElement;
                this.saveEdit(idx, input.value);
            });

            // Add cancel event listener
            listItem.querySelector('.cancel-btn')?.addEventListener('click', () => {
                this.render(); // Just re-render to cancel
            });

            // Add delete event listener for the new delete button
            listItem.querySelector('.delete-btn')?.addEventListener('click', (e) => {
                const idx = parseInt((e.target as HTMLElement).dataset.index!);
                this.dispatchDeleteItem(idx);
            });

            // Focus the input
            const input = listItem.querySelector('.edit-input') as HTMLInputElement;
            input.focus();
            input.select();

            // Save on Enter key
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.saveEdit(index, input.value);
                }
            });
        }
    }

    private saveEdit(index: number, newDescription: string) {
        if (newDescription.trim()) {
            const event = new CustomEvent('item-edited', { 
                detail: { index, newDescription: newDescription.trim() },
                bubbles: true 
            });
            this.dispatchEvent(event);
        }
    }

    private dispatchDeleteItem(index: number) {
        const event = new CustomEvent('item-deleted', { 
            detail: { index },
            bubbles: true 
        });
        this.dispatchEvent(event);
    }
}
