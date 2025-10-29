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
        <h3>Kategorier</h1>
        <ul>
            ${this.getCategories().map((item: any) => /*HTML*/`   
                <li>
                    <h2>${item.name} - ${item.price} kr</h2>
                    <p>${item.description || ''}</p>
                </li>
            `).join('')}
            ${this.createMenuItemList()}
        </ul>
        `;
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
