import { BaseComponent } from "../components/BaseComponent";

export class DeleteFileOrFolder extends BaseComponent {
    private state = {
        selectedItemId: null as number | null,
        selectedItemName: '',
        errorMessage: '',
    };

    render() {
        this.shadowRoot!.innerHTML = /*HTML*/`
            <fieldset style="margin: 20px 0; padding: 15px; border: 2px solid #ccc;">
                <legend style="font-weight: bold; font-size: 16px;">Delete Selected Item</legend>
                <div style="color:red; margin-bottom: 10px;">${this.state.errorMessage}</div>
                ${this.state.selectedItemId ? 
                    `<div style="background-color: #fff3cd; padding: 15px; border: 2px solid #ffeaa7; margin: 10px 0; border-radius: 5px;">
                        <p style="margin: 0 0 10px 0;"><strong>Selected for deletion:</strong> <span style="color: #d32f2f;">${this.state.selectedItemName}</span></p>
                        <p style="margin: 0 0 15px 0; color: #666;">Are you sure you want to delete this item?</p>
                        <div style="display: flex; gap: 10px;">
                            <button class="delete-btn" style="background-color: #dc3545; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                                🗑️ DELETE
                            </button>
                            <button class="cancel-btn" style="background-color: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
                                Cancel
                            </button>
                        </div>
                    </div>` 
                    : 
                    `<div style="padding: 15px; background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px;">
                        <p style="color: #6c757d; font-style: italic; margin: 0;">
                            No item selected for deletion.<br>
                            <strong>Instructions:</strong> Check the checkbox next to an item to select it for deletion.
                        </p>
                    </div>`
                }
            </fieldset>
        `;

        const deleteBtn = this.shadowRoot!.querySelector('.delete-btn');
        const cancelBtn = this.shadowRoot!.querySelector('.cancel-btn');

        deleteBtn?.addEventListener('click', () => this.handleDelete());
        cancelBtn?.addEventListener('click', () => this.handleCancel());
    }

    // Method to set which item should be deleted (called from parent)
    setSelectedItem(itemId: number, itemName: string) {
        this.state.selectedItemId = itemId;
        this.state.selectedItemName = itemName;
        this.state.errorMessage = '';
        this.render();
    }

    // Method to clear selection (called from parent)
    clearSelection() {
        this.state.selectedItemId = null;
        this.state.selectedItemName = '';
        this.state.errorMessage = '';
        this.render();
    }

    handleDelete() {
        if (this.state.selectedItemId === null) {
            this.state.errorMessage = 'No item marked for deletion!';
            this.render();
            return;
        }

        const detail = {
            itemId: this.state.selectedItemId,
        };
        
        const event = new CustomEvent('item-deleted', { detail });
        this.dispatchEvent(event);
        
        // Reset state after deletion
        this.state.selectedItemId = null;
        this.state.selectedItemName = '';
        this.state.errorMessage = '';
        this.render();
    }

    handleCancel() {
        // Dispatch event to parent to clear the selection
        const event = new CustomEvent('clear-selection');
        this.dispatchEvent(event);
        
        this.state.selectedItemId = null;
        this.state.selectedItemName = '';
        this.state.errorMessage = '';
        this.render();
    }
}


