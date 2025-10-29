import { MenuView } from "./views/MenuView";
import { MenuItemView } from "./views/MenuItemView";
import { RouterView } from "./views/RouterView";
import { AddCategoryView } from "./views/addCategoryView";
import { AddMenuItemView } from "./views/addMenuItemView";

customElements.define('menu-item-view', MenuItemView);
customElements.define('menu-view', MenuView);
customElements.define('router-view', RouterView);
customElements.define('add-category-view', AddCategoryView);
customElements.define('add-menu-item-view', AddMenuItemView);

