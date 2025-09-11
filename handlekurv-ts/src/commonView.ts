import { updateView } from "./view";
import { model } from "./model";

export function generateFooter(footer: HTMLElement): HTMLElement {
    const year = new Date().getFullYear();
    footer!.innerHTML = `
      <p>&copy; Nettbutikk A/S ${year}</p>
    `;
    return footer!;
}

export function generateNavbar(header: HTMLElement): HTMLElement {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    const logo = document.createElement('h1');
    logo.className = 'logo';
    logo.innerText = 'Nettbutikk';
    const ul = document.createElement('ul');
    ul.className = 'nav-links';
    const li1 = document.createElement('li');
    const a1 = document.createElement('a');
    a1.href = '#';
    a1.innerText = 'Produkter';
    a1.addEventListener('click', () => { model.app.currentPage = 'products'; updateView(); });
    const a2 = document.createElement('a');
    a2.href = '#';
    a2.innerText = 'Handlekurv 🛒';
    a2.addEventListener('click', () => { model.app.currentPage = 'cart'; updateView(); });
    const infoCart = document.createElement('span');
    infoCart.className = 'cart-info';
    a2.appendChild(infoCart);
    li1.appendChild(a1);
    li1.appendChild(a2);
    ul.appendChild(li1);
    nav.appendChild(logo);
    nav.appendChild(ul);
    header!.appendChild(nav);

    document.body.addEventListener('click', () => { itemsTotalCart(infoCart); updateView(); });
    return header!;
}

function itemsTotalCart(infoCart: HTMLElement): HTMLElement {
    
    infoCart.innerText = `(${model.cart.items.length}) totalt: ${model.cart.total.toFixed(2)} NOK`;
    return infoCart;
}