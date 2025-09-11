import { model } from "./model";

export function generatePage() {
    const app = document.getElementById('app');
    const header = document.createElement('header');
    
    const main = document.createElement('main');
    main.id = 'main';
    const footer = document.createElement('footer');
    footer.id = 'footer';
    app!.appendChild(header);
    app!.appendChild(main);
    app?.appendChild(footer);
    generateNavbar(header);
    generateMain(main);
    generateFooter(footer);

}
function generateMain(mainElement: HTMLElement): HTMLElement {
    for(let product of model.products) {
    //     <article class="product-card" role="listitem" tabindex="0"
    //          onclick="showProductDetail(${product.id})"
    //          aria-label="Produkt: ${product.name}, Pris: ${product.price.toFixed(2)} kroner">
    //   <header>
    //     <div class="product-image" role="img" aria-label="Produktbilde: ${product.name}">${product.image}</div>
    //     <h3 class="product-name">${product.name}</h3>
    //   </header>
    //   <div class="product-info">
    //     <p class="product-price" aria-label="Pris: ${product.price.toFixed(2)} kroner">
    //       <span class="currency">kr</span> <span class="amount">${product.price.toFixed(2)}</span>
    //     </p>
    //     <p class="product-description">${product.description}</p>
    //   </div>
    //   <footer>
    //     <button class="btn btn-success" onclick="event.stopPropagation(); handleAddToCart(${product.id})" aria-label="Legg ${product.name} i handlekurv">Legg i handlekurv</button>
    //   </footer>
    // </article>
        const productCard = document.createElement('article');
        productCard.className = 'product-card';
        const image = document.createElement('div');
        image.className = 'product-image';
        image.innerText = product.image;

        productCard.innerText = product.name;
        productCard.appendChild(image);
        mainElement.appendChild(productCard);
    }
    return mainElement;
}


function generateFooter(footer: HTMLElement): HTMLElement {
    const year = new Date().getFullYear();
    footer!.innerHTML = `
      <p>&copy; Nettbutikk A/S ${year}</p>
    `;
    return footer!;
}

function generateNavbar(header: HTMLElement): HTMLElement {
  const nav = document.createElement('nav');
  nav.innerHTML = /*HTML*/`
    <nav class="navbar">
        <h1 class="logo">Nettbutikk</h1>
        <ul class="nav-links">
          <li><a href="#" onclick="model.app.currentPage='products'; updateView()">Produkter</a></li>
          <li><a href="#" onclick="model.app.currentPage='cart'; updateView()">Handlekurv (<span id="cart-count"></span>)</a></li>
        </ul>
      </nav>
   `;
   header!.appendChild(nav);
   return header!;
}