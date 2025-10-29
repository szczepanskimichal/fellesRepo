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
                <button>${category}</button>
                `).join('')}
        </div>
        <h3>Produkter</h3>
            ${this.createMenuItemList()}
        `;
        const categoryDiv = this.shadowRoot!.querySelector('#categories');
        categoryDiv?.addEventListener('click', this.handleCategoryClick.bind(this));
    }

    private handleCategoryClick(e: Event) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON') {
            this.selectedCategory = target.textContent;
            this.render();
        }
    }

    private createMenuItemList() {
        if (!this.selectedCategory === null) return '<i>Velg en kategori for å se menyen.</i>'
        const menuItems = this.getMenuItems().filter(i => i.category === this.selectedCategory);
        if (menuItems.length === 0) return '<i>Ingen menyartikler i denne kategorien.</i>';
        return menuItems.map(item => /*HTML*/`
            <li>
                ${item.name} - ${item.price} kr
                <button>les mer</button>
            </li>
        `).join('');
    }
}
