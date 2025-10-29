import { BaseComponent } from "../components/BaseComponent";
import { initialAppState } from "../initialAppState";

export class AppView extends BaseComponent {
  private state = initialAppState;

  render() {
    this.shadowRoot!.innerHTML = /*HTML*/ `
      <h1>Meny</h1>
      <main></main>
    `;

    const main = this.shadowRoot!.querySelector('main')!;
    if (!this.state.currentPage || this.state.currentPage === 'menu') {
      const menuView = document.createElement('menu-view') as BaseComponent;
      menuView.set('menu-items', this.state.menuItems);
      menuView.set('categories', this.state.categories);
      main.appendChild(menuView);
    } else if (this.state.currentPage.startsWith('menu-item')) {
      const menuItemView = document.createElement('menu-item-view') as BaseComponent;
      const menuItem = this.state.menuItems.find(i => i.id === this.state.currentId);
      if (menuItem) {
        menuItemView.set('menu-item', menuItem);
        main.appendChild(menuItemView);
      }
    }
  }
}
