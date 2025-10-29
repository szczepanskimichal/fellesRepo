
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
            <h3>${item.name}</h3>
            <p>Pris: ${item.price} kr</p>
            <p>${item.description || ''}</p>
            <img src="${item.imageUrl || ''}" alt="${item.name}" width="200"/>
            <br/>
            <button>Tilbake til menyen</button>
        `;
        const backButton = this.shadowRoot!.querySelector('button');
        backButton?.addEventListener('click', this.handleBackButtonClick.bind(this));
    }

    private handleBackButtonClick() {
        const event = new CustomEvent('back-to-menu', {});
        this.dispatchEvent(event);
    }
}