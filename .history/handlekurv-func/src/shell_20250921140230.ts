import type { Model } from "./types";
import { productsView } from "./productsView";
import { navBar, footer } from "./commonView";
import { mainView } from "./commonView";
 

export function render(state: Model, action: string | null): void {
  const app = document.getElementById('app');
  app!.innerHTML='';
  console.log("rendering app ...", state)
  
  const oldState = {
        ...state,
      };
        if (oldState.app.currentPage === 'products') {
          // productView(oldState);
          productsView(oldState);
          navBar(state);
          footer();
      } else if (oldState.app.currentPage === 'cart') {
        navBar(state);
        footer();
        const app = document.getElementById('app');
          app!.innerHTML = 'Hello world :)';
      }
}


