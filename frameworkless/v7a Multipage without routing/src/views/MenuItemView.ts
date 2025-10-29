
import { BaseComponent } from "../components/BaseComponent";
import type { MenuItem } from "../types";

export class MenuItemView extends BaseComponent {
    static props = ['menu-item'];
    getMenuItem(): MenuItem {
        return (this.get('menu-item') || []) as MenuItem;
    }
    render() {
        const item = this.getMenuItem();
        this.shadowRoot!.innerHTML = /*HTML*/ `
            <h1>${item.name}</h1>
            <p>Pris: ${item.price} kr</p>
            <p>${item.description || ''}</p>
        `;
    }
}