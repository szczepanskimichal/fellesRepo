import type { Model } from "./types";
import { productsView } from "./productsView";
import { navBar, footer } from "./commonView";
import { mainView } from "./commonView";
 

export function render(state: Model, action: string | null): void {
  
  const oldState = {
        ...state,
      };
        if (oldState.app.currentPage === 'products') {
          // productView(oldState);
          productView(oldState);
          navBar(state);
          footer();
      } else if (oldState.app.currentPage === 'cart') {
        const app = document.getElementById('app');
          app!.innerHTML = 'Hello world :)';
      }
}


