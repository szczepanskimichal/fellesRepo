import type { Model } from "./types";
import { productView } from "./productsView";
import { navBar, footer } from "./commonView";
 

export function render(state: Model, action: string | null): void {
  // console.log("Rendering with state:", state);
  // console.log("Action:", action);


  const oldState = {
        ...state,
      };
        if (oldState.app.currentPage === 'products') {
          productView(oldState);
          navBar(state);
      } else if (oldState.app.currentPage === 'cart') {
        const app = document.getElementById('app');
          app!.innerHTML = 'Hello world :)';
      }
}


