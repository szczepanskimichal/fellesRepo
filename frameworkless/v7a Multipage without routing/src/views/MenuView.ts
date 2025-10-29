import { BaseComponent } from "../components/BaseComponent";
import type { MenuItem } from "../types";

export class MenuView extends BaseComponent {
    private selectedCategory: string | null = null;
    static props = ['menu-items', 'categories'];
    getCategories(): string[] {
        return (this.get('categories') || []) as string[];
    }
    getMenuItems(): MenuItem[] {
        return (this.get('menu-items') || []) as MenuItem[];
    }
    render() {
        this.shadowRoot!.innerHTML = /*HTML*/ `
        <h3>Kategorier</h3>
        <div id="categories">
            ${this.getCategories().map((category: any) => /*HTML*/`   
                <button ${category === this.selectedCategory ? 'disabled' : ''}>${category}</button>
                `).join('')}
        </div>
        <h3 ${this.selectedCategory ? `i kategorien ${this.selectedCategory}` : ''}>Produkter</h3>
        <div id="menu-items">    
        ${this.createMenuItemList()}
        </div>
        `;
        const categoryDiv = this.shadowRoot!.querySelector('#categories');
        categoryDiv?.addEventListener('click', this.handleCategoryClick.bind(this));
        const menuItemsDiv = this.shadowRoot!.querySelector('#menu-items');
        menuItemsDiv?.addEventListener('click', this.handleMenuItemClick.bind(this));
    }

    private handleMenuItemClick(e: Event) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON') {
           const detail = {
            // category: this.selectedCategory,
            id: parseInt(target.dataset.id!)
           };
           const event = new CustomEvent('menu-item-selected', { detail});
           this.dispatchEvent(event); // we need to catch this dispatch in AppView!!!
        }
    }

    private handleCategoryClick(e: Event) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON') {
            this.selectedCategory = target.textContent;
            this.render();
        }
    }

    private createMenuItemList() {
        if (this.selectedCategory === null) return '<i>Velg en kategori for å se menyen.</i>';
        const menuItems = this.getMenuItems().filter(menuItem => menuItem.category === this.selectedCategory);
        if (menuItems.length === 0) return '<i>Ingen menyartikler i denne kategorien.</i>';
        return menuItems.map(menuItem => /*HTML*/`
            <div>
                ${menuItem.name} - ${menuItem.price} kr
                <button data-id="${menuItem.id}">Les mer</button>
            </div>
        `).join('');
    }
}
