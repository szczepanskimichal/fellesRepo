import { BaseComponent } from "../components/BaseComponent";
import type { AppState, Item } from "../types";
import { api } from "../api";

export class MyApp extends BaseComponent {
    private state: AppState = {
        items: []
    };

    async connectedCallback() {
        await this.loadItems();
        this.render();
    }

    private async loadItems() {
        try {
            this.state.items = await api.get<Item[]>('/api/items');
        } catch (error) {
            console.error('Error loading items:', error);
            this.state.items = [];
        }
    }

    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`
            <add-new-form title="Legg til ny"></add-new-form>
            <my-list></my-list>
            <my-dialog-ok-cancel title="Vil du fortsette?"></my-dialog-ok-cancel>
        `;

        const addNewForm = this.shadowRoot!.querySelector('add-new-form') as HTMLElement;
        addNewForm.addEventListener('new-item-added', this.newItemAdded.bind(this));

        const myList = this.shadowRoot!.querySelector('my-list') as BaseComponent;
        if (myList) {
            myList.set('items', this.state.items);
            myList.render();
            myList.addEventListener('item-deleted', this.itemDeleted.bind(this));
            myList.addEventListener('item-edited', this.itemEdited.bind(this));
        }
    }

    newItemAdded(e: Event) {
        const customEvent = e as CustomEvent;
        this.addNewItem(customEvent.detail as Item);
    }

    private async addNewItem(newItem: Item) {
        try {
            const addedItem = await api.post<Item>('/api/items', newItem);
            this.state.items.push(addedItem);
            this.render();
        } catch (error) {
            console.error('Error adding item via API:', error);
            // Fallback: add locally if API fails
            this.state.items.push(newItem);
            this.render();
        }
    }

    itemDeleted(e: Event) {
        const customEvent = e as CustomEvent;
        this.deleteItem(customEvent.detail.index);
    }

    itemEdited(e: Event) {
        const customEvent = e as CustomEvent;
        this.editItem(customEvent.detail.index, customEvent.detail.newDescription);
    }

    private async editItem(index: number, newDescription: string) {
        try {
            const updatedItem = { ...this.state.items[index], description: newDescription };
            await api.put(`/api/items/${index}`, updatedItem);
            this.state.items[index] = updatedItem;
            this.render();
        } catch (error) {
            console.error('Error editing item via API:', error);
            // Fallback: edit locally if API fails
            this.state.items[index].description = newDescription;
            this.render();
        }
    }

    private async deleteItem(index: number) {
        try {
            await api.delete(`/api/items/${index}`);
            this.state.items.splice(index, 1);
            this.render();
        } catch (error) {
            console.error('Error deleting item via API:', error);
            // Fallback: delete locally if API fails
            this.state.items.splice(index, 1);
            this.render();
        }
    }
}


